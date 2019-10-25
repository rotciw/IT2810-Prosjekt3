# IT2810 - prosjekt 3

## Krav til innhold og funksjonalitet

Gruppen har valgt å ha en søkbar katalog med produkter fra vinmonopolet. Her kan man søke, filtrere, sortere og blad i produkter. Man kan også få mer informasjon om produktene og se hva andre har søkt på i populære søk. 


### Datapresentasjon
Data er hentet fra vinmonopolets sitt csv. Dataene presenteres i en liste, trykker man på et produkt vil man få mer data om produktet samt et bildet. Bildene er hentet fra vinmonopolet via varenummeret til produktene. Alkohol per krone har vi generert selv. 


### Filtrering, søk, sortering og paginering

Filtrering, søk, sortering og paginering håndteres på backend. Dette utdypes ytterligere under. 

Brukere kan legge til filtrering på søkeresultatet ved å bruke menyen til venstre på siden. Her kan man filtrere på land, årgang, pris, emballasjetype og produktutvalg. Årgang og pris kan filtreres ved å sette en minimums- og maksimumsverdi. Filtrering for land emballasjetype og produktutvalg kan settes ved å trykke på ønsket filter. 

Siden har et søkefelt der brukeren kan skrive inn søkeord. Søkeordene vil søke i feltene produktnavn, produkttype og land. Ved å bruke regular expressions i backenden kan man søke på delstrenger av disse feltene (feks. søk på rød vil gi vise resultater med rødvin i produkttype el.).

Det er mulig å sortere søkeresultatene ved å trykke på knappen “Sorter etter”. Da vises en dropdown-meny hvor brukeren kan velge et felt resultatene skal sorteres etter.

Brukere kan trykke på pilene frem og tilbake for paginering mellom sidene med søkeresultater. Når man trykker på neste/forrige side kjøres en ny spørring for de relevante resultatene. Det er også mulig å trykke på dobbeltpil til venstre for å gå tilbake til første side. Hvis en bruker legger til filtrering, søk eller sortering vil pagineringen nullstilles til første side av søkeresultatene.

### Brukergenerert data og avansert visning

Som brukergenerert data har gruppen valgt å lagre alle unike søkeord som blir brukt samt hvor mange ganger dette søkeordet er brukt. For å presentere dataen har vi valgt å legge det inn i en ordsky, denne finner man på siden om man trykker på “Mest populære søk”. Visningen har en begrensning på de 30 mest populære søkene slik at ordene i ordskyen ikke blir for små ved mange unike søk. 

## Krav til bruk av teknologi

### Backend

##### MongoDB

Gruppen har valgt å benytte MongoDB som database i dette prosjektet. Gruppen ønsket å lære seg denne teknologien fordi det er en generell, dokument-basert, distribuert database som er basert på NoSQL. Databasen kan også kjøres lokalt på serveren fremfor på en skybasert tjeneste. 

