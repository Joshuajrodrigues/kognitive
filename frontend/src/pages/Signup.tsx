import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
  useToast,
} from "@chakra-ui/react";
import { Field, Form, Formik, FieldProps } from "formik";
import { FunctionComponent, useState } from "react";
import BackButton from "../components/BackButton";
import LottieCreator from "../components/LottieCreator";
import { supabase } from "../helper/supabaseClient";
import lottieSrc from "../lotties/hero-signup.json";
import * as Yup from "yup";
import useUser from "../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../AppConstants";
const Signup: FunctionComponent<{}> = () => {
  const toast = useToast();
  const addUser = useUser((state) => state.addUser)
  const [isLoading, setIsLoading] = useState(false)
  let navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    name: Yup.string().required("Do tell us what to call you."),
    email: Yup.string()
      .email("Invalid email")
      .required("You need this to log in."),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("You need this to log in."),
    confirm: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords don't match!")
      .required("Need to validate your password."),
  });
  return (
    <div className="home-grid-container"
    >
      <div className="lottie-container">
        <LottieCreator
          style={{ height: "300px", width: "300px" }}
          loop={false}
          src={lottieSrc}
        />
      </div>
      <div className="login-container"
      >
        <p className="intro-text">
          Welcome to <span>Kognitive</span> , <br /> your cbt journal.🤍
        </p>
        <Formik
          validationSchema={SignupSchema}
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirm: "",
          }}
          onSubmit={async (values) => {
            setIsLoading(true)
            let { data, error } = await supabase.auth.signUp({
              email: values.email,
              password: values.password,
              options: {
                data: {
                  name: values.name,
                },
              },
            });
            if (!error) {
              navigate(appRoutes.root)
              toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });

              addUser({ id: data.user?.id, user_metadata: data.user?.user_metadata });
              setIsLoading(false)
              //sessionStorage.setItem('user', JSON.stringify(data))
            } else {
              toast({
                title: "An error occured.",
                description: error.message,
                status: "error",
                duration: 5000,
                isClosable: true,
              });
              setIsLoading(false)
            }
          }}
        >{
            ({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit, isSubmitting
            }) => (
              <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="name">Name</label>
                <input title="name" aria-label="name" placeholder="Name" className={"normal-input"} value={values.name} onChange={handleChange} onBlur={handleBlur} required type={"text"} name="name" />
                <p className="error-message">
                  {errors.name && touched.name && errors.name}
                </p>

                <label htmlFor="email">Email</label>
                <input title="email" aria-label="Email" placeholder="Email" className={"normal-input"} value={values.email} onChange={handleChange} onBlur={handleBlur} required type={"email"} name="email" />
                <p className="error-message">
                  {errors.email && touched.email && errors.email}
                </p>


                <label htmlFor="password">Password</label>
                <input title="password" placeholder="Password" className={"normal-input"} value={values.password} onChange={handleChange} onBlur={handleBlur} required type={"password"} name="password" />
                <p className="error-message">
                  {errors.password && touched.password && errors.password}
                </p>


                <label htmlFor="confirm">Confirm Password</label>
                <input title="Confirm Password" placeholder="Confirm Password" className={"normal-input"} value={values.confirm} onChange={handleChange} onBlur={handleBlur} required type={"password"} name="confirm" />
                <p className="error-message">
                  {errors.confirm && touched.confirm && errors.confirm}
                </p>
                <button className="normal-button" type="submit">
                  {
                    isLoading ? <i className="fa fa-circle-o-notch fa-spin"></i> : "Sign Up"
                  }

                </button>
              </form>
            )
          }
        </Formik>
        <div className="div login-extra-text">
          <BackButton />
        </div>
      </div>
    </div>
  );
};

export default Signup;
