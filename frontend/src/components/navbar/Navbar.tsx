import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../AppConstants";


const Navbar:FunctionComponent<{}> =()=>{
    return(
        <nav className="navbar" >
            <Link to={appRoutes.root} className="app-name">
                Kognitive
            </Link>


        </nav>
    )
}

export default Navbar