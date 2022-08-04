import { FunctionComponent } from "react";
import BackButton from "../../components/backButton/BackButton";


const Login:FunctionComponent<{}> =()=>{
    return(
        <>
            <form>
                <label htmlFor="email">Email Id</label>
                <input name="email" placeholder="Email" type="text" />
                <label htmlFor="password">Password</label>
                <input name="password" placeholder="Password" type="password" />
                <button type="submit">Login</button>
            </form>
            <BackButton/>
        </>
    )
}

export default Login