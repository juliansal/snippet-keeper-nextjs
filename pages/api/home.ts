import { NextApiRequest, NextApiResponse } from 'next'

export default (_: NextApiRequest, res: NextApiResponse) => {
	const { method } = _
	console.log(_.body)

	switch (method) {
		case 'GET':
			console.log("received GET request from homepage")
			break
		case 'POST':
			console.log("received POST request from homepage", _.body.targetId)
			break
		case 'PUT':
			console.log("received PUT request from homepage", _.body.targetId)
			break
		case 'DELETE':
			console.log("received DELETE request from homepage", _.body.targetId)
			break
		default:
			res.setHeader('Allow', ['GET', 'POST', 'PUT', 'DELETE'])
      		res.status(405).end(`Method ${method} Not Allowed`)
	}

}

