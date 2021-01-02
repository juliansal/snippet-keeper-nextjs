import Head from 'next/head'
import Layout, { siteTitle } from '../components/layout'
import { Snippet } from '../data/snippets'
import Link from 'next/link'
import { GetStaticProps } from 'next'
import { PrismaClient } from '@prisma/client'

const prisma = new PrismaClient()

export const getStaticProps: GetStaticProps = async () => {
	const snippets = await prisma.snippet.findMany()
	return {
		props: {
			snippets
		}
	}
}

interface HomeProps {
	snippets: Snippet[]
}

const Home: React.FC<HomeProps> = ({snippets}) => {

	const handleDelete = (e: any) => {
		e.preventDefault()
		e.persist()
		const targetId = e.target.parentNode.parentNode.getAttribute('data-id')
		console.log(targetId)
		fetch('/api/home', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({targetId})
		}) 
	}

	const handleCopy = (e: any) => {
		e.preventDefault()
		e.persist()
		const targetCmd = e.target.parentNode.parentNode.childNodes

		targetCmd.forEach((el: any) => {
			if (el.getAttribute("class") === "snippet-cmd") {
				navigator
					.clipboard
					.writeText(el.innerHTML)
					.then(() => console.log("copied", el.innerHTML))
			}
		})
	}

	return (
		<Layout home>
		<Head>
			<title>{siteTitle}</title>
		</Head>
		<div className="row">
			<div className="column to-right">
				<Link href="/newsnippet">
					<a className="button button-outline heading-btn">New</a>
				</Link>
			</div>
		</div>
		<div id="snippets">
		{ snippets.map(({ id, command, bankName }) => (
			<div className="snippet" data-id={ id } key={ id }>
				<div className="snippet-name"><span>{ bankName }</span></div>
				<div className="snippet-cmd">{ command }</div>
				<div className="snippet-delete">
					<button onClick={(e) => handleDelete(e)} className='button'>Delete</button>
				</div>
				<div className="snippet-copy">
					<button onClick={(e) => handleCopy(e)} className='button-black'>Copy</button>
				</div>
			</div>
		))}
		</div>
		</Layout>
	)
}

export default Home