Databasen består av to collections; `products` og `popularSearches`, som henholdsvis inneholder informasjon om produktene på [vinmonopolet.no](https://www.vinmonopolet.no/datadeling/csv) og de mest populære søke på nettsiden vår. 

Vi lastet ned Vinmonopolet sin CSV-fil som inneholder diverse informasjon om alle produktene på deres nettside. Datasettet inneholdt mange felt vi tenker er urelevant for vår nettside, som vi valgte å fjerne. Deretter opprettet vi et nytt felt `AlkoholPrKrone`, og regnet ut de respektive verdiene for alle produkter med Numbers. Vi importerte datasettet til databasen med MongoDB Compass. Siden alle feltene i CSV-filen fra Vinmonopolet var Strings, valgte vi å lage en spørring for å konvertere feltene `Pris` og `Alkohol` til Integer, og `AlkoholPrKrone` til Floats. Årsaken til dette er at vi utfører filtrering og sortering på disse verdiene, som må være numeriske for å gi korrekt resultat. Vi valgte å beholde `Argang` som String fordi alle årstall har fire siffet, slik at filtreringen av verdien som String blir korrekt. I tillegg har mange av produktene ingen årgang (gaveesker ol.), slik at denne verdien ikke kan konverteres direkte til Integer.

I popularSearches lagrer vi alle søkeord som er benyttet av brukerne på nettsiden, samt. hvor mange ganger søkeordet er søkt på. 

##### GraphQL og API

For henting av data fra databasen har vi valgt å bruke GraphQL. Dette fordi vi ønsker å lære dette fremfor REST API da det skal være nyere og mer moderne. GraphQL er koblet opp mot Mongoose i app.js i server-mappen. 

GraphQL brukergrensesnittet kan aksesseres ved å åpne siden [http://it2810-38.idi.ntnu.no:3000/graphql](http://it2810-38.idi.ntnu.no:3000/graphql) i en nettleser. Her er det mulig å skrive GraphQL spørringer for å hente data fra databasen.

##### Express

Gruppen har benyttet Express som API og webserver. Ved bruk av Express trenger vi ikke å fokusere på lavnivå prosesser, protokoller osv. Express serveren kan startes fra directory `/catalog-app/node-react-graphql/server` med kommandoen `npm start`, eller `forever start “npm start” ./` for å kjøre serveren permanent i bakgrunnen . Videre benytter vi `nodemon` for å kjøre serveren slik at serveren starter på nytt ved endringer i koden.

##### Mongoose

Bruk av rammeverket Mongoose muliggjør en enkel, skjemabasert modellering av applikasjonsdata. Mongoose benyttes også til type-casting og spørringer til databasen. Vi har en spørring til hver collection i databasen. Spørringen `productQuery` håndterer søk, filtrering, paginering og sortering. Spørringen benytter `.find(...)` for filtrering på spesifiserte argumenter. Funksjonen `.or(...)` brukes med regular expressions for søk på produkttype, produktnavn og land. Videre brukes `.sort(...)` for sortering etter et spesifisert database-felt. Tilslutt brukes funksjonen `.skip(...)` for paginering.


### Frontend

#### Responsivt design
Gruppen har brukt Bootstrap4 for oppsettet av siden. På venstre siden av siden har komponentene SearchBar, FilterGroup, SortDropdown og ModalContainer fått bootstrap klassen “col-md-4”, mens de pagination og table fikk “col-md-8”. Det betyr at “grid”-et deles inn slik at høyredelen tar større del av siden enn venstredelen. Når skjermen blir mindre enn “md” (medium), vil filter wrappes til å være over tabellen.
Det er også brukt CSS media queries for f.eks. å gjøre ModalContainer større ved wrapping.

#### React
Gruppen benyttet av seg både funksjonelle og klasse komponenter. Det er brukt både egenlagde komponenter (eks. Pagination, Header og SearchBar), samt tredjepartskomponenter (eks ReactWordCloud, BootstrapTable og Accordion). Koden er skrevet i ES6, med ESLint som linter.
Komponentene kan gjenbrukes som feks. Pagination har blitt gjort, og lett omplasseres.
BootstrapTable brukes strengt bare som visning av dataen, da all sortering, paginering, filtrering og søking håndteres som nevnt backend.

##### MobX og state management
Gruppen valgte å bruke MobX for state management for prosjektet. MobX ble hovedsakelig valgt på grunn av størrelsen til prosjektet, da Redux ofte er valget for store prosjekter. Siden gruppen ikke hadde noen erfaring med noen av disse rammeverkene, var MobX også anbefalt som et startpunkt.

Det er tre instanser til unntak for bruk av MobX for state management. I FilterGroup, ModalContainer, og SearchBar komponentene, blir React sitt innebygde state management brukt. Disse brukes for å holde intern state på komponenten i form av feks. å vise live oppdatering på hva som skrives inn i søkefeltet.

##### Eksempel på bruk av MobX:
MobX bruker konseptet av at det er stores som holder styr på states. Deretter brukes det en Provider komponent som wrappes rundt komponenter som trenger tilgang til store.
<kodesnutt>

 Provider komponenten “injecter” stores som brukes inn i komponentene. 
<kodesnutt>
Under er et eksempel på bruk av MobX og Pagination komponenten. Pagination er “injected” med “paginationStore”. 
<kodesnutt>
Ved å kjøre en “action” på Pagination, kjøres f eks en funksjon i paginationStore som kan oppdatere en variabel (state) i samme store. Denne kan da Table som også er en “observer”, ta imot og vise.

Eksempel med kun Pagination. Andre stores og komponenter vises ikke i diagrammet.

##### ApolloClient

ApolloClient tar imot GraphQL spørringene og sender de til serveren, og fetcher dataen i UIet. 

## Testing

### Cross-browser og responsivt design
Nettsiden er testet i Chromium (Version 76.0.3809.100), Chrome (Version 77.0.3865.120), Safari (Version 12.1.1), Firefox Quantum (Version 69.0.2).
Det er også testet for responsiv design til desktop, nettbrett og mobil.

### End-end testing
Vi har valgt å bruke Cypress som testrammeverk som anbefalt av foreleser. For å åpne Cypress og starte testingen kan man kjøre:
‘’’npm run cypress:open’’’
I Cypress har vi valgt å teste de viktigste funksjonene siden har å by på:
Lasting av siden
Søk
Sortering
Filtrering
Paginering
Avansert visning
Med dette har vi også fått testet andre viktige ting med siden som henting av data fra databasen. På testing av søk, filtrering og sortering har vi valgt å kun teste en ting da andre tester ville vært svært like å ikke gitt noe særlig mer læringsutbytte. Vi valgte å ha en fil per test for en oversiktlig kode og enkel feilsøking om en test skulle feile. 

### Testing med Jest og Enzyme

Dette prosjektet benytter Jest for snapshot-testing, og unit-testing. Etter foregående prosjekt var gruppen allerede komfortable med oppsett og enkle tester med dette rammeverket. Vi har skrevet syv snapshot-tester som sjekker om de tilhørende React-komponentene renderer riktig. Vi valgte bevisst å ikke teste alle komponenter siden det hadde medført repetitivt arbeid uten noe større læringsutbytte.

Videre har gruppen laget unit-tester for MobX stores. Disse tester at actions og observables fungerer som de skal. Det er også brukt Enzyme for integrasjonstesting, der vi tester Pagination komponenten.
<kodesnutt>



## Bruk av Git
Gruppen har benyttet seg av GitLab sin “boards” funksjon for issues, da gruppen var vant med dette fra forrige prosjekt. Dette er delt inn i “Open”, “To-Do”, “Doing”, og “Closed”. Alle issues får en automatisk generert ID. Denne ID’en bruker gruppen på sine commits, i form av f.eks. #48 for Issue 48.

Videre har gruppene laget en branch for hver issue som jobbes med. Disse merges så inn til en “dev”-branch. Når en del funksjoner har blitt lagt til i “dev”, vil denne så bli pushet inn i “master” etter reviews av andre i gruppen, da “master”-branchen er beskyttet.

### Variabelnavn
Variabelnavnene i frontend bruker camelCase, og engelsk. I backend brukes uppercase for variabelnavn samt på norsk, ettersom data fra vinmonopolet sitt api var på norsk. Der backend variabler refereres i frontend er det dermed ulikt.
