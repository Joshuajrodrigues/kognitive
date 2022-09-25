//@ts-ignore
import { Formik } from "formik";
import { motion } from "framer-motion";
import { FunctionComponent, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { appRoutes } from "../AppConstants";
import LottieCreator from "../components/LottieCreator";
import { supabase } from "../helper/supabaseClient";
import { useToast } from "../hooks/useToast";
import useUser from "../hooks/useUser";
import lottieSrc from "../lotties/hero-signin.json";

const Home: FunctionComponent<{}> = () => {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const addUser = useUser((state) => state.addUser);
  let navigate = useNavigate();
  const SignupSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email")
      .required("You need this to log in."),
    password: Yup.string()
      .min(6, "Too Short!")
      .max(50, "Too Long!")
      .required("You need this to log in."),
  });

  return (
    <>
      <div className="home-grid-container" tabIndex={0}>
        <div className="lottie-container">
          <img src="./hero.svg" alt="" className="hero-image" />
          {/* <LottieCreator
            style={{ height: "300px", width: "400px" }}
            loop={true}
            src={lottieSrc}
          /> */}
        </div>

        <motion.div
          className="login-container"
          initial={{ opacity: 0, scale: 0.5 }}
          transition={{ ease: "easeIn", duration: 0.6 }}
          animate={{ opacity: 1, scale: 1 }}
        >
          <p className="intro-text">
            Welcome to <span>Kognitive</span>, <br /> your cbt journal.
          </p>
          <Formik
            validationSchema={SignupSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              setIsLoading(true);
              let { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
              });

              if (!error) {
                navigate(appRoutes.root);
                toast.success("Login Successfull");
                // toast({
                //   title: "Login Successfull.",
                //   status: "success",
                //   duration: 5000,
                //   isClosable: true,
                // });
                setIsLoading(false);
                addUser({
                  id: data.user?.id,
                  user_metadata: data.user?.user_metadata,
                });
                //sessionStorage.setItem("user", JSON.stringify(data));
              } else {
                toast.error(error.message);
                // toast({
                //   title: "An error occured.",
                //   description: error.message,
                //   status: "error",
                //   duration: 5000,
                //   isClosable: true,
                // });
                setIsLoading(false);
              }
            }}
          >
            {({
              values,
              errors,
              touched,
              handleChange,
              handleBlur,
              handleSubmit,
              isSubmitting,
            }) => (
              <form className="login-form" onSubmit={handleSubmit}>
                <label htmlFor="email">Email</label>
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

                <label htmlFor="password">Password</label>
                <input
                  id="password"
                  title="password"
                  placeholder="Password"
                  className={"normal-input"}
                  value={values.password}
                  onChange={handleChange}
                  onBlur={handleBlur}
                  required
                  type={"password"}
                  name="password"
                />
                <p className="error-message">
                  {errors.password && touched.password && errors.password}
                </p>
                <label>
                  <button className="normal-button" type="submit">
                    {isLoading ? (
                      <i className="fa fa-circle-o-notch fa-spin"></i>
                    ) : (
                      "Login"
                    )}
                  </button>
                </label>
              </form>
            )}
          </Formik>

          <p className="intro-text-light">
            New here?{" "}
            <Link
              aria-label="Sign Up for Kognitive"
              className="link-button"
              to={appRoutes.signup}
            >
              {" "}
              Sign Up
            </Link>
          </p>
          <Link
            aria-label="About Kognitive"
            className="link-button"
            to={appRoutes.about}
          >
            About
          </Link>
        </motion.div>
      </div>
    </>
  );
};

export default Home;
