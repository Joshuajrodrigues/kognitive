import { Navigate, Route, Routes } from "react-router-dom";
import { appRoutes } from "./AppConstants";
import Navbar from "./components/Navbar";
import useUser from "./hooks/useUser";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import { lazy } from "react";
const Welcome = lazy(() => import("./pages/Welcome"));
const History = lazy(() => import("./pages/History"));
const CBTForm = lazy(() => import("./forms/CBTForm"));
const About = lazy(() => import("./pages/About"));

function App() {
  const user = useUser((state) => state.user);

  
  return (
    <div>
      <Navbar />

      <Routes>
        <Route path={appRoutes.login} element={!user.id ? <Home /> : <Navigate to={appRoutes.root} />} />
        <Route path={appRoutes.signup} element={!user.id ? <Signup /> : <Navigate to={appRoutes.root} />} />
        <Route path={appRoutes.cbtForm} element={!user.id ? <Home /> : <CBTForm />} />
        <Route path={appRoutes.about} element={<About />} />
        <Route path={appRoutes.root} element={!user.id ? <Navigate to={appRoutes.login} /> : <Welcome />} />
        <Route path={appRoutes.historicalSubmites} element={!user.id ? <Navigate to={appRoutes.login} /> : <History />} />
        {/* <Route path={appRoutes.root} element={<Welcome />} /> */}
      </Routes>
    </div>
  );
}

export default App;
