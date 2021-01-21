/// <reference types="cypress" />

describe('Visit Snippet Keeper', () => {
	beforeEach(() => {
	  	cy.visit('http://localhost:3000/')
	})
   
	it('should see copy buttons', () => {
		cy
			.get('button').contains('Copy')
			.click()

		cy
			.get('h1')
			.should('have.text', 'Snippet Keeper')
	})
  
  
})
  