describe('template spec', () => {
  it('passes', () => {
    cy.visit('/')
  })
})

describe('login', () => {
  it('logs in with Sandra', () => {
    cy.visit('/')
    cy.get('#_username').type('Sandra')
    cy.get('#_password').type('123456')
    cy.get('#_login_button').click()
    cy.url().should('include', '/equipes_regras.html')
  })
})