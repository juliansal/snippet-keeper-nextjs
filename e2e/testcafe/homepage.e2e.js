import { Selector } from 'testcafe';

const newBtn = Selector('a').withText('NEW')
const copyBtn = Selector('button').withText('COPY')

fixture `Visit Snippet Keeper`
	.page `http://localhost:3000/`
	.beforeEach(() => {
		console.log("About to run test")
	})

test('should see copy buttons', async (browser) => {
	
	await browser
		.click(copyBtn)
		.expect(Selector('h1').innerText)
		.eql('Snippet Keeper')
	
})

test('should see copy buttons', async (browser) => {
	
	await browser
		.click(copyBtn)
		.expect(Selector('h1').innerText)
		.eql('Snippet Keeper')
	
})

test('should see copy buttons', async (browser) => {
	
	await browser
		.click(copyBtn)
		.expect(Selector('h1').innerText)
		.eql('Snippet Keeper')
	
})





