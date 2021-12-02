import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { useSelector } from "react-redux";
import { getSession } from "#/redux/slices/sessionSlice"


export default function RouteGuard({children}) {
    const router = useRouter();
    const [authorized, setAuthorized] = useState(false);
    const session = useSelector(getSession);


    useEffect(() => {
        const hideContent = () => setAuthorized(false);

        // on route change start - hide page content by setting authorized to false
        router.events.on("routeChangeStart", hideContent);
        // on route change complete - run auth check 
        router.events.on("routeChangeComplete", authCheck);

        // unsubscribe from events in useEffect return function
        return () => {
            router.events.off("routeChangeStart", hideContent);
            router.events.off("routeChangeComplete", authCheck);
        }
    },[]);
    //profile
    function authCheck(url) {
        const protectedPaths = ['/profile'];
        const path = url.split("?")[0];

        console.log('hi')

        if(!session.id && protectedPaths.includes(path)) {
            setAuthorized(false);
            router.push({
                pathname: "/login",
                query: { returnUrl: router.asPath }
            });
        }else{
            setAuthorized(true)
        }

    }

    return (authorized && children)
}