
import { FunctionComponent, useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { appRoutes } from "../AppConstants";
import { supabase } from "../helper/supabaseClient";
import { useToast } from "../hooks/useToast";
import useUser, { UserDataType } from "../hooks/useUser";
import { Loader } from "./Loader";
import { SignOut } from "phosphor-react";

const Navbar: FunctionComponent<{}> = () => {
  const user = useUser((state) => state.user);
  const [isLoading, setIsLoading] = useState(false)
  const addUser = useUser((state) => state.addUser);
  const setAuthed = useUser((state) => state.setAuthed);
  const removeUser = useUser((state) => state.removeUser);
  let navigate = useNavigate();
  const { toast } = useToast()
  useEffect(() => {


    const user = supabase.auth.getUser()
    user.then((response) => {
      addUser({ id: response.data.user?.id, user_metadata: response.data.user?.user_metadata })
    })
      .finally(() => {
        setAuthed(true)
      })
  }, []);
  const handleLogOut = async () => {
    setIsLoading(true)
    let { error } = await supabase.auth.signOut();
    if (!error) {
      removeUser();
      navigate(appRoutes.root);
      setIsLoading(false)
      toast.success("Logout Successfull")
      //sessionStorage.removeItem("user");
    } else {
      console.log(error);
      toast.error(error.message)
      setIsLoading(false)
    }
  };
  return (
    <div tabIndex={0} className="navbar">
      <h1 className="app-heading">
        Kognitive
      </h1>
      {user.id && (
        <button className="outline-button" onClick={handleLogOut}>
          {
            isLoading ? <Loader color="#805ad5" /> : <SignOut />
          }
        </button>
      )}
    </div>
  );
};

export default Navbar;
