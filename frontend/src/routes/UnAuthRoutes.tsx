import React from "react";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "../AppConstants";
import Login from "../components/login/Login";
import About from "../pages/about/About";
import Home from "../pages/home/Home";
import Signup from "../pages/signup/Signup";

const UnAuthRoutes = () => {
  return (
    <div>
      <Routes>
        <Route path={appRoutes.root} element={<Home />} />
        <Route path={appRoutes.signup} element={<Signup />} />
        <Route path={appRoutes.login} element={<Login />} />
        <Route path={appRoutes.about} element={<About />} />
      </Routes>
    </div>
  );
};

export default UnAuthRoutes;
