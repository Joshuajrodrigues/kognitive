import { Box, Button, FormControl, FormLabel, Input, SimpleGrid, Spacer, Text } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../AppConstants";
import LottieCreator from "../../components/sideBanner/LottieCreator";
import lottieSrc from '../../lotties/hero-signin.json';
const Home: FunctionComponent<{}> = () => {
  return (
    <SimpleGrid marginTop={{ md: "15%" }} spacing='8' textAlign='center' columns={{ sm: 1, md: 2 }}>

      <Box width={"100%"} height={"100%"}>
        <LottieCreator
          style={{ height: '300px', width: '300px' }}
          loop={true} src={lottieSrc}
        />
      </Box>

      <Box borderWidth='1px' borderRadius='md' padding={{ sm: "4" }} width={{ sm: "100%", md: "80%" }} >
        <Text>Welcome to <span >Kognitive</span> , <br /> your cbt journal.🤍</Text>
        <FormControl>
          <FormLabel>Email</FormLabel>
          <Input
            type={"email"}
          />
          <FormLabel>Password</FormLabel>
          <Input type={"password"} />
          <Button mt={4} colorScheme={"purple"} type='submit'>Login</Button>
        </FormControl>
        <Text>
          <p>New here? <Link to={appRoutes.signup}> Sign Up</Link></p>
        </Text>
        <Link to={appRoutes.about}>About</Link>
      </Box>
    </SimpleGrid>


  );
};

export default Home;
