describe('Test advanced search', function() {
    it('The advanced search window successfully opens!', function() {
        cy.visit('/')
        cy.get('.modalWrapper').should('have.attr','style', 'visibility: hidden;')
        cy.get('.openModalBtn').click()
        cy.get('.modalWrapper').should('have.attr','style', 'visibility: visible;')
    })
  })