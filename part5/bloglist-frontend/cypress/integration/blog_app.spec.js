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

  describe('When logged in', function () {
    beforeEach(function () {
      cy.login({ username: 'ldimnik', password: 'test' });
    });

    it('A blog can be created', function () {
      cy.get('#new-blog-button').click();
      cy.get('#titleInput').type('Pod svobodnim soncem');
      cy.get('#authorInput').type('Fran Saleski Finzgar');
      cy.get('#urlInput').type('www.siol.net/si');

      cy.get('#create-blog-button').click();
      cy.contains('Blog: Pod svobodnim soncem added successfully');
      cy.contains('Fran Saleski Finzgar');
    });

    describe('and several blogs exist', function () {
      beforeEach(function () {
        cy.createBlog({
          title: 'first blog',
          author: 'Author1',
          url: 'www.google.com',
        });
        cy.createBlog({
          title: 'second blog',
          author: 'Author2',
          url: 'www.najdi.si',
        });
        cy.createBlog({
          title: 'third blog',
          author: 'Author3',
          url: 'www.yahoo.com',
        });
      });

      it('we can increase the likes on the blog', function () {
        cy.get('.blog__firstblog').contains('like').click();
        cy.get('.blog__firstblog').contains('like').click();
        cy.get('.blog__firstblog').contains('view').click();
        cy.get('.blog__firstblog').contains('1');
      });
    });
  });
});
