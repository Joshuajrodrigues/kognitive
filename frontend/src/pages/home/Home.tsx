import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../AppConstants";
import Login from "../login/Login";

import lottieSrc from '../../lotties/hero-signin.json'
import SideBanner from "./sideBanner/SideBanner";
const Home: FunctionComponent<{}> = () => {
  return (
    <div className="grid-container">
      <div className="item-1">
        <SideBanner style={{ height: '300px', width: '100%' }} loop={true} src={lottieSrc} />
      </div>
      <div className="item-2">
        <h2>Welcome to <span className="app-name">Kognitive</span> , <br /> your cbt journal.🤍 </h2>
        <Login/>
        <div className="login-extra-text">
        <p>New here? <Link to={appRoutes.signup}> Sign Up</Link></p>
        </div>
        <Link to={appRoutes.about}>About</Link>
      </div>
    </div>
  );
};

export default Home;
