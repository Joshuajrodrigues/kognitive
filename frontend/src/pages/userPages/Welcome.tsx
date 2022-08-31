import {
  ArrowLeftIcon,
  ArrowRightIcon,
  CalendarIcon,
  AddIcon,
  TimeIcon,
} from "@chakra-ui/icons";
import { Box, Button, Center, Flex, Icon, IconButton, SimpleGrid, Text } from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import LottieCreator from "../../components/sideBanner/LottieCreator";
import useUser from "../../hooks/useUser";
import hellocat from '../../lotties/hellocat.json'
const Welcome: FunctionComponent<{}> = () => {
  const user = useUser((state) => state.user);
  const [dateTime, setDateTime] = useState(new Date());
  useEffect(() => {
    setInterval(() => setDateTime(new Date()), 30000);
  }, []);
  return (
    <Center p={4}>
      <Box
        w={"md"}
        h={"100%"}
        bg={"purple.100"}
        borderWidth="1px"
        borderRadius="md"
      >
        <Flex alignItems={"center"} pl={"4"} pr={4} pt={4}>
          <CalendarIcon color={"purple.400"} mr={2} />
          <Text color={"purple.500"} mr={2} >
            {dateTime.toLocaleDateString("en-IN", {
              day: "numeric",
              month: "short",
              year: "numeric",
            })}
          </Text>

          <TimeIcon color={"purple.400"}   mr={2}  />
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
          Welcome {user.user?.user_metadata.name || "Anon"},
          how are you feeling ?
        </Text>
        <SimpleGrid  columns={2} >
            <LottieCreator loop src={hellocat} />
            <Button alignItems={"center"} alignSelf={"center"} w={"150px"} colorScheme="purple" aria-label="Make a cbt entry"><AddIcon w={3} mr={1} />New cbt entry</Button>
        </SimpleGrid>
      </Box>

    </Center>
  );
};

export default Welcome;
