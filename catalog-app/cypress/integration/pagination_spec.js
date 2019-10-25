describe('Testing pagination', function() {
    it('Found different result on first and second page!', function() {
        cy.visit('/');
        cy.get("td").first().then(($first) =>{
            cy.get('.paginationButton').last().click();
            cy.wait(500);
            cy.get("td").first().should(($sec) =>{
                expect($first.html()).not.to.eq($sec.html());
            });
        });
    });
  });