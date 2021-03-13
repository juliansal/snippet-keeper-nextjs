import Head from 'next/head'
import Link from 'next/link'
import { Formik, Form, Field, ErrorMessage } from 'formik'
import Layout, { siteTitle } from '../../components/layout'
import { InputField } from '../../components/form/inputFields'
import Router from 'next/router'
import { getSession } from 'next-auth/client'

const NewSnippet: React.FC = () => {

	const addSnippet = async (data: {}) => {
		let urlencoded = new URLSearchParams(data)
		const session = await getSession()
		if (session?.user.name === "Julio Salguero") {
			const res: Response = await fetch('/api/snippets', {
				method: 'POST',
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				},
				body: urlencoded
			})
			const text = await res.text()
			console.log(text)
		}
		await Router.push('/')
	}

	const SnippetForm: React.FC = () => {
		return (
			<Formik
				initialValues={{ bankField: '', commandField: '' }}
				validate={(values) => {
					const errors: any = {}
					if (values.bankField === '') {
						errors.bankField = 'Required'
					}
					return errors
				}}
				onSubmit={(values, actions) => {
					addSnippet(values)
					actions.setSubmitting(false)
					actions.resetForm({
						values: {
							bankField: '', commandField: ''
						}
					})
				}}
			>
			{(formik) => (
				<Form onSubmit={formik.handleSubmit}>
					<label>Bank Name</label>
					{ formik.errors && formik.touched.bankField ? (
						<div className="error-msg">{ formik.errors.bankField }</div>
					): null }
					<Field name="bankField" as="select">
						<option>Select a bank...</option>
						<option value="ABT">ABT</option>
						<option value="CBT">CBT</option>
						<option value="NBAZ">NBAZ</option>
						<option value="NSB">NSB</option>
						<option value="ZFNB">ZFNB</option>
					</Field>
					<label>Command String</label>
					<Field name="commandField" placeholder="type snippet..." as={InputField} />
					<input type="submit" value="Save" />
				</Form>
			)}
			</Formik>
		)
	}

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
				<SnippetForm />
			</>
		</Layout>
	)
}

export default NewSnippet
