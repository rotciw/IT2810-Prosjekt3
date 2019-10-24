describe('Visit studentpolet', function() {
    it('Visit studentpolet!', function() {
        cy.visit('http://it2810-38.idi.ntnu.no/prosjekt3/');
        cy.get('#searchBar').type('Gin').should('have.value', 'Gin');
        cy.get('#button').click();
    })
  })