import { FunctionComponent } from "react";
import BackButton from "./BackButton";


const Login: FunctionComponent<{}> = () => {
    return (
        <div className="login-container">
            <form>
                <div className="input-group" >
                    <label htmlFor="email">Email Id</label><br />
                    <input className="primaryInput" name="email" placeholder="example@blabla.com" type="email" /><br />
                </div>
                <div className="input-group" >
                    <label htmlFor="password">Password</label><br />
                    <input className="primaryInput" name="password" placeholder="Password" type="password" /><br />
                </div>
                <button className="primaryButton" type="submit">Login</button>
            </form>

        </div>
    )
}

export default Login