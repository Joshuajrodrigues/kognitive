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
//@ts-ignore
import { Field, Form, Formik } from "formik";
import { FunctionComponent } from "react";
import { Link, useNavigate } from "react-router-dom";
import * as Yup from "yup";
import { appRoutes } from "../../AppConstants";
import LottieCreator from "../../components/sideBanner/LottieCreator";
import { supabase } from "../../helper/supabaseClient";
import useUser from "../../hooks/useUser";
import lottieSrc from "../../lotties/hero-signin.json";

const Home: FunctionComponent<{}> = () => {
  const toast = useToast();
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
          bg={"purple.50"}
          borderColor={"purple.500"}
          margin={{ base: "auto", sm: "auto" }}
          padding={{ base: "4", sm: "4" }}
          width={{ base: "80%", sm: "80%", md: "80%" }}
        >
          <Text fontWeight={"semibold"} color={"purple.500"}>
            Welcome to <span>Kognitive</span>, <br /> your cbt journal.
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
                navigate(appRoutes.root);
                toast({
                  title: "Login Successfull.",
                  status: "success",
                  duration: 5000,
                  isClosable: true,
                });
                //console.log(data);
                addUser({id:data.user?.id});
                //sessionStorage.setItem("user", JSON.stringify(data));
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
                  <FormControl
                    isRequired
                    isInvalid={form.errors.email && form.touched.email}
                  >
                    <FormLabel color={"purple.500"} aria-required>Email</FormLabel>
                    <Input  bgColor={"white"}  color={"purple.800"}   borderColor={"purple.500"} {...field} name="email" type={"email"} />
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
                    <FormLabel  color={"purple.500"} aria-required>Password</FormLabel>
                    <Input  bgColor={"white"}  color={"purple.800"}  borderColor={"purple.500"} {...field} name="password" type={"password"} />
                    <FormErrorMessage>{form.errors.password}</FormErrorMessage>
                  </FormControl>
                )}
              </Field>

              <Button mt={4} colorScheme={"purple"} type="submit">
                Login
              </Button>
            </Form>
          </Formik>

          <Text color={"purple.500"}>
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
