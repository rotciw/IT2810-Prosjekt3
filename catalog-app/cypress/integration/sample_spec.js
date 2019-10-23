describe('Visit studentpolet', function() {
    it('Visit studentpolet!', function() {
        cy.visit('localhost:3001');
        cy.get('#searchBar').type('Gin').should('have.value', 'Gin');
    })
  })