import { useMemo } from 'react';
import fetch from "isomorphic-unfetch";
import { ApolloClient, ApolloLink, InMemoryCache, HttpLink } from "@apollo/client";
import { onError } from '@apollo/link-error';

let apolloClient;
const APOLLO_STATE_PROP_NAME = '__APOLLO_STATE__';

const httpLink = new HttpLink({
	uri: process.env.SERVICES_URI && process.env.SERVICES_URI + "/graphql" || "http://localhost:7001/graphql",
	credentials: "include",
	fetch
});

export const createApolloClient = () => {
	return new ApolloClient({
		ssrMode: typeof window === "undefined",
		link: ApolloLink.from([
			onError(({ graphlQLErrors, networkError }) => {
				if (graphlQLErrors) {
					graphlQLErrors.forEach(({ message, location, path }) => {
						console.log(`[GraphQL error]: Message: ${message}, Location: ${location}, Path: ${path}`)
					})
				}
				if (networkError) {
					console.log(`[Network error]: ${networkError}. Backend is unreachable. Is it running?`);
				}
			}),
			httpLink
		]),
		cache: new InMemoryCache()
	})
}


export function initializeApollo(initialState = null) {

	const _apolloClient = apolloClient ?? createApolloClient();

	// If your page has Next.js data fetching methods that use Apollo Client,
	// the initial state gets hydrated here
	if (initialState) {
		// Get existing cache, loaded during client side data fetching
		const existingCache = _apolloClient.extract();

		// Restore the cache using the data passed from
		// getStaticProps/getServerSideProps combined with the existing cached data
		_apolloClient.cache.restore({ ...existingCache, ...initialState });

		// Merge the existing cache into data passed from getStaticProps/getServerSideProps
		// const data = merge(initialState, existingCache, {
		// 	// combine arrays using object equality (like in sets)
		// 	arrayMerge: (destinationArray, sourceArray) => [
		// 		...sourceArray,
		// 		...destinationArray.filter((d) =>
		// 			sourceArray.every((s) => !isEqual(d, s))
		// 		),
		// 	],
		// })

		// _apolloClient.cache.restore(data)
	}

	// For SSG and SSR always create a new Apollo Client
	if (typeof winodw === "undefined") return _apolloClient

	// Create the Apollo Client once in the client
	if (!apolloClient) apolloClient = _apolloClient;

	return _apolloClient;
}

export const addApolloState = (client, pageProps) => {
	if (pageProps?.props) {
		pageProps.props[APOLLO_STATE_PROP_NAME] = client.cache.extract();
	}

	return pageProps
}

export function useApollo(pageProps) {
	const state = pageProps[APOLLO_STATE_PROP_NAME]
	const store = useMemo(() => initializeApollo({ state }), [state])
	return store;
}