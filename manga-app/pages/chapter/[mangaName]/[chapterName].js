import Head from 'next/head'
import { Layout, Chapter } from "#/components"
import { initializeApollo } from '#/api/apollo'
import { GET_CHAPTER_BY_NAME, GET_ALL_CHAPTERS_NAMES_BY_NAME } from '#/api/queries';

export default function MangaByTitle(props) {
	const chapter = props?.initialApolloState?.chapter?.data?.chapterByName
	const chapters = props?.initialApolloState?.chapters?.data?.chaptersUrlsByName
    const error = props?.error;

	if(error) return <h2>{error}</h2>;

	if(!chapter) return <h2>404 | Chapter Not Found!</h2>


	return (
		<>
			<Head>
				<title>{chapter.manga_name} - {chapter.chapter_name}</title>
				<meta name="description" content="Manga Reader" />
				<link rel="icon" href="/favicon.ico" />
			</Head>
			<Layout>
				<Chapter chapter={chapter} chapters={chapters}/>
			</Layout>
		</>
	)
}

export const getServerSideProps = async ({ query }) => {
	const apolloClient = initializeApollo();
	const {mangaName, chapterName} = query;

	try{

		//return chapter data
		const chapter = await apolloClient.query({
			query: GET_CHAPTER_BY_NAME,
			variables: { mangaName, chapterName },
		})
		//return all the manga chapter nums + names
		const chapters = await apolloClient.query({
			query: GET_ALL_CHAPTERS_NAMES_BY_NAME,
			variables: { mangaName },
		}) 
	
		return { props: { initialApolloState : {
			chapter,
			chapters
		}} }

	}catch{
		return { 
			props: {
			  error: "failed fetching data from backend - Chapter"
			}
		  }
	}
	
}
