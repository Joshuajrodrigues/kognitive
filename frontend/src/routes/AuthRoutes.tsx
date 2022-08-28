import React from "react";
import { Route, Routes } from "react-router-dom";
import { appRoutes } from "../AppConstants";
import Welcome from "../pages/userPages/Welcome";

const AuthRoutes = () => {
  return (
    <Routes>
      <Route path={appRoutes.user} element={<Welcome />} />
  
    </Routes>
  );
};

export default AuthRoutes;
