import { Formik } from "formik";
import { motion } from "framer-motion";
import { FunctionComponent, useState } from "react";
import { useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { appRoutes } from "../AppConstants";
import BackButton from "../components/BackButton";
import Footer from "../components/Footer";
import { Loader } from "../components/Loader";
import LottieCreator from "../components/LottieCreator";
import { supabase } from "../helper/supabaseClient";
import { useToast } from "../hooks/useToast";
import useUser from "../hooks/useUser";
import lottieSrc from "../lotties/hero-signup.json";

const Signup: FunctionComponent<{}> = () => {
  const { toast } = useToast();
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
    <div style={{ "marginTop": "48px" }} className="home-grid-container"
    >
      <div className="lottie-container">
      <img src="./signup.svg" alt="" className="hero-image" />

      </div>
      <motion.div
        style={{ "marginTop": "24px" }}
        className="login-container"
        initial={{ "opacity": 0, "scale": 0.5 }}
        transition={{ ease: "easeIn", duration: 0.6 }}
        animate={{ "opacity": 1, "scale": 1 }}
      >
        <p className="intro-text">
          Sign up to <span>Kognitive</span> 
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
              toast.success("Account created.")


              addUser({ id: data.user?.id, user_metadata: data.user?.user_metadata });
              setIsLoading(false)
              //sessionStorage.setItem('user', JSON.stringify(data))
            } else {
              toast.error(error.message)

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
                <input id="name" title="name" aria-label="name" placeholder="Name" className={"normal-input"} value={values.name} onChange={handleChange} onBlur={handleBlur} required type={"text"} name="name" />
                <p className="error-message">
                  {errors.name && touched.name && errors.name}
                </p>

                <label htmlFor="email">Email</label>
                <input id="email" title="email" aria-label="Email" placeholder="Email" className={"normal-input"} value={values.email} onChange={handleChange} onBlur={handleBlur} required type={"email"} name="email" />
                <p className="error-message">
                  {errors.email && touched.email && errors.email}
                </p>


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
                <button className="normal-button" type="submit">
                  {
                    isLoading ?<Loader/> : "Sign Up"
                  }

                </button>
              </form>
            )
          }
        </Formik>
        <div className="div login-extra-text">
          <BackButton />
        </div>
      </motion.div>
      <Footer/>
    </div>
  );
};

export default Signup;
