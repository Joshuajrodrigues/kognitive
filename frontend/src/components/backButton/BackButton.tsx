import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../AppConstants";


const BackButton:FunctionComponent<{}> =()=>{

    return(
        <Link to={appRoutes.root } >Back</Link>
    )
}

export default BackButton