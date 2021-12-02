import Head from 'next/head'
import { Layout } from "#/components"

export default function Popular() {
    return (
      <div>
        <Head>
          <title>Manga Reader</title>
          <meta name="description" content="Manga Reader" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
		<Layout>
			<main>
			Popular Mangas
			</main>
	
			<footer>
			
			</footer>
		</Layout>
      </div>
    )
  }
  