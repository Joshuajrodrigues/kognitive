import { FunctionComponent } from "react";
import BackButton from "../../components/backButton/BackButton";
import SideBanner from "../home/sideBanner/SideBanner";
import lottieSrc from '../../lotties/hero-signup.json'

const Signup: FunctionComponent<{}> = () => {
    return (
        <>
            <div>
                <SideBanner style={{ height: '300px', width: '300px' }} loop={false} src={lottieSrc} />
            </div>
            <div className="signup-container" >
                <form >
                    <div className="input-group">
                        <label htmlFor="email">Email Id</label><br />
                        <input name="email" placeholder="example@blabla.com" type="text" />
                    </div>

                    <div className="input-group">
                        <label htmlFor="password">Password</label> <br />
                        <input name="password" placeholder="Password" type="password" />

                    </div>
                    <div className="input-group">
                        <label htmlFor="confirmpassword">Confirm Password</label> <br />
                        <input name="confirmpassword" placeholder="Password" type="password" />

                    </div>
                <button type="submit">Sign up</button>

            </form>
                <div className="div login-extra-text">
                    <BackButton />
                </div>
            </div>
        </>
    )
}

export default Signup