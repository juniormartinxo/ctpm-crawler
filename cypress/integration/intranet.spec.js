/// <reference types="Cypress" />
// intranet.spec.js created with Cypress
//
// Start writing your Cypress tests below!
// If you're unfamiliar with how Cypress works,
// check out the link below and learn how to write your first test:
// https://on.cypress.io/writing-first-test
describe('My First Test', () => {
  it('Visits the app root url', () => {
    cy.visit('https://principal.policiamilitar.mg.gov.br/')
    cy.get('#textLogin').type('1273754')
    cy.get('#senha').type('moises21')
    cy.get('#btnEntrar').click()
    cy.wait(5000)
    //cy.get('#input_pesquisa_funcionalidade_menu_principal').click()
    cy.get('#div_pesquisa_menu').click()
  })

  /*
  it('Acessar relatórios CTPM', () => {
    cy.visit(
      'https://www.sistemaspm.mg.gov.br/smb3_relatorios/pages/formularios/relatorios/acessoDiario.xhtml',
    )
  })
  */
})
