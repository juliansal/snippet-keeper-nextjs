/// <reference types="cypress" />

describe('My first test', () => {

	it('does not do much', () => {
		expect(true).to.equal(true)
	})
})

describe('Visit Snippet Keeper', () => {
	beforeEach(() => {
		cy.visit('https://snippet-keeper-nextjs.vercel.app/')
		console.log("About to run test")
	})

	it('should see copy buttons', () => {
		cy
			.get('button')
			.contains('Copy')
			.click()
		
		cy
			.get('h1')
			.should('have.text', 'Snippet Keeper')
	})

})