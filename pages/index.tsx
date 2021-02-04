import Head from 'next/head'
import { useState } from 'react'
import Layout, { siteTitle } from '../components/layout'
import { Snippet } from '../data/snippets'
import Link from 'next/link'
import { GetServerSideProps, GetStaticProps } from 'next'
import { ToastContainer, toast } from 'react-toastify'
import 'react-toastify/dist/ReactToastify.css'

export const getServerSideProps: GetServerSideProps = async () => {
	const snippets = await fetch('http://localhost:3000/api/home', {
		method: 'GET',
		headers: {
			'Content-Type': 'application/json'
		}
	})
	.then(response => response.json())
	.then(data => data)
	.catch(err => console.log(err))

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
	const [snipps, setSnipps] = useState(snippets)

	const refreshData = async () => {
		await fetch('http://localhost:3000/api/home', {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(data => setSnipps(data))
		.catch(err => console.log(err))

	}

	async function handleSelection(e: any) {
		e.preventDefault()
		e.persist()
		let bank = e.target.value

		await fetch('http://localhost:3000/api/home/'+bank, {
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		})
		.then(response => response.json())
		.then(data => setSnipps(data))
		.catch(err => console.log(err))

	}

	function handleDelete(e: any) {
		e.preventDefault()
		e.persist()
		const targetId = e.target.parentNode.parentNode.getAttribute('data-id')
		fetch('/api/home', {
			method: 'DELETE',
			headers: {
				'Content-Type': 'application/json'
			},
			body: JSON.stringify({targetId})
		})
		.then((res: Response) => res.text())
		.then((data: String) => {
			console.log(data)
			refreshData()
		})
		.catch(err => console.log(err))
	}

	function handleCopy(e: any) {
		e.preventDefault()
		e.persist()
		const targetCmd: HTMLCollection = e.target.parentNode.parentNode.childNodes
		let copyCmd: any

		for (let i = 0; i < targetCmd.length; i++) {
			if (targetCmd[i].className === 'snippet-cmd') {
				console.log("copied", targetCmd[i])
				copyCmd = targetCmd[i]
			}
		}

		copyCommand(copyCmd)
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
				<Link href="/new">
					<a className="button button-outline heading-btn">New</a>
				</Link>
				<ToastContainer/>
			</div>
		</div>
		<div id="snippets">
		{ snipps.map(({ id, command, bankName }) => (
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

