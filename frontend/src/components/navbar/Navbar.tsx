import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "../../AppConstants";
import { supabase } from "../../helper/supabaseClient";
import useUser, { UserDataType } from "../../hooks/useUser";

const Navbar: FunctionComponent<{}> = () => {
  const user = useUser((state) => state.user);
  const addUser = useUser((state) => state.addUser);
  const removeUser = useUser((state) => state.removeUser);
  let navigate = useNavigate();

  useEffect(() => {
    const data = sessionStorage.getItem("user");
    if (data) {
      const user: UserDataType = JSON.parse(sessionStorage.getItem("user") || "");
      if (user) {
        addUser(user);
      }
    }
  }, []);
  const handleLogOut = async () => {
    let { error } = await supabase.auth.signOut();
    if (!error) {
      removeUser();
      navigate(appRoutes.root);
      sessionStorage.removeItem("user");
    } else {
      console.log(error);
    }
  };
  return (
    <Flex  minWidth="max-content" alignItems="center" gap="2">
      <Box p="2">
        <Heading color={"#805ad5"} size="xl">
          Kognitive
        </Heading>
      </Box>
      <Spacer />
      <ButtonGroup p="2" gap="2">
        {user.user && (
          <Button variant={"outline"} onClick={handleLogOut} colorScheme={"purple"}>
            Log Out
          </Button>
        )}
      </ButtonGroup>
    </Flex>
  );
};

export default Navbar;
