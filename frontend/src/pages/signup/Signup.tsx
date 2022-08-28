import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent, useState } from "react";
import BackButton from "../../components/backButton/BackButton";
import LottieCreator from "../../components/sideBanner/LottieCreator";
import { supabase } from "../../helper/supabaseClient";
import lottieSrc from "../../lotties/hero-signup.json";

const Signup: FunctionComponent<{}> = () => {
  const [name,setName] = useState('')
  const [email, setEmail] = useState('')
  const [password,setPassword] = useState("")

  const handleOnClick = async(event?:React.MouseEvent<HTMLButtonElement>) => {
    event?.preventDefault()
    let { data, error } = await supabase.auth.signUp({
      email: email,
      password: password,
      options:{
        data:{
          name:name
        }
      }
    })
    console.log({
      data,error
    });
    
  };

  return (
    <SimpleGrid
      marginTop={{ md: "10%" }}
      spacing="8"
      textAlign="center"
      columns={{base:1, sm: 1, md: 2 }}
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
        <FormControl>
        <FormLabel>Name</FormLabel>
          <Input onChange={(event)=>setName(event.target.value)} type={"text"} />
          <FormLabel>Email</FormLabel>
          <Input onChange={(event)=>setEmail(event.target.value)} type={"email"} />
          <FormLabel>Password</FormLabel>
          <Input onChange={(event)=>setPassword(event.target.value)} type={"password"} />
          <FormLabel>Confirm Password</FormLabel>
          <Input type={"password"} />
          <Button  onClick={handleOnClick} mt={4} colorScheme={"purple"} type="submit">
            Sign Up
          </Button>
        </FormControl>
        <div className="div login-extra-text">
          <BackButton />
        </div>
      </Box>
    </SimpleGrid>
  );
};

export default Signup;
