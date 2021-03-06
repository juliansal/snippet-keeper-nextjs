import { Prisma, PrismaClient } from '@prisma/client'

export type Snippet = Prisma.SnippetGetPayload<{}>

const prisma = new PrismaClient()

export const getAllSnippets = async () => {
	return await prisma.snippet.findMany()
		.catch(err => console.error(err))
		.finally(() => prisma.$disconnect())
}

export const getSnippets = async (param: any) => {
	return await prisma.snippet.findMany({
		where: {
			bankName: param
		}
	})
		.catch(err => console.error(err))
		.finally(() => prisma.$disconnect())
}

export const deleteSnippet = async (id: number) => {
	return await prisma.snippet.delete({
		where: { id: id }
	})
		.catch(err => console.error(err))
		.finally(() => prisma.$disconnect())
}

export const postSnippet = async (data: any) => {
	return await prisma.snippet.create({
		data: {
			command: data.commandField,
			bankName: data.bankField
		}
	})
		.catch(err => console.error(err))
		.finally(() => prisma.$disconnect())
}




