import {
  ArrowLeftIcon,
  RepeatClockIcon,
  CalendarIcon,
  AddIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import {
  Box,
  Button,
  Center,
  Divider,
  Flex,
  Icon,
  IconButton,
  SimpleGrid,
  Text,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../AppConstants";
import LottieCreator from "../components/LottieCreator";
import useUser from "../hooks/useUser";
import hellocat from "../lotties/hellocat.json";
const Welcome: FunctionComponent<{}> = () => {
  const user = useUser((state) => state.user);
  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate();
  useEffect(() => {
    console.log(user);

    setInterval(() => setDateTime(new Date()), 30000);
  }, [user]);
  return (
    <>
      <Center p={4}>
        <Box
          w={{ base: "md", md: "80%" }}
          h={"100%"}
          bg={"purple.50"}
          borderWidth="1px"
          borderRadius="md"
        >
          <Flex alignItems={"center"} pl={"4"} pr={4} pt={4}>
            <CalendarIcon color={"purple.500"} mr={2} />
            <Text color={"purple.500"} mr={2}>
              {dateTime.toLocaleDateString("en-IN", {
                day: "numeric",
                month: "short",
                year: "numeric",
              })}
            </Text>

            <TimeIcon color={"purple.500"} mr={2} />
            <Text color={"purple.500"}>
              {dateTime.toLocaleTimeString("en-IN", {
                hour: "numeric",
                minute: "numeric",
                hour12: true,
              })}
            </Text>
          </Flex>

          <Text
            fontWeight={"semibold"}
            color={"purple.500"}
            fontSize={"lg"}
            m={4}
          >
            Welcome {user.user_metadata?.name}, how are you feeling ?
          </Text>
          <SimpleGrid columns={2}>
            <div className="lottie-container">
              <img src="./checkin.svg" alt="" className="hero-image" />
            </div>
            <Flex m={2} justifyContent={"center"} direction={{"base":"column","sm":"column",md:"row",lg:"row"}}>
              <Button
              m={2}
                alignItems={"center"}
                alignSelf={"center"}
                w={"120px"}
                colorScheme="purple"
                aria-label="Make a cbt entry"
                onClick={() => navigate(appRoutes.cbtForm)}
              >
                <AddIcon w={3} mr={1} />
               Check In
              </Button>
              <Button
                m={2}
                alignItems={"center"}
                alignSelf={"center"}
                w={"120px"}
                colorScheme="purple"
                aria-label="Make a cbt entry"
                onClick={() => navigate(appRoutes.historicalSubmites)}
              >
                <RepeatClockIcon w={3} mr={1} />
               History
              </Button>
            </Flex>
          </SimpleGrid>
        </Box>
      </Center>
      <Divider />
    </>
  );
};

export default Welcome;
