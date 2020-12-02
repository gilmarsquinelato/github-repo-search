import { SEARCH_TEST_ID } from '../../src/components/SearchInput';
import { TABLE_TEST_ID } from '../../src/repository/components/RepositoryTable';

describe('search', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000');

    cy.get(`[data-testid="${TABLE_TEST_ID}"]`).as('table').end();
    cy.get(`[data-testid="${SEARCH_TEST_ID}"]`).as('searchContainer').end();
    cy.get('@searchContainer')
      .find('input[type="text"]')
      .as('searchField')
      .end();
  });

  it('updating the search field', () => {
    cy.get('@searchField').type('react').end();

    cy.get('@searchContainer')
      .find('button')
      .then(($button) => {
        expect(Cypress.dom.isVisible($button)).to.be.true;
      });
  });

  it('clear search field when pressing the clear button', () => {
    cy.get('@searchField').type('react').end();
    cy.get('@searchContainer').find('button').click();
    cy.get('@searchField').should('have.value', '');
  });

  it('calling Github GraphQL API', () => {
    cy.intercept('POST', 'https://api.github.com/graphql').as('postSearch');

    cy.get('@searchField').type('react').end();
    cy.wait('@postSearch').should(({ request, response }) => {
      expect(request.body.operationName).to.be.equal('SearchRepositories');
      expect(request.body.variables.query).to.be.equal('react');

      expect(response?.body.data.search.nodes.length).to.be.equal(5);
    });
  });

  it('rendering the search results', () => {
    cy.intercept('POST', 'https://api.github.com/graphql').as('postSearch');

    cy.get('@searchField').type('react').end();
    cy.wait('@postSearch').end();

    cy.get('@table').find('tbody').children().should('have.length', 5);
  });

  it('rendering next page', () => {
    cy.intercept('POST', 'https://api.github.com/graphql').as('postSearch');

    cy.get('@searchField').type('react').end();
    cy.wait('@postSearch').end();

    cy.get('@table').find('button[title="Next page"]').click();

    cy.wait('@postSearch').end();
    cy.contains('6-10 ').should('exist');
  });

  it('rendering previous page', () => {
    cy.intercept('POST', 'https://api.github.com/graphql').as('postSearch');

    cy.get('@searchField').type('react').end();
    cy.wait('@postSearch').end();

    cy.get('@table').find('button[title="Next page"]').click();
    cy.wait('@postSearch').end();

    cy.get('@table').find('button[title="Previous page"]').click();
    cy.wait('@postSearch').end();

    cy.contains('1-5 ').should('exist');
  });

  it('items per page', () => {
    cy.intercept('POST', 'https://api.github.com/graphql').as('postSearch');

    cy.get('@searchField').type('react').end();
    cy.wait('@postSearch').end();

    cy.get('div[role="button"]').contains('5').click();
    cy.get('li[role="option"]').contains('25').click();

    cy.wait('@postSearch').should(({ request, response }) => {
      expect(request.body.variables.first).to.be.equal(25);

      expect(response?.body.data.search.nodes.length).to.be.equal(25);
    });

    cy.get('@table').find('tbody').children().should('have.length', 25);
  });
});
