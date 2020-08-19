describe('Testing Pizza Form', () => {
    beforeEach( () => {
        cy.visit('http://localhost:3000/pizza');
    })
    it('checking Pizza Form Functionality', () => {
        //checking typing in name input
        cy
        .get('[data-cy = name]')
        .type("Bill")
        .should('have.value','Bill');

        //checking typing in special directions
        cy
        .get('[data-cy = special]')
        .type("Nope")
        .should('have.value',"Nope");

        //checking selecting from drop down
        cy
        .get('[data-cy = size]')
        .select("Medium")
        .should('have.value','Medium');

        //testing checking multiple toppings
        cy
        .get('[data-cy = peperoni]')
        .check()
        .should('be.checked');
        cy
        .get('[data-cy = sausage]')
        .check()
        .should('be.checked');
        cy
        .get('[data-cy = ham]')
        .check()
        .should('be.checked');
        cy
        .get('[data-cy = anchovies]')
        .check()
        .should('be.checked');

        //checking Submit
        cy
        .get('[data-cy = submit]')
        .click();

    });

}) 