import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../AppConstants";


const Home:FunctionComponent<{}> =()=>{
    return(
        <>
            Welcome ❤
            <Link to={appRoutes.signup} >Sign Up</Link>
            <Link to={appRoutes.login} >Login</Link>
            <Link to={appRoutes.about} >About</Link>
        </>
    )
}

export default Home