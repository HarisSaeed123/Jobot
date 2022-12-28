
/// <reference types="cypress"/>
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

Cypress.Commands.add('typeInput', (selector, value) => {
    cy.get(selector).type(value).should('have.value', value)
})
Cypress.Commands.add('button', (selector) => {
    cy.get(selector).should('be.visible').click()
})
Cypress.Commands.add('selectIndustry', (selector, listSelect, value) => {
    cy.get(selector).click()
    cy.get(listSelect).contains(value).click({force:true})
})
Cypress.Commands.add('validationMessage', (selector, value) => {
    cy.get(selector).then(errorMsg => {
        if(errorMsg.text().includes("Email required")){
            cy.get(selector).should('have.text', value)
        }
    })
   
})