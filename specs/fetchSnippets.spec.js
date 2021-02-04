import React from 'react'
import { render } from '@testing-library/react'
import Home from '../pages/index'

const snips = [{
	"id":44,
	"command":"mvn -F dfsjl dfjlsd",
	"bankName":"CBT"
}]

test("title should be Snippet Keeper", async () => {
	const { getByText } = render(<Home snippets={snips} />)
	const titleElement = getByText("Snippet Keeper")
	expect(titleElement).toBeInTheDocument()
})