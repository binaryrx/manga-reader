import Head from 'next/head'
import { useRouter } from 'next/router'

import { Layout, Login } from "#/components"
import { useSelector } from 'react-redux';
import { getSession } from "#/redux/slices/sessionSlice";

export default function Latest() {
    const router = useRouter();
    const session = useSelector(getSession);
    //use is logged in
    if(session.id){
        console.log("login successded!");

    }

    return (
      <div>
        <Head>
          <title>Manga Reader</title>
          <meta name="description" content="Manga Reader" />
          <link rel="icon" href="/favicon.ico" />
        </Head>
  
        <Layout>
			<main>
			    <Login/>
			</main>
	
			<footer>
			
			</footer>
		</Layout>
      </div>
    )
  }
  