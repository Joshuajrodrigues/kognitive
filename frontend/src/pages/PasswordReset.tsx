import { Formik } from 'formik'
import React, { useState } from 'react'
import * as Yup from "yup";
import { supabase } from '../helper/supabaseClient';
import { useToast } from '../hooks/useToast';
import { motion } from "framer-motion";
const PasswordReset = () => {
    const [isLoading, setIsLoading] = useState(false)
    const { toast } = useToast()
    const SignupSchema = Yup.object().shape({
        email: Yup.string()
            .email("Invalid email")
            .required("You need this to reset your password."),

    });
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
                        let { data, error } = await supabase.auth.resetPasswordForEmail(values.email)
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
}

export default PasswordReset