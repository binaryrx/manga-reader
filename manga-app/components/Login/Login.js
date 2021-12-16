import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation, useLazyQuery } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from "yup";
import Link from "next/link";

import CREATE_USER_SESSION from '#/api/mutations/CREATE_USER_SESSION'
import GET_USER_FAVORITES from "#/api/queries/GET_USER_FAVORITES";
import { setSession, getSession } from "#/redux/slices/sessionSlice";

import { Form } from "./styled";
import { useSelector } from "react-redux";
import { setFavorites } from "#/redux/slices/favoritesSlice";


const Login = () => {
    const router = useRouter();
    const dispatch = useDispatch();
    const session = useSelector(getSession);

    const [createUserSession] = useMutation(CREATE_USER_SESSION, { errorPolicy: "all" });
    const [getFavorites ,{data: favorites, error: favoriteError, loading: favoriteLoading}] = useLazyQuery(GET_USER_FAVORITES);


    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required")
    });

    const formOptions = { resolver: yupResolver(validationSchema)};
    
    const { register, handleSubmit, setError, setFocus , formState: { isSubmitting, errors } } = useForm(formOptions);

    const onSubmit = async ({email, password}) => {

        try{
            const {data, errors} = await createUserSession({variables: { email, password }})

            if(errors) {
                setError("apiError", {message: errors})
            }
    
            if(data) {
                dispatch(setSession(data.createUserSession))
            }

        }catch(e){
            setError("apiError", {message: error})
        }
        
      
    }

    useEffect( () => {
        if(session.id && !favorites ) {
            getFavorites({variables: {user_id: session.user.id}})
        }
        if(favorites) {
            dispatch(setFavorites(favorites.userFavorites))

            let returnUrl = router.query.returnUrl || "/";

            if(router.query.hasOwnProperty("favorite")) {
                returnUrl += "?favorite=1"
            }

            router.push(returnUrl)
        }

    },[ session, favorites])


    useEffect( () => {
        setFocus("email")
    },[setFocus])


    const [typed, setTyped ] = useState({email: false, password: false});


    const setTypedState = (e, label) => (e.target.value.length > 0) ? setTyped({...typed, [label]: true}) : setTyped({...typed, [label]: false})
        

return <Form onSubmit={handleSubmit(onSubmit)}>
        {errors.apiError && <span className="apiError error">{errors.apiError?.message}</span>}
        <div className="input-container">
            <input 
                disabled={isSubmitting} 
                name="email" 
                {...register("email", { onChange: e =>  setTypedState(e, "email") })}
                aria-invalid={errors.email ? "true" : "false"} 
                className={`${errors.email ? "error" : ""} ${typed.email ? "typed" : ""}`}
            />
            <label htmlFor="email">Email</label>
            <span className="error" role="alert">{errors.email?.message}</span>
        </div>
        <div className="input-container">
            <input disabled={isSubmitting}
                name="password"
                type="password"
                {...register("password", { onChange: e => setTypedState(e, "password") })}
                aria-invalid={errors.password ? "true" : "false"} 
                className={`${errors.password ? "error" : ""} ${typed.password ? "typed" : ""}`}
            />
            <label htmlFor="password">Password</label>
            <span className="error" role="alert">{errors.password?.message}</span>
        </div>
        <input type="submit" disabled={isSubmitting} name="submit" value="Sign in"/>


        <div className="links">
            <Link href="/reset-password">forgot your password?</Link>
            <Link href="/signup">Sign up</Link>
        </div>
        
    </Form>;
};
export default Login;