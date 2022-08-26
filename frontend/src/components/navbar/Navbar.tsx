import { Heading } from "@chakra-ui/react";
import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../AppConstants";


const Navbar: FunctionComponent<{}> = () => {
    return (
        <nav  >
            <Link to={appRoutes.root} className="app-name">
                <Heading mt={2} ml={4} color={"#805ad5"}>
                    Kognitive
                </Heading>
            </Link>


        </nav>
    )
}

export default Navbar