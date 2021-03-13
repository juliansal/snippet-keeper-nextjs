import prismaClient from './prisma'

export const getAllSnippets = async () => {
	return await prismaClient().snippet.findMany()
		.catch(err => console.error(err))
		.finally(() => prismaClient().$disconnect())
}

export const getSnippets = async (param: any) => {
	return await prismaClient().snippet.findMany({
		where: {
			bankName: param
		}
	})
		.catch(err => console.error(err))
		.finally(() => prismaClient().$disconnect())
}

export const deleteSnippet = async (id: number) => {
	return await prismaClient().snippet.delete({
		where: { id: id }
	})
		.catch(err => console.error(err))
		.finally(() => prismaClient().$disconnect())
}

export const postSnippet = async (data: any) => {
	return await prismaClient().snippet.create({
		data: {
			command: data.commandField,
			bankName: data.bankField
		}
	})
		.catch(err => console.error(err))
		.finally(() => prismaClient().$disconnect())
}




