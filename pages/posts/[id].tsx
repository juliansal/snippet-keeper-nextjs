import Layout from '../../components/layout'
import { Post, posts } from '../../data/posts'
import Head from 'next/head'
import Date from '../../components/date'
import utilStyles from '../../styles/utils.module.css'
import { GetServerSideProps } from 'next'


export const getServerSideProps: GetServerSideProps = async ({
	params
}) => {
	const { id }: any = params
	const matchedPost = posts.find(
		(p: Post) => p.id === Number(id)
	)
	return {
		props: {
			post: matchedPost
		}
	}
}

const Blog: React.FC<Post> = (props) => {
	const { post }: any = props
	return (
		<Layout>
		<Head>
			<title>{post.title}</title>
		</Head>
		<article>
			<h1 className={utilStyles.headingXl}>{post.title}</h1>
			<div className={utilStyles.lightText}>
			<Date dateString={post.date} />
			</div>
			<div dangerouslySetInnerHTML={{ __html: post.contentHtml }} />
		</article>
		</Layout>
	)
}

export default Blog
