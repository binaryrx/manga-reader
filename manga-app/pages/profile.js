import Head from 'next/head'
import { useSelector } from "react-redux";

import { requireAuth } from "#/lib/requireAuth";
import { getSession } from "#/redux/slices/sessionSlice";
import { Layout, Logout } from "#/components"




export default function Profile() {
	const session = useSelector(getSession);

	return (
		<div>
			<Head>
				<title>Manga Reader</title>
				<meta name="description" content="Manga Reader" />
				<link rel="icon" href="/favicon.ico" />
			</Head>

			
				<Layout>
					<main>
						{ session?.user?.email && 
							<div>
								logged in as {session.user.email} 
								<Logout/>
							</div>
						}

					</main>

				

					<footer>

					</footer>
				</Layout>


		</div>
	)
}

export const getServerSideProps = requireAuth(context => {

	// // console.log(req,res)
	// const session = req?.cookies?.userSessionId;

	// if(session){
	// 	res.statusCode = 302;
	// 	res.setHeader
	// }
	// console.log(req.cookies)

	return {
		props: {
			
		}
	}
})