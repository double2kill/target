// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
Cypress.Commands.add('login', (username = '刘晨') => {
    cy.get('[data-test-id="登录"]').click()
    cy.get('[data-test-id="登录弹窗"] [data-test-id="用户名"] input').focus().type(username)
    cy.get('.n-dialog__action button.n-button--primary-type').click()
    cy.wait(200)
})

Cypress.Commands.add('logout', () => {
    cy.get('[data-test-id="登出"]').click()
})