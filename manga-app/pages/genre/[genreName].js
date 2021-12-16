import Head from 'next/head'
import { Layout, Genre } from "#/components"
import { initializeApollo } from '#/api/apollo'
import { GET_MANGAS_BY_GENRE } from '#/api/queries';
import { useQuery } from '@apollo/client';
import { useRouter } from 'next/router';

export default function MangaByTitle(props) {
	const router = useRouter()
	const title = router.asPath.substr(router.asPath.lastIndexOf("/") + 1, router.asPath.length);

	// const { data, error, loading } = useQuery(GET_MANGAS_BY_GENRE, {
	//     variables: { title: "Action" }
	// });
	// replace - a space, upper case words, eg: death-note -> Death Note
	const pageTitle = title.split("-").map(w => w.replace(/^\w/, c => c.toUpperCase())).join(" ")

	const mangas = props?.initialApolloState?.data?.mangasByGenre;
	const error = props?.error;

	if (error) return <h2>{error}</h2>;

	if (!mangas) return <h2>404 | no Mangas found for this Genre!</h2>;


	return (
		<div>
			<Head>
				<title>{pageTitle}</title>
				<meta name="description" content="Manga Reader" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout>
				<Genre mangas={mangas} title={pageTitle} />
			</Layout>
		</div>
	)
}


export const getServerSideProps = async ({ query }) => {
	const apolloClient = initializeApollo();
	const manga_name = query.genreName;

	try {
		const initialApolloState = await apolloClient.query({
			query: GET_MANGAS_BY_GENRE,
			variables: { manga_name },
		})


		return {
			props: { initialApolloState }
			// props: {initialApolloState: apolloClient.cache.extract() } 
		}

	} catch (e) {
		return {
			props: {
				error: "failed fetching data from backend"
			}
		}
	}

}
