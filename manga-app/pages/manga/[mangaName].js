import Head from 'next/head'
import { Layout, Manga } from "#/components"
import { initializeApollo } from '#/api/apollo'
import { GET_MANGA_BY_TITLE } from '#/api/queries';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export default function MangaByTitle(props) {
	const router = useRouter()
	const title = router.asPath.substr(router.asPath.lastIndexOf("/") + 1, router.asPath.length);

	const pageTitle = title.split("-").map(w => w.replace(/^\w/, c => c.toUpperCase())).join(" ")

	const manga = props?.initialApolloState?.data?.mangaByTitle
    const error = props?.error;


	if(error) return <h2>{error}</h2>;

	if(!manga) return <h2>404 | Manga Not Found!</h2>

	return (
		<>
			<Head>
				<title>{pageTitle}</title>
				<meta name="description" content="Manga Reader" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout>
				<Manga manga={manga} />
			</Layout>
		</>
	)
}


export const getServerSideProps = async ({ query }) => {
	const apolloClient = initializeApollo();
	const title = query.mangaName;

	try{
		const initialApolloState = await apolloClient.query({
			query: GET_MANGA_BY_TITLE,
			variables: { title },
		})
	
		return { props: { initialApolloState} }

	}catch{
		return { 
			props: {
			  error: "failed fetching data from backend"
			}
		  }
	}
	
}
