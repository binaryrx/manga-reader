import { useEffect } from 'react';
import { useRouter } from 'next/router'

import { Layout, Container, Login } from "#/components"

export default function LoginPage() {
	const router = useRouter();

	return (
		<Layout>
		
            <Container>
                reset password page
            </Container>

			<footer>

			</footer>
		</Layout>
	)
}
