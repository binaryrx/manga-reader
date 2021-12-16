import { AnimatePresence } from 'framer-motion'
import { ApolloProvider } from '@apollo/client';
import { createWrapper } from "next-redux-wrapper";
import { Provider } from "react-redux";
import { StrictMode, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'next-themes';

import { Navigation } from "#/components/";
import { store } from "#/redux/store";
import { setSession } from "#/redux/slices/sessionSlice";
import { setFavorites } from '#/redux/slices/favoritesSlice';
import { useApollo } from "#/api/apollo";
import GET_USER_SESSION from '#/api/queries/GET_USER_SESSION';
import GET_USER_FAVORITES from '#/api/queries/GET_USER_FAVORITES';
import GlobalStyle from "#/theme/GlobalStyle";

function MangaReader({ Component, pageProps, router }) {
	const dispatch = useDispatch();
	const [ loaded, setLoaded ] = useState(false);
	const [ error, setError ] = useState(null);

  	const url = `https://stg.sh/${router.route}`;
	const apolloClient = useApollo(pageProps);

	//get session data from page props
	const pagePropsSession = pageProps?.initialApolloState?.userSession
	
	useEffect(() => {
		const WebFont = require("webfontloader");
		WebFont.load({
			google: {
				families: [
					`Roboto:300,400,500,700&display=swap`
				]
			}
		});
		

		//if no session data from page props, try to fetch session
		if(!pagePropsSession) {

			apolloClient.query({query: GET_USER_SESSION})
			.then(async ({data: userData}) => {
				if(userData && userData.userSession) {
					// console.log(userData.userSession)
					const { data: { userFavorites } } = await apolloClient.query({
						query: GET_USER_FAVORITES,
						variables: {
							user_id: userData?.userSession?.user?.id
						}
					})
					dispatch(setSession(userData.userSession))
					dispatch(setFavorites(userFavorites));
				}
					
				setLoaded(true)
			})
			.catch( (e) => {
				console.log(e);
				setError("An error has occoured, please try again later.")
			})
		//if page props session is not undefined, set the session
		}else if(pagePropsSession !== undefined) {
			dispatch(setSession(pagePropsSession))
			setLoaded(true)
		}
		
	}, []);



	return (
		<StrictMode>
			<Provider store={store}>
				<ApolloProvider client={apolloClient}>
					<ThemeProvider defaultTheme="dark">
						<GlobalStyle />
							<Navigation />
							<AnimatePresence exitBeforeEnter initial="initial" onExitComplete={() => window.scrollTo(0, 0)}>
									{error && <div>{error}</div>}
									{loaded && <Component {...pageProps} canonical={url} key={url} />}
							</AnimatePresence>
					</ThemeProvider>
				</ApolloProvider>
			</Provider>
		</StrictMode>
	);
}


const makestore = () => store;
const wrapper = createWrapper(makestore);

export default wrapper.withRedux(MangaReader);
