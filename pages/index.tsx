import Head from 'next/head'
import { useState } from 'react'
import Layout, { siteTitle } from '../components/layout'
import { getAllSnippets } from '../data/snippets'
import { Snippet } from '../data/data-types'
import Link from 'next/link'
import { GetServerSideProps, GetStaticProps } from 'next'
import { ToastContainer, toast } from 'react-toastify'
import { getSession, signIn, signOut, useSession } from 'next-auth/client'
import 'react-toastify/dist/ReactToastify.css'

export const getServerSideProps: GetServerSideProps = async (ctx) => {
	const session = await getSession(ctx)
	let snippets = null

	if (session) {
		snippets = await getAllSnippets()
	}

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
	const [session, loading] = useSession()
	const [snipps, setSnipps] = useState(snippets)

	const refreshData = async () => {
		const res = await fetch('/api/snippets', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const data = await res.json()
		setSnipps(data)

	}

	const handleSelection = async (e:any) => {
		e.preventDefault()
		e.persist()
		let bank = e.target.value

		const res = await fetch('/api/snippets/'+bank, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		const data = await res.json()
		setSnipps(data)

	}

	const handleDelete = async (e:any) => {
		e.preventDefault()
		e.persist()
		const targetId = e.target.parentNode.parentNode.getAttribute('data-id')
		if (session?.user.name === "Julio Salguero") {
			const res = await fetch('/api/snippets', {
				method: 'DELETE',
				headers: {
					'Content-Type': 'application/json'
				},
				body: JSON.stringify({targetId})
			})
			const data = await res.text()
			console.log(data)
			refreshData()
		} else {
			toast("Bitch, you can't hack this shit!")
		}
	}

	const handleCopy = async (e:any) => {
		e.preventDefault()
		e.persist()
		const targetCmd: HTMLCollection = await e.target.parentNode.parentNode.childNodes
		let copyCmd: any

		for (let i = 0; i < targetCmd.length; i++) {
			if (targetCmd[i].className === 'snippet-cmd') {
				console.log("copied", targetCmd[i])
				copyCmd = targetCmd[i]
			}
		}

		copyCommand(await copyCmd)
	}

	function copyCommand(copyCmd: any) {
		let range = document.createRange()
		range.selectNodeContents(copyCmd)
		window.getSelection()?.addRange(range)
		document.execCommand("Copy")
		toast("Copied: " + copyCmd.innerHTML)
		window.getSelection()?.removeAllRanges()
	}

	function bankSelection() {
		return (
			<select name="bankSelection" onChange={(e) => handleSelection(e)}>
				<option value="All">All</option>
				<option value="ABT">ABT</option>
				<option value="CBT">CBT</option>
				<option value="NBAZ">NBAZ</option>
				<option value="NSB">NSB</option>
				<option value="ZFNB">ZFNB</option>
			</select>
		)
	}

	if (loading) {
		return <div>Loading...</div>
	}

	if (session) {
		return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<div className="row">
				<div className="column to-left">
					{ bankSelection() }
				</div>
				<div className="column to-right">
					<button 
						className="sign-out"
						onClick={() => signOut()}>Sign Out</button>
					<Link href="/new">
						<a className="button button-outline heading-btn">New</a>
					</Link>
					<ToastContainer/>
				</div>
			</div>
			<div id="snippets">
			{ snipps?.map(({ id, command, bankName }) => (
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
	} else {
		return (
			<button onClick={() => signIn()}>Sign In</button>
		)
	}
}

export default Home

