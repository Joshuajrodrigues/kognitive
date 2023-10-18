import { Button } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../AppConstants";

const BackButton: FunctionComponent<{ to?: string }> = ({ to }) => {
  return (
    <Link className="link-button" to={to || appRoutes.root}>
      Back
    </Link>
  );
};

export default BackButton;
