import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent } from "react";
import BackButton from "../../components/backButton/BackButton";
import LottieCreator from "../../components/sideBanner/LottieCreator";
import lottieSrc from "../../lotties/hero-signup.json";

const Signup: FunctionComponent<{}> = () => {
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
          <FormLabel>Email</FormLabel>
          <Input type={"email"} />
          <FormLabel>Password</FormLabel>
          <Input type={"password"} />
          <FormLabel>Confirm Password</FormLabel>
          <Input type={"password"} />
          <Button mt={4} colorScheme={"purple"} type="submit">
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
