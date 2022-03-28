describe('Blog app', function () {
  beforeEach(function () {
    cy.request('POST', 'http://localhost:3003/api/testing/reset');
    const user = {
      name: 'Luka Dimnik',
      username: 'ldimnik',
      password: 'test',
    };
    cy.request('POST', 'http://localhost:3003/api/users/', user);
    cy.visit('http://localhost:3000');
  });

  it('Login form is shown', function () {
    cy.contains('Login');
    cy.get('#username');
    cy.get('#password');
    cy.get('#login-button');
  });

  describe('login', function () {
    it('succeds with correct credentials', function () {
      cy.contains('Login');
      cy.get('#username').type('ldimnik');
      cy.get('#password').type('test');
      cy.get('#login-button').click();
      cy.contains('Luka Dimnik logged in');
    });

    it('fails with incorrect credentials', function () {
      cy.contains('Login');
      cy.get('#username').type('ldimnik');
      cy.get('#password').type('balon');
      cy.get('#login-button').click();
      cy.get('.error').should('have.css', 'color', 'rgb(255, 0, 0)');
      cy.get('.error').contains('incorrect username or password');

      cy.get('html').should('not.contain', 'Luka Dimnik logged in');
    });
  });
});
