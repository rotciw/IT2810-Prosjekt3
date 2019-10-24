describe('Test filtering', function() {
    it('Filter successfully implemented!', function() {
        cy.visit('/');
        cy.get('.cardHeader').contains("Land").click();
        cy.get("#0").click();
        cy.get("#table").contains("Norge");
    })
  })