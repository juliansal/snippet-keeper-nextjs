const { PrismaClient } = require('@prisma/client')

test('should have Snippets in the database', async () => {
	const prisma = new PrismaClient()

	expect(await prisma.snippet).toBeTruthy()

})
