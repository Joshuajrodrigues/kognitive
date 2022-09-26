import { Formik } from 'formik'
import React, { useEffect, useState } from 'react'
import * as Yup from "yup";
import { supabase } from '../helper/supabaseClient';
import { useToast } from '../hooks/useToast';
import { motion } from "framer-motion";
import { useNavigate, useParams } from 'react-router-dom';
import { appRoutes } from '../AppConstants';
const PasswordReset = () => {
    const [isLoading, setIsLoading] = useState(false)
    const [isRecoveryValid, setIsRecoveryValid] = useState(false)
    const { toast } = useToast()
    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("You need this to reset your password."),

    });
    let navigate = useNavigate();
    const RecoverPasswordSchema = Yup.object().shape({
        password: Yup.string()
            .min(6, "Too Short!")
            .max(50, "Too Long!")
            .required("You need this to log in."),
        confirm: Yup.string()
            .oneOf([Yup.ref("password"), null], "Passwords don't match!")
            .required("Need to validate your password."),
    })
    useEffect(() => {
        supabase.auth.onAuthStateChange(async (event, session) => {
            if (event == "PASSWORD_RECOVERY") {
                setIsRecoveryValid(true)
            }
        })
    }, [])
    if (!isRecoveryValid) {

        return (
            <div className="home-grid-container" tabIndex={0}>
                <div className="lottie-container">
                    <img src="./forgot.svg" alt="picture of a man who forgot his password." className="hero-image" />
                </div>
                <motion.div
                    className="login-container"
                    initial={{ opacity: 0, scale: 0.5 }}
                    transition={{ ease: "easeIn", duration: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Formik
                        validationSchema={SignupSchema}
                        initialValues={{
                            email: ""
                        }}
                        onSubmit={async (values) => {
                            setIsLoading(true);
                            let { data, error } = await supabase.auth.resetPasswordForEmail(values.email, {
                                redirectTo: 'https://kognitive.netlify.app/resetpassword'
                            })
                            if (!error) {
                                toast.success("Password reset link sent to your email.")
                                setIsLoading(false);
                            } else {
                                toast.error(error.message)
                                setIsLoading(false);
                            }
                        }
                        }

                    >{
                            ({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <form className="login-form" onSubmit={handleSubmit}>
                                    <label htmlFor="email">Enter email to send reset link</label>
                                    <input
                                        id="email"
                                        title="email"
                                        aria-label="Email"
                                        placeholder="Email"
                                        className={"normal-input"}
                                        value={values.email}
                                        onChange={handleChange}
                                        onBlur={handleBlur}
                                        required
                                        type={"email"}
                                        name="email"
                                    />
                                    <p className="error-message">
                                        {errors.email && touched.email && errors.email}
                                    </p>
                                    <label>
                                        <button className="normal-button" type="submit">
                                            {isLoading ? (
                                                <i className="fa fa-circle-o-notch fa-spin"></i>
                                            ) : (
                                                "Confirm"
                                            )}
                                        </button>
                                    </label>
                                </form>
                            )
                        }

                    </Formik >
                </motion.div>
            </div>
        )
    } else {
        return (
            <div className="home-grid-container" tabIndex={0}>
                <div className="lottie-container">
                    <img src="./newpass.svg" alt="picture of a man who forgot his password." className="hero-image" />
                </div>
                <motion.div
                    className="login-container"
                    initial={{ opacity: 0, scale: 0.5 }}
                    transition={{ ease: "easeIn", duration: 0.6 }}
                    animate={{ opacity: 1, scale: 1 }}
                >
                    <Formik
                        validationSchema={RecoverPasswordSchema}
                        initialValues={{
                            password: "",
                            confirm: ""
                        }}
                        onSubmit={async (values) => {
                            setIsLoading(true);
                            const { data, error } = await supabase.auth.updateUser({
                                password: values.password,
                            })
                            if (data) {
                                navigate(appRoutes.root)
                                setIsLoading(false)
                                toast.success("Password changed.")
                            } else if (error) {
                                toast.error(error.message)
                            }

                        }
                        }

                    >{
                            ({
                                values,
                                errors,
                                touched,
                                handleChange,
                                handleBlur,
                                handleSubmit,
                                isSubmitting,
                            }) => (
                                <form className="login-form" onSubmit={handleSubmit}>
                                    <label htmlFor="password">Password</label>
                                    <input id="password" title="password" placeholder="Password" className={"normal-input"} value={values.password} onChange={handleChange} onBlur={handleBlur} required type={"password"} name="password" />
                                    <p className="error-message">
                                        {errors.password && touched.password && errors.password}
                                    </p>


                                    <label htmlFor="confirm">Confirm Password</label>
                                    <input id="confirm" title="Confirm Password" placeholder="Confirm Password" className={"normal-input"} value={values.confirm} onChange={handleChange} onBlur={handleBlur} required type={"password"} name="confirm" />
                                    <p className="error-message">
                                        {errors.confirm && touched.confirm && errors.confirm}
                                    </p>
                                    <label>
                                        <button className="normal-button" type="submit">
                                            {isLoading ? (
                                                <i className="fa fa-circle-o-notch fa-spin"></i>
                                            ) : (
                                                "Change Password"
                                            )}
                                        </button>
                                    </label>
                                </form>
                            )
                        }

                    </Formik >
                </motion.div>
            </div>
        )
    }

}

export default PasswordReset