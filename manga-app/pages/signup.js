import { useEffect } from 'react';
import { useRouter } from 'next/router'

import { Layout, Container, Signup } from "#/components"
import { useSelector } from 'react-redux';
import { getSession } from "#/redux/slices/sessionSlice";

export default function LoginPage() {
	const router = useRouter();
	const session = useSelector(getSession);

	useEffect(() => {
		// redirect to profile if already logged in
		if (session.id) {
			router.push("/profile");
		}

	}, [])

	return (
		<Layout>
			<Container>
				<Signup />
			</Container>

			<footer>

			</footer>
		</Layout>
	)
}
