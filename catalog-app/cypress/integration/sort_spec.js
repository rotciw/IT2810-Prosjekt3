describe('Testing sorting', function() {
    it('Sort after alcohol (low-high), check the first elemet then sort after alcohol(high-low) and first element again!', function() {
        cy.visit('/');
        cy.get('.dropdownContainer').click();
        cy.get('#Alkohol').click();
        cy.wait(1000);
        cy.get("td").first().click();
        
        //0% is the lowest possible percentage of alcohol possible
        cy.get('.expandedRow').contains(' 0%');
        cy.get('.dropdownContainer').click();
        cy.get('#-Alkohol').click();
        //The delay is long because our database had much traffic and the test fails if it does not load
        cy.wait(1000);
        cy.get("td").first().click();
        //60% is the highest percentage alcohol legal in Norway
        cy.get('.expandedRow').contains('60%');
    });
  });