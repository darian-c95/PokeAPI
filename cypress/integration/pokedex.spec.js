/// <reference types="Cypress" />

describe('Pokedex', () => {
  let fetchPolyfill;

  before(() => {
    const polyfillUrl = 'https://unpkg.com/unfetch/dist/unfetch.umd.js';

    cy.request(polyfillUrl)
      .then((response) => {
        fetchPolyfill = response.body;
      });

  
    cy.intercept('https://pokeapi.co/api/v2/pokemon?limit=5000&offset=0', {fixture:'primeros-veinte-pokemones'})

    cy.visit('http://192.168.0.108:8081', {
      onBeforeLoad(contentWindow) {
        // eslint-disable-next-line no-param-reassign
        delete contentWindow.fetch;
        contentWindow.eval(fetchPolyfill);
        // eslint-disable-next-line no-param-reassign 
        contentWindow.fetch = contentWindow.unfetch;
      },
    });
  });

  it('Carga todos los pokemones', () => {
    const TOTAL_POKEMONES = 1118;

    cy.get('#total-pokemones')
      .should('have.text', TOTAL_POKEMONES.toString());

    cy.get('.fas')
      .should('not.be.visible');

    cy.get('a')
    .should('have.length', 1118);

  });

  it('Carga un pokemon cuando se le hace click a un item de la lista', () => {
    
    cy.intercept('https://pokeapi.co/api/v2/pokemon/pidgey', {fixture:'pidgey'})

    const CANTIDAD_TIPOS = 2;

    cy.get('#titulo-descripcion')
    .should('have.text', 'Hay 1118 pokemones en la Pokedex. Elegí uno para ver su información.')

    cy.contains('Pidgey').click(); 

    cy.get('.fas')
    .should('be.visible');

    cy.get('#tipos span')
    .should('have.length', CANTIDAD_TIPOS);

    cy.get('#altura')
    .should('have.text', 'Altura: 3cm');
    
    cy.get('#peso')
    .should('have.text', 'Peso: 18g');  

    cy.get('#experiencia_base')
    .should('have.text', 'Experiencia Base: 50');  

    cy.get('#total-habilidades p')
    .should('have.length', 3);

  })

})
