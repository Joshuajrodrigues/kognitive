import React, { FunctionComponent } from "react";
import { Session } from "@supabase/supabase-js";
import useUser from "../../hooks/useUser";
import { Box, Button, SimpleGrid, Text } from "@chakra-ui/react";
import { supabase } from "../../helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../AppConstants";
import LottieCreator from "../../components/sideBanner/LottieCreator";

import angry from "../../lotties/feels/allfeels.json"
import sad from "../../lotties/feels/sad.json"
import meh from "../../lotties/feels/meh.json"
import happy from "../../lotties/feels/happy.json"
import yay from "../../lotties/feels/yay.json"
const Welcome: FunctionComponent<{}> = () => {
  const user = useUser((state) => state.user);

  return (
    <SimpleGrid mt={"2"} p={4} >
      <Box bg={"purple.100"} borderWidth="1px"
        borderRadius="md">
        <Text fontSize={"lg"} ml={4} mt={4}>
          Welcome {user.user?.user_metadata.name || "Anon"}, how are you feeling
          ?
        </Text>

        <SimpleGrid columns={5} >
          <LottieCreator style={{ height: "300px", width: "350px" }} loop src={angry}/>
          {/* <LottieCreator style={{ height: "300px", width: "200px" }} loop src={sad}/>
          <LottieCreator style={{ height: "300px", width: "200px" }} loop src={meh}/>
          <LottieCreator style={{ height: "300px", width: "200px" }} loop src={happy}/>
          <LottieCreator style={{ height: "300px", width: "200px" }} loop src={yay}/> */}
        </SimpleGrid>
      </Box>
    </SimpleGrid>
  );
};

export default Welcome;
