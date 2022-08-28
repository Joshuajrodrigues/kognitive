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
const Signup: FunctionComponent<{}> = () => {
  const toast = useToast();

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
            <Field name="name">
              {/* @ts-ignore */}
              {({ field, form }) => (
                <FormControl
                  isRequired
                  isInvalid={form.errors.name && form.touched.name}
                >
                  <FormLabel aria-required>Name</FormLabel>
                  <Input {...field} name="name" type={"text"} />
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
                  <FormLabel aria-required>Email</FormLabel>
                  <Input {...field} name="email" type={"email"} />
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
                  <FormLabel aria-required>Password</FormLabel>
                  <Input {...field} name="password" type={"password"} />
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
                  <FormLabel aria-required>Confirm Password</FormLabel>
                  <Input {...field} name="confirm" type={"password"} />
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
