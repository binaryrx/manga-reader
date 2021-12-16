import Head from 'next/head'
import { useSelector } from "react-redux";
import { useQuery } from "@apollo/client"

import { requireAuth } from "#/lib/requireAuth";
import { getSession } from "#/redux/slices/sessionSlice";
import { Layout, Logout } from "#/components"
import GET_MANGAS_BY_IDS from '#/api/queries/GET_MANGAS_BY_IDS';
import { getFavorites } from '#/redux/slices/favoritesSlice';
import { LatestMangas } from "#/components";



export default function Profile(props) {
	const session = useSelector(getSession);
	const mangas_ids = useSelector(getFavorites).map( favorite => favorite.manga_id)

	const {data, loading, error }= useQuery(GET_MANGAS_BY_IDS, { variables: { mangas_ids}})

	return (
		<div>
			<Head>
				<title>Manga Reader</title>
				<meta name="description" content="Manga Reader" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			<Layout>
				<main>
					{session?.user?.name &&
						<div>
							Hello,<br />
							{session.user.name}
							<br /><br />
						</div>
					}
					<div>

						favorites:
					</div>
					{ loading ? <div>Loading favorites</div> : <LatestMangas page="profile" mangas={data.mangasByIds}/>}
					{/* <LatestMangas mangas={mangas}/> */}
					<br />
					<br />

				</main>

				<footer>
					<Logout />
				</footer>
			</Layout>


		</div>
	)
}

export const getServerSideProps = requireAuth(async (context) => {
	//get session id from cookies
	const session = context?.req?.cookies?.userSessionId

	try {
		// const apolloClient = initializeApollo();
		// //fetch user_id using the session id
		// const { data: { userIdBySession } } = await apolloClient.query({
		// 	query: GET_USER_ID_BY_SESSION,
		// 	variables: {
		// 		session
		// 	}
		// })

		// //fetch user favorites using the user id
		// const { data: { userFavorites } } = await apolloClient.query({
		// 	query: GET_USER_FAVORITES,
		// 	variables: {
		// 		user_id: userIdBySession?.user?.id
		// 	}
		// })

		// return {
		// 	props: {
		// 		initialApolloState: {
		// 			userFavorites,
		// 			userSession: userIdBySession
		// 		}
		// 	}
		// }
		return {
			props: {

			}
		}
	} catch (e) {
		if (e?.networkError?.result) {
			console.log(e?.networkError?.result)
		}

		return {
			props: {
				initialApolloState: {}
			}
		}
	}
	// if(session){
	// 	res.statusCode = 302;
	// 	res.setHeader
	// }
	// console.log(req.cookies)


})


// export const getServerSideProps = async ({ query }) => {
// 	const apolloClient = initializeApollo();

// 	try {

// 		const { data } = await apolloClient.query({query: GET_USER_SESSION})
// 		console.log(data)

// 		return {
// 			// props: { initialApolloState }
// 			props: { initializeApollo: "" }
// 			// props: {initialApolloState: apolloClient.cache.extract() }
// 		}

// 	} catch (e) {
// 		return {
// 			props: {
// 				error: "failed fetching data from backend"
// 			}
// 		}
// 	}

// }