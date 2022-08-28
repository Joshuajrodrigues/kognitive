import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Spacer,
  Text,
} from "@chakra-ui/react";


import { FunctionComponent, MouseEventHandler, useState } from "react";
import { Link, Navigate, unstable_HistoryRouter } from "react-router-dom";
import { appRoutes } from "../../AppConstants";
import LottieCreator from "../../components/sideBanner/LottieCreator";
import { supabase } from "../../helper/supabaseClient";
import lottieSrc from "../../lotties/hero-signin.json";
const Home: FunctionComponent<{}> = () => {
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState("")

  const handleOnClick = async(event?:React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault()
    let { data, error } = await supabase.auth.signInWithPassword({
      email:email,
      password: password
    })
    console.log({
      data,error
    });
    
  };

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
          <FormControl>
            <FormLabel>Email</FormLabel>
            <Input onChange={(event)=>setEmail(event.target.value)} type={"email"} />
            <FormLabel>Password</FormLabel>
            <Input  onChange={(event)=>setPassword(event.target.value)} type={"password"} />
            <Button
              onClick={handleOnClick}
              mt={4}
              colorScheme={"purple"}
              type="submit"
            >
              Login
            </Button>
          </FormControl>
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
