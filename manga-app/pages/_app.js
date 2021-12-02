import { AnimatePresence } from 'framer-motion'
import { ApolloProvider } from '@apollo/client';
import { createWrapper } from "next-redux-wrapper";
import { Provider } from "react-redux";
import { StrictMode, useEffect, useState } from "react";
import { useDispatch } from 'react-redux';
import { ThemeProvider } from 'next-themes';

import { RouteGuard, Navigation  } from "#/components/";
import { store } from "#/redux/store";
import { setSession } from "#/redux/slices/sessionSlice";
import { useApollo } from "#/api/apollo";
import GET_USER_SESSION from '#/api/queries/GET_USER_SESSION';
import GlobalStyle from "#/theme/GlobalStyle";

function MangaReader({ Component, pageProps, router }) {
	const dispatch = useDispatch();
	const [ loaded, setLoaded ] = useState(false);

  	const url = `https://stg.sh/${router.route}`;
	const apolloClient = useApollo(pageProps);
	
	
	useEffect(() => {
		const WebFont = require("webfontloader");
		WebFont.load({
			google: {
				families: [
					`Roboto:300,400,500,700&display=swap`
				]
			}
		});

		apolloClient.query({query: GET_USER_SESSION}).then(({data: userData}) => {
			if(userData && userData.userSession) {
				dispatch(setSession(userData.userSession))
			}
			setLoaded(true)
		})

	}, []);



	return (
		<StrictMode>
			<Provider store={store}>
				<ApolloProvider client={apolloClient}>
					<ThemeProvider defaultTheme="dark">
						<GlobalStyle />
							<Navigation />
							<AnimatePresence exitBeforeEnter initial="initial" onExitComplete={() => window.scrollTo(0, 0)}>
								{/* <RouteGuard> */}
									{loaded && <Component {...pageProps} canonical={url} key={url} />}
								{/* </RouteGuard> */}
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
