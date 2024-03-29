import { useEffect } from 'react';
import { useRouter } from 'next/router'

import { Layout, Container, Login } from "#/components"
import { useSelector } from 'react-redux';
import { getSession } from "#/redux/slices/sessionSlice";

export default function LoginPage() {
	const router = useRouter();
	const session = useSelector(getSession);

	useEffect(() => {
		// redirect to home if already logged in
		if (session.id) {
			router.push("/");
		}

	}, [])


	return (
		<Layout>
			
			<Container>
				<Login />
			</Container>

			<footer>

			</footer>
		</Layout>
	)
}
