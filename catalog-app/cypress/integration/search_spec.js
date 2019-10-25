describe('Testing search', function() {
    it('Found the searched term in table!', function() {
        cy.visit('/');
        cy.get('#searchBar').type('Gin').should('have.value', 'Gin');
        cy.get('#button').click();
        cy.get("#table").contains("gin");
    });
  });