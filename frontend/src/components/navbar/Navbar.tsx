import { Heading } from "@chakra-ui/react";
import { FunctionComponent, useEffect } from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../AppConstants";
import useUser, { UserDataType } from "../../hooks/useUser";


const Navbar: FunctionComponent<{}> = () => {
    const addUser = useUser((state) => state.addUser)
    const user = useUser((state) => state.user);
    useEffect(() => {
        const data = localStorage.getItem('user')
        if (data) {

            const user: UserDataType = JSON.parse(localStorage.getItem('user') || "")
            if (user) {
                addUser(user)
            }
        }
    }, [])
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