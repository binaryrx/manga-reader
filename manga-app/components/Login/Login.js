import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from "yup";

import CREATE_USER_SESSION from '#/api/mutations/CREATE_USER_SESSION'
import { setSession } from "#/redux/slices/sessionSlice";


const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [createUserSession] = useMutation(CREATE_USER_SESSION, { errorPolicy: "all" });

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required")
    });

    const formOptions = { resolver: yupResolver(validationSchema)};
    
    const { register, handleSubmit, setError, formState: { isSubmitting, errors } } = useForm(formOptions);

    const onSubmit = ({email, password}) => {
        return createUserSession({variables: { email, password }})
            .then(({data,errors}) => {
                if(errors) {
                    setError("apiError", {message: errors})
                }

                if(data) {
                    dispatch(setSession(data?.createUserSession))
                    const returnUrl = router.query.returnUrl || "/";
                    router.push(returnUrl)
                }
            })
            .catch(error => {
                setError("apiError", {message: error})
            })
    }


    // const onSubmit = handleSubmit(async ({ email, password }) => {

    //     console.log("submited");

    //     const { data, errors } = await createUserSession({ variables: { email, password } });

    //     if(errors) {
    //         return setLoginError(errors)
    //     }

    //     if(data && loginError) {
    //         setLoginError(null)
    //     }

    //     if(data){
    //         console.log(data)
    //         dispatch(setSession(data?.createUserSession))
    //     }

       
    // });
    

    return <form onSubmit={handleSubmit(onSubmit)}>
        <label>
            Email
            <input disabled={isSubmitting} name="email" type="email" {...register("email")} className={`${errors.email ? "error" : ""}`}/>
            <span className="error">{errors.email?.message}</span>
        </label>
        <label>
            Password
            <input disabled={isSubmitting} name="password" type="password" {...register("password")} className={`${errors.password ? "error" : ""}`}/>
            <span className="error">{errors.password?.message}</span>
        </label>
        <input type="submit" disabled={isSubmitting} name="submit" />
        {errors.apiError && <div>{errors.apiError?.message}</div>}
    </form>;
};
export default Login;