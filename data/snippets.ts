import { Prisma, PrismaClient } from '@prisma/client'

export type Snippet = Prisma.SnippetGetPayload<{}>

const prisma = new PrismaClient()

export const getAllSnippets = async () => {
	return await prisma.snippet.findMany()
}

export const getSnippets = async (param: any) => {
	console.log(param)
	return await prisma.snippet.findMany({
		where: {
			bankName: param
		}
	})
}

export const deleteSnippet = async (id: number) => {
	return await prisma.snippet.delete({
		where: { id: id }
	})
}

export const postSnippet = async (data: any) => {
	return await prisma.snippet.create({
		data: {
			command: data.commandField,
			bankName: data.bankField
		}
	})
}




