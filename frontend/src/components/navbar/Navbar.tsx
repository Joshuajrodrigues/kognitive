import {
  Box,
  Button,
  ButtonGroup,
  Flex,
  Heading,
  SimpleGrid,
  Spacer,
} from "@chakra-ui/react";
import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "../../AppConstants";
import { supabase } from "../../helper/supabaseClient";
import useUser, { UserDataType } from "../../hooks/useUser";

const Navbar: FunctionComponent<{}> = () => {
  const user = useUser((state) => state.user);
  const [isLoading,setIsLoading] = useState(false)
  const addUser = useUser((state) => state.addUser);
  const removeUser = useUser((state) => state.removeUser);
  let navigate = useNavigate();

  useEffect(() => {
    const user = supabase.auth.getUser()
    user.then((response) => {
      addUser({ id: response.data.user?.id, user_metadata: response.data.user?.user_metadata })
    })
    // const data = sessionStorage.getItem("user");
    // if (data) {
    //   const user: UserDataType = JSON.parse(sessionStorage.getItem("user") || "");
    //   if (user) {
    //     addUser(user);
    //   }
    // }
  }, []);
  const handleLogOut = async () => {
    setIsLoading(true)
    let { error } = await supabase.auth.signOut();
    if (!error) {
      removeUser();
      navigate(appRoutes.root);
      setIsLoading(false)
      //sessionStorage.removeItem("user");
    } else {
      console.log(error);
      setIsLoading(false)
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
        {user.id && (
          <Button isLoading={isLoading} variant={"outline"} onClick={handleLogOut} colorScheme={"purple"}>
            Log Out
          </Button>
        )}
      </ButtonGroup>
    </Flex>
  );
};

export default Navbar;
