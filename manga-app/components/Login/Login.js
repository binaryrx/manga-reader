import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useForm } from "react-hook-form";
import { useMutation } from "@apollo/client";

import CREATE_USER_SESSION from '#/api/mutations/CREATE_USER_SESSION'
import { setSession } from "#/redux/slices/sessionSlice";


const Login = () => {
    const dispatch = useDispatch();
    const [loginError, setLoginError ] = useState(null);
    const [createUserSession] = useMutation(CREATE_USER_SESSION, { errorPolicy: "all" });
    
    const {
        formState: { isSubmitting },
        handleSubmit,
        register
    } = useForm();

    const onSubmit = handleSubmit(async ({ email, password }) => {

        console.log("submited");

        const { data, errors } = await createUserSession({ variables: { email, password } });

        if(errors) {
            return setLoginError(errors)
        }

        if(data && loginError) {
            setLoginError(null)
        }

        if(data){
            console.log(data)
            dispatch(setSession(data?.createUserSession))
        }

       
    });
    

    return <form onSubmit={onSubmit}>
        <label>
            Email
            <input disabled={isSubmitting} name="email" type="email" {...register("email")} />
        </label>
        <label>
            Password
            <input disabled={isSubmitting} name="password" type="password" {...register("password")} />
        </label>
        <input type="submit" disabled={isSubmitting} name="submit" />
        {loginError && <span>{loginError}</span>}
    </form>;
};
export default Login;