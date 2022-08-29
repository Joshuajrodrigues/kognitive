import React, { FunctionComponent } from "react";
import { Session } from "@supabase/supabase-js";
import useUser from "../../hooks/useUser";
import { Button, SimpleGrid, Text } from "@chakra-ui/react";
import { supabase } from "../../helper/supabaseClient";
import { useNavigate } from "react-router-dom";
import { appRoutes } from "../../AppConstants";
const Welcome: FunctionComponent<{}> = () => {
  const user = useUser((state) => state.user);

  return (
    <SimpleGrid>
      <Text ml={4} mt={4}>
        Welcome,{user.user?.user_metadata.name || "Anon"}
      </Text>
     
    </SimpleGrid>
  );
};

export default Welcome;
