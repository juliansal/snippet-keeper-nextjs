const { PrismaClient } = require('@prisma/client')
const home = require('../pages/api/home')

test('should have Snippets in the database', async () => {
	const prisma = new PrismaClient()

	expect(await prisma.snippet).toBeTruthy()

})


