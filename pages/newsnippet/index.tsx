import Head from 'next/head'
import Link from 'next/link'
import Layout, { siteTitle } from '../../components/layout'

const NewSnippet: React.FC = () => {

	return (
		<Layout home>
			<Head>
				<title>{siteTitle}</title>
			</Head>
			<>
				<div className="row">
					<div className="column column-50">
						<h2>Add New Snippet</h2>
					</div>
					<div className="column to-right">
						<Link href="/">
							<a className="button button-outline heading-btn">Home</a>
						</Link>
					</div>
				</div>

				<form id="addSnippet">
					<label>Snippet Name</label>
					<input type="text" name="nameField" /><br />
					<label>Command String</label>
					<textarea name="commandField"></textarea><br />
					<input type="submit" value="Save" />
				</form>
			</>
		</Layout>
	)
}

export default NewSnippet
