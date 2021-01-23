import { NextApiRequest, NextApiResponse } from 'next'
import { getSnippets } from '../../../data/snippets'


export default async (_: NextApiRequest, res: NextApiResponse)  => {
	const { method } = _

	switch (method) {
		case 'GET':
			console.log("received GET request", _.query["bank"])
			res.status(200).send(await getSnippets(_.query["bank"]))
			break
		default:
			res.setHeader('Allow', ['GET'])
      		res.status(405).end(`Method ${method} Not Allowed`)
	}

}