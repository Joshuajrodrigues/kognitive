import { FunctionComponent } from "react";
import BackButton from "../../components/backButton/BackButton";


const Signup: FunctionComponent<{}> = () => {
    return (
        <>
            <form>
                <label htmlFor="email">Email Id</label>
                <input name="email" placeholder="Email" type="text" />
                <label htmlFor="password">Password</label>
                <input name="password" placeholder="Password" type="password" />
                <label htmlFor="confirmpassword">Confirm Password</label>
                <input name="confirmpassword" placeholder="Password" type="password" />
                <button type="submit">Sign up</button>
            </form>
            <BackButton/>
        </>
    )
}

export default Signup