import { lazy, Suspense } from "react";
import { Navigate, Route, Routes } from "react-router-dom";
import { appRoutes } from "./AppConstants";
import { Loader } from "./components/Loader";
import Navbar from "./components/Navbar";
import Toast from "./components/Toast";
import CBTForm from "./forms/CBTForm";
import SmartGoalForm from "./forms/SmartGoalForm";
import useUser from "./hooks/useUser";
import Home from "./pages/Home";
import PasswordReset from "./pages/PasswordReset";
import Signup from "./pages/Signup";
import Welcome from "./pages/Welcome";
const History = lazy(() => import("./pages/History"));
const About = lazy(() => import("./pages/About"));

function App() {
  const user = useUser((state) => state.user);


  return (
    <div tabIndex={0}>

      <Navbar  />
      <Toast />
      <Routes>
        <Route path={appRoutes.login} element={!user.id ? <Home /> : <Navigate to={appRoutes.root} />} />
        <Route path={appRoutes.signup} element={!user.id ? <Signup /> : <Navigate to={appRoutes.root} />} />
        <Route path={appRoutes.cbtForm} element={!user.id ? <Home /> : <CBTForm />} />
        <Route path={appRoutes.miniFormSMARTForm} element={!user.id ? <Home /> : <SmartGoalForm />} />
        <Route path={appRoutes.about} element={<Suspense fallback={<Loader />}><About /></Suspense>} />
        <Route path={appRoutes.root} element={!user.id ? <Navigate to={appRoutes.login} /> : <Welcome />} />
        <Route path={appRoutes.historicalSubmites} element={!user.id ? <Navigate to={appRoutes.login} /> : <Suspense fallback={<Loader />}><History /></Suspense>} />
        <Route path={appRoutes.forgotPassword} element={<PasswordReset />} />
      </Routes>
    </div>
  );
}

export default App;
