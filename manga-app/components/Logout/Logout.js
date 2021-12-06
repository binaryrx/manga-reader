import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from 'next/router';
import { useMutation } from "@apollo/client";
import { StyledLogout } from "./styled";


import DELETE_USER_SESSION from '#/api/mutations/DELETE_USER_SESSION'
import { getSession, clearSession } from "#/redux/slices/sessionSlice";


const Logout = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const session = useSelector(getSession);

    const [deleteUserSession] = useMutation(DELETE_USER_SESSION);

    return (
    	<StyledLogout onClick={(e) => {
            e.preventDefault();
            dispatch(clearSession())
            deleteUserSession({ variables: { session_id: session.id } })
            router.push(`/login?returnUrl=${encodeURIComponent(router.pathname)}`);
        }}>log out</StyledLogout>
    );
};
export default Logout;