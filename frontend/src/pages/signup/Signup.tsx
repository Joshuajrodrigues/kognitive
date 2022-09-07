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
import BackButton from "../../components/backButton/BackButton";
import LottieCreator from "../../components/sideBanner/LottieCreator";
import { supabase } from "../../helper/supabaseClient";
import lottieSrc from "../../lotties/hero-signup.json";
import * as Yup from "yup";
import useUser from "../../hooks/useUser";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../AppConstants";
const Signup: FunctionComponent<{}> = () => {
  const toast = useToast();
  const addUser = useUser((state)=>state.addUser)

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
    <SimpleGrid
      marginTop={{ md: "10%" }}
      spacing="8"
      textAlign="center"
      columns={{ base: 1, sm: 1, md: 2 }}
    >
      <Box width={"100%"} height={"100%"}>
        <LottieCreator
          style={{ height: "300px", width: "300px" }}
          loop={false}
          src={lottieSrc}
        />
      </Box>
      <Box
        borderWidth="1px"
        borderRadius="md"
        bgColor={"purple.50"}
        borderColor={"purple.500"}
        margin={{ base: "auto", sm: "auto" }}
        padding={{ base: "4", sm: "4" }}
        width={{ base: "80%", sm: "80%", md: "80%" }}
      >
        <Text fontWeight={"semibold"} color={"purple.500"}>
          Welcome to <span>Kognitive</span> , <br /> your cbt journal.🤍
        </Text>
        <Formik
          validationSchema={SignupSchema}
          initialValues={{
            name: "",
            email: "",
            password: "",
            confirm: "",
          }}
          onSubmit={async (values) => {
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
              toast({
                title: "Account created.",
                description: "We've created your account for you.",
                status: "success",
                duration: 5000,
                isClosable: true,
              });
              console.log({data});
              ///addUser(data)
              if(data.user?.id)
              navigate(appRoutes.root)
              //sessionStorage.setItem('user', JSON.stringify(data))
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
            <Field name="name">
              {/* @ts-ignore */}
              {({ field, form }) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.name && form.touched.name}
                >
                  <FormLabel color={"purple.500"} aria-required>Name</FormLabel>
                  <Input color={"purple.800"}  bgColor={"white"}   borderColor={"purple.500"} {...field} name="name" type={"text"} />
                  <FormErrorMessage>{form.errors.name}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="email">
              {/* @ts-ignore */}
              {({ field, form }) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.email && form.touched.email}
                >
                  <FormLabel color={"purple.500"} aria-required>Email</FormLabel>
                  <Input color={"purple.800"}  bgColor={"white"}   borderColor={"purple.500"} {...field} name="email" type={"email"} />
                  <FormErrorMessage>{form.errors.email}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Field name="password">
              {/* @ts-ignore */}
              {({ field, form }) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.password && form.touched.password}
                >
                  <FormLabel color={"purple.500"} aria-required>Password</FormLabel>
                  <Input color={"purple.800"}  bgColor={"white"}   borderColor={"purple.500"} {...field} name="password" type={"password"} />
                  <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                </FormControl>
              )}
            </Field>
            <Field name="confirm">
              {/* @ts-ignore */}
              {({ field, form }) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.confirm && form.touched.confirm}
                >
                  <FormLabel color={"purple.500"} aria-required>Confirm Password</FormLabel>
                  <Input color={"purple.800"} bgColor={"white"}  borderColor={"purple.500"} {...field} name="confirm" type={"password"} />
                  <FormErrorMessage>{form.errors.confirm}</FormErrorMessage>
                </FormControl>
              )}
            </Field>

            <Button mt={4} colorScheme={"purple"} type="submit">
              Sign Up
            </Button>
          </Form>
        </Formik>
        <div className="div login-extra-text">
          <BackButton />
        </div>
      </Box>
    </SimpleGrid>
  );
};

export default Signup;
