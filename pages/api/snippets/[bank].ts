import { NextApiRequest, NextApiResponse } from 'next'
import { getAllSnippets, getSnippets } from '../../../data/snippets'


export default async (_: NextApiRequest, res: NextApiResponse)  => {
	const { method } = _

	switch (method) {
		case 'GET':
			console.log("received GET request", _.query["bank"])
			let data
			try {
				if (_.query["bank"] === "All") {
					data = await getAllSnippets()
				} else {
					data = await getSnippets(_.query["bank"])
				}
				res.send(data)
			} catch (error) {
				res
					.status(500)
					.send("Sorry couldn't connect to the database")
			}
			break
		default:
			res.setHeader('Allow', ['GET'])
      		res.status(405).end(`Method ${method} Not Allowed`)
	}

}