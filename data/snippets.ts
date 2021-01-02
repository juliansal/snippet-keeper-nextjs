export type Snippet = {
	id: string
	command: string
	bankName: string
}

export const snippets: Snippet[] = [
	{
		id: "1",
		command: "mvn -X something something 1",
		bankName: "ZFNB"

	},
	{
		id: "2",
		command: "mvn -X something something 2",
		bankName: "NSB"

	},
	{
		id: "3",
		command: "mvn -X something something 3",
		bankName: "ZFNB"

	},
	{
		id: "4",
		command: "mvn -X something something 4",
		bankName: "CBT"

	}
]