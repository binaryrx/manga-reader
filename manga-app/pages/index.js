import Head from 'next/head'
// import { useAuth } from '#/lib/auth';
import { Root, Login, Layout } from "#/components"
import { initializeApollo } from '#/api/apollo'
import { GET_ALL_MANGAS } from '#/api/queries'
import { useSelector } from "react-redux";
import { getSession } from "#/redux/slices/sessionSlice";

export default function Home(props) {

	const session = useSelector(getSession);

	const mangas = props?.initialApolloState?.ROOT_QUERY?.mangas;
	const error = props?.error;

	if(error || !mangas) return <h2>ERROR</h2>;
	
	return (
		<>
			{mangas && <>
				<Head>
					<title>Manga Reader</title>
					<meta name="description" content="Manga Reader" />
					<link rel="icon" href="/favicon.ico" />
				</Head>

				{!session.id && <Login/>}

				<Layout>
					<Root mangas={mangas} />
				</Layout>
			</>}
		
		</>
	)
}

export const getServerSideProps = async () => {
	const apolloClient = initializeApollo();

	try{
		await apolloClient.query({
			query: GET_ALL_MANGAS
		});
	
		return { 
			props: { initialApolloState: apolloClient.cache.extract() } 
		}

	} catch {

		return { 
			props: {
				error: "failed fetching data from backend"
			}
		}
	}
	
}
