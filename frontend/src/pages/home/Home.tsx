import { FunctionComponent } from "react";
import { Link } from "react-router-dom";
import { appRoutes } from "../../AppConstants";
import Login from "../../components/login/Login";
import './Home.scss'
import lottieSrc from '../../lotties/hero-signin.json'
import LottieCreator from "../../components/sideBanner/LottieCreator";
import Footer from "../../components/footer/Footer";
const Home: FunctionComponent<{}> = () => {
  return (
    <div className="grid-container">
      <div className="home-login-container">
        <LottieCreator
          style={{ height: '250px', width: '300px' }}
          loop={true} src={lottieSrc}
        />
        <span>
          <h2>Welcome to <span >Kognitive</span> , <br /> your cbt journal.🤍 </h2>
        </span>
        <Login />
        <div className="home-login-extra" >
          <p>New here? <Link to={appRoutes.signup}> Sign Up</Link></p>
        </div>
        <Link to={appRoutes.about}>About</Link>
      </div>

      <div className="home-footer">
        <Footer />
      </div>

    </div>
  );
};

export default Home;
