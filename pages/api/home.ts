import { NextApiRequest, NextApiResponse } from 'next'
import { getAllSnippets, deleteSnippet, postSnippet } from '../../data/snippets'


export default async (_: NextApiRequest, res: NextApiResponse)  => {
	const { method } = _

	switch (method) {
		case 'GET':
			console.log("received GET request")
			try {
				const data = await getAllSnippets()
				res
					.status(200)
					.send(data)
			} catch (error) {
				res
					.status(500)
					.json({error: "Sorry couldn't connect to the database"})
			}
			break
		case 'POST':
			console.log("received POST request", _.body)
			try {
				await postSnippet(_.body)
				res.status(200).send("sent...")
			} catch (error) {
				res
					.status(500)
					.json({error: "Sorry couldn't connect to the database"})
			}
			break
		case 'PUT':
			console.log("received PUT request", _.body.targetId)
			break
		case 'DELETE':
			console.log("received DELETE request", _.body.targetId)
			try {
				await deleteSnippet(parseInt(_.body.targetId))
				res.status(200).send("deleting...")
			} catch (error) {
				res
					.status(500)
					.json({error: "Sorry couldn't connect to the database"})
			}
			break
		default:
			res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      		res.status(405).end(`Method ${method} Not Allowed`)
	}

}

