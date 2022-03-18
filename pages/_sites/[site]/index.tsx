import type { GetStaticPaths, GetStaticProps, NextPage } from 'next'
import Head from 'next/head'
import { ParsedUrlQuery } from 'querystring';

interface Props {
	site: string
}

const Index: NextPage<Props> = ( { site } ) => {
	return (
		<div>
			<Head>
				<title>It works!</title>
			</Head>

			<h1>site:{ site }</h1>
		</div>
	)
}

export default Index


interface Params extends ParsedUrlQuery {
	site: string
}

export const getStaticPaths: GetStaticPaths<Params> = async () => (
	{
		paths: [],
		fallback: true,
	}
);

export const getStaticProps: GetStaticProps<Props, Params> = async ( { params } ) => (
	{
		props: { site: params?.site || '' },
	}
);