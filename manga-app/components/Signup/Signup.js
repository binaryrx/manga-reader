import React, { useEffect, useState } from "react";
import { useMutation } from "@apollo/client";
import { useForm } from "react-hook-form";
import { useRouter } from "next/router";
import { yupResolver } from '@hookform/resolvers/yup/dist/yup';
import * as Yup from "yup";

import CREATE_USER from '#/api/mutations/CREATE_USER'

import { Form } from "./styled";


const Signup = () => {
    const router = useRouter();
    const [createUser] = useMutation(CREATE_USER, { errorPolicy: "all" });

    const validationSchema = Yup.object().shape({
        name: Yup.string()
            .required("Name is required"),
        email: Yup.string()
            .email("Email must be valid")
            .required("Email is required"),
        confirmEmail: Yup.string()
            .oneOf([Yup.ref("email")], "Emails must match")
            .required("Email is required"),
        password: Yup.string()
            .min(6, "Password must be at least 6 characters long")
            .required("Password is required"),
        confirmPassword: Yup.string()
            .oneOf([Yup.ref("password")], "Passwords must match")
            .required("Confirm Password is required"),
    });

    const formOptions = { resolver: yupResolver(validationSchema)};
    
    const { register, handleSubmit, setError, setFocus , formState: { isSubmitting, errors } } = useForm(formOptions);

    const onSubmit = ({email, password, name}) => {
        return createUser({variables: { email, password, name }})
            .then(({data,errors}) => {
                if(errors) {
                    setError("apiError", {message: errors})
                }

                if(data) {
                    const returnUrl = "/login";
                    router.push(returnUrl)
                }
            })
            .catch(error => {
                setError("apiError", {message: error})
            })
    }

    useEffect( () => {
        setFocus("name")
    },[setFocus])

    const [typed, setTyped ] = useState({ name:false ,email: false, confirmEmail: false, password: false, confirmPassword: false});


    const setTypedState = (e, label) => {
        if(e.target.value.length > 0) {
            setTyped({...typed, [label]: true})
        }else{
            setTyped({...typed, [label]: false})
        }
    }

    return <Form onSubmit={handleSubmit(onSubmit)}>
        {errors.apiError && <div className="apiError">{errors.apiError?.message}</div>}

        <div className="input-container">
            <input 
                disabled={isSubmitting} 
                name="name" 
                {...register("name", { onChange: e =>  setTypedState(e, "name") })}
                aria-invalid={errors.name ? "true" : "false"} 
                className={`${errors.name ? "error" : ""} ${typed.name ? "typed" : ""}`}
            />
            <label htmlFor="name">Name</label>
            <span className="error" role="alert">{errors.name?.message}</span>
        </div>

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
            <input 
                disabled={isSubmitting} 
                name="confirmEmail" 
                {...register("confirmEmail", { onChange: e =>  setTypedState(e, "confirmEmail") })}
                aria-invalid={errors.confirmEmail ? "true" : "false"} 
                className={`${errors.confirmEmail ? "error" : ""} ${typed.confirmEmail ? "typed" : ""}`}
            />
            <label htmlFor="email">Confirm email</label>
            <span className="error" role="alert">{errors.confirmEmail?.message}</span>
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

        <div className="input-container">
            <input disabled={isSubmitting}
                name="confirmPassword"
                type="password"
                {...register("confirmPassword", { onChange: e => setTypedState(e, "confirmPassword") })}
                aria-invalid={errors.confirmPassword ? "true" : "false"} 
                className={`${errors.confirmPassword ? "error" : ""} ${typed.confirmPassword ? "typed" : ""}`}
            />
            <label htmlFor="password">Confirm password</label>
            <span className="error" role="alert">{errors.confirmPassword?.message}</span>
        </div>
        <input type="submit" disabled={isSubmitting} name="submit" value="Sign up"/>
       
        
    </Form>;
};
export default Signup;