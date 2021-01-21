import { NextApiRequest, NextApiResponse } from 'next'
import { getAllSnippets, deleteSnippet, postSnippet } from '../../data/snippets'


export default async (_: NextApiRequest, res: NextApiResponse)  => {
	const { method } = _

	switch (method) {
		case 'GET':
			console.log("received GET request")
			res.status(200).send(await getAllSnippets())
			break
		case 'POST':
			console.log("received POST request", _.body)
			await postSnippet(_.body)
			res.status(200).send("sent...")
			break
		case 'PUT':
			console.log("received PUT request", _.body.targetId)
			break
		case 'DELETE':
			console.log("received DELETE request", _.body.targetId)
			await deleteSnippet(parseInt(_.body.targetId))
			res.status(200).send("deleting...")
			break
		default:
			res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      		res.status(405).end(`Method ${method} Not Allowed`)
	}

}

