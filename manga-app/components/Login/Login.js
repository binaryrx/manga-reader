import React, { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from "yup";

import CREATE_USER_SESSION from '#/api/mutations/CREATE_USER_SESSION'
import { setSession } from "#/redux/slices/sessionSlice";

import { Form } from "./styled";


const Login = () => {
    const dispatch = useDispatch();
    const router = useRouter();
    const [createUserSession] = useMutation(CREATE_USER_SESSION, { errorPolicy: "all" });

    const validationSchema = Yup.object().shape({
        email: Yup.string().required("Email is required"),
        password: Yup.string().required("Password is required")
    });

    const formOptions = { resolver: yupResolver(validationSchema)};
    
    const { register, handleSubmit, setError, setFocus , formState: { isSubmitting, errors } } = useForm(formOptions);

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

    useEffect( () => {
        setFocus("email")
    },[setFocus])

    const [typed, setTyped ] = useState({email: false, password: false});


    const setTypedState = (e, label) => {
        if(e.target.value.length > 0) {
            setTyped({...typed, [label]: true})
        }else{
            setTyped({...typed, [label]: false})
        }

        
    }
    console.log(typed)

    return <Form onSubmit={handleSubmit(onSubmit)}>
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
        <input type="submit" disabled={isSubmitting} name="submit" />


        <div className="links">
            <div className="link">forgot your password?</div>
            <div className="link">sign up</div>
        </div>
        {errors.apiError && <div>{errors.apiError?.message}</div>}
    </Form>;
};
export default Login;