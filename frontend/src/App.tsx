import { Route, Routes } from "react-router-dom";
import { appRoutes } from "./AppConstants";
import Navbar from "./components/navbar/Navbar";
import About from "./pages/about/About";
import Home from "./pages/home/Home";
import Login from "./components/login/Login";
import Signup from "./pages/signup/Signup";
import { useState } from "react";
import UnAuthRoutes from "./routes/UnAuthRoutes";
import AuthRoutes from "./routes/AuthRoutes";
import useUser from "./hooks/useUser";

function App() {
  const user = useUser((state) => state.user);
  return (
    <div>
      <Navbar />
      {/* unauth routes */}
      {!user.user ? <UnAuthRoutes /> : <AuthRoutes />}

      {/* auth routes */}
    </div>
  );
}

export default App;
