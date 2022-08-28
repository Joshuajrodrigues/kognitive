import {
  Box,
  Button,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  SimpleGrid,
  Spacer,
  Text,
  useToast,
} from "@chakra-ui/react";
//@ts-ignore
import { Field, Form, Formik } from "formik";

import { FunctionComponent, MouseEventHandler, useState } from "react";
import { Link, Navigate, unstable_HistoryRouter } from "react-router-dom";
import { appRoutes } from "../../AppConstants";
import LottieCreator from "../../components/sideBanner/LottieCreator";
import { supabase } from "../../helper/supabaseClient";
import lottieSrc from "../../lotties/hero-signin.json";
import * as Yup from "yup";
const Home: FunctionComponent<{}> = () => {

  const toast = useToast();

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
      <SimpleGrid
        marginTop={{ md: "10%" }}
        spacing="8"
        textAlign="center"
        columns={{ base: 1, sm: 1, md: 2 }}
      >
        <Box width={"100%"} height={"100%"}>
          <LottieCreator
            style={{ height: "300px", width: "400px" }}
            loop={true}
            src={lottieSrc}
          />
        </Box>

        <Box
          borderWidth="1px"
          borderRadius="md"
          margin={{ base: "auto", sm: "auto" }}
          padding={{ base: "4", sm: "4" }}
          width={{ base: "80%", sm: "80%", md: "80%" }}
        >
          <Text>
            Welcome to <span>Kognitive</span> , <br /> your cbt journal.🤍
          </Text>
          <Formik
            validationSchema={SignupSchema}
            initialValues={{
              email: "",
              password: "",
            }}
            onSubmit={async (values) => {
              let { data, error } = await supabase.auth.signInWithPassword({
                email: values.email,
                password: values.password,
              });

              if (!error) {
                toast({
                  title: "Login Successfull.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                console.log(data);
              } else {
                toast({
                  title: "An error occured.",
                  description: error.message,
                  status: "error",
                  duration: 5000,
                  isClosable: true,
                });
                console.log(error);
              }
            }}
          >

            <Form>
            <Field name="email">
                    {/* @ts-ignore */}
                {({ field, form }) => (
                  <FormControl isRequired
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel aria-required>Email</FormLabel>
                    <Input {...field} name="email" type={"email"} />
                    <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              <Field name="password">
              {/* @ts-ignore */}
                {({ field, form }) => (
                  <FormControl isRequired
                    isInvalid={form.errors.password && form.touched.password}
                  >
                    <FormLabel aria-required>Password</FormLabel>
                    <Input {...field} name="password" type={"password"} />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>
              
            <Button
              mt={4}
              colorScheme={"purple"}
              type="submit"
            >
              Login
            </Button>
            </Form>
          </Formik>
         
       
       
          <Text>
            New here?{" "}
            <Link to={appRoutes.signup}>
              <Button
                variant={"link"}
                mt={4}
                colorScheme={"purple"}
                type="submit"
              >
                {" "}
                Sign Up
              </Button>
            </Link>
          </Text>
          <Link to={appRoutes.about}>
            <Button
              variant={"link"}
              mt={4}
              colorScheme={"purple"}
              type="submit"
            >
              About
            </Button>
          </Link>
        </Box>
      </SimpleGrid>
    </>
  );
};

export default Home;
