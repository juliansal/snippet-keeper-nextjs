import { NextApiHandler } from 'next'
import NextAuth from 'next-auth'
import Providers from 'next-auth/providers'
import Adapters from 'next-auth/adapters'
import { PrismaClient } from '@prisma/client'
import { env } from 'process'

const prisma = new PrismaClient()

const options = {
	providers: [
		Providers.Google({
			clientId: env.GOOGLE_ID || "",
			clientSecret: env.GOOGLE_SECRET || ""
		})
	],
	adapter: Adapters.Prisma.Adapter({prisma}),
	secret: env.SECRET
}

const authHandler: NextApiHandler = (req, res) => NextAuth(req, res, options)
export default authHandler