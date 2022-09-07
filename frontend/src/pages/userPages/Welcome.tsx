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
import { appRoutes } from "../../AppConstants";
import LottieCreator from "../../components/sideBanner/LottieCreator";
import useUser from "../../hooks/useUser";
import hellocat from "../../lotties/hellocat.json";
const Welcome: FunctionComponent<{}> = () => {
  const user = useUser((state) => state.user);
  const [dateTime, setDateTime] = useState(new Date());
  const navigate = useNavigate()
  useEffect(() => {
    setInterval(() => setDateTime(new Date()), 30000);
  }, []);
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
            Welcome {user.user_metadata?.name || "Anon"}, how are you
            feeling ?
          </Text>
          <SimpleGrid columns={2}>
            <LottieCreator
              style={{ width: "200px", height: "200px" }}
              loop
              src={hellocat}
            />
            <SimpleGrid gridTemplateRows={"1fr 1fr"}>
              <Button
                alignItems={"center"}
                alignSelf={"center"}
                w={"150px"}
                colorScheme="purple"
                aria-label="Make a cbt entry"
                onClick={()=>navigate(appRoutes.cbtForm)}
              >
                <AddIcon w={3} mr={1} />
                New cbt entry
              </Button>
              <Button
                alignItems={"center"}
                alignSelf={"center"}
                w={"150px"}
                colorScheme="purple"
                aria-label="Make a cbt entry"
                onClick={()=>navigate(appRoutes.historicalSubmites)}
              >
                <RepeatClockIcon w={3} mr={1} />
                Previous entries
              </Button>
            </SimpleGrid>
          </SimpleGrid>
        </Box>
      </Center>
      <Divider />
    </>
  );
};

export default Welcome;
