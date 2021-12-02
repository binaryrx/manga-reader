import Head from 'next/head'
import { useMutation } from "@apollo/client";
import { useDispatch, useSelector } from "react-redux";

import { getSession, clearSession } from "#/redux/slices/sessionSlice";
import { Layout } from "#/components"

import DELETE_USER_SESSION from '#/api/mutations/DELETE_USER_SESSION'

export default function Profile() {
    const dispatch = useDispatch();
    const [deleteUserSession] = useMutation(DELETE_USER_SESSION);

    const session = useSelector(getSession);

    return (
      <div>
        <Head>
          <title>Manga Reader</title>
          <meta name="description" content="Manga Reader" />
          <link rel="icon" href="/favicon.ico" />
        </Head>

        { session && session.user && 
        <Layout>
            <main>
            profile
            </main>

            <div>
                logged in as {session.user.email}

                <button onClick={(e) => {
                    e.preventDefault();
                    dispatch(clearSession)
                    deleteUserSession({variables: {session_id: session.id}})
                }}>logOut</button>
            </div>

            <footer>
            
            </footer>
        </Layout>
        }
  
        
      </div>
    )
  }
  