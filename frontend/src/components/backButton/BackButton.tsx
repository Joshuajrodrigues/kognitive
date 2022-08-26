import { Button } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../AppConstants";

const BackButton: FunctionComponent<{}> = () => {
  return (
    <Link to={appRoutes.root}>
      <Button mt={4} variant={"ghost"} colorScheme={"purple"} type="submit">
        Back
      </Button>
    </Link>
  );
};

export default BackButton;
