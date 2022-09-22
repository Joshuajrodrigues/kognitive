import { Navigate, Route, Routes } from "react-router-dom";
import { appRoutes } from "./AppConstants";
import Navbar from "./components/Navbar";
import useUser from "./hooks/useUser";
import Home from "./pages/Home";
import Signup from "./pages/Signup";
import CBTForm from "./forms/CBTForm"
import Welcome from "./pages/Welcome"
import { lazy, Suspense } from "react";
const History = lazy(() => import("./pages/History"));
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
        <Route path={appRoutes.about} element={<Suspense fallback={<i className="fa fa-circle-o-notch fa-spin"></i>}><About /></Suspense>} />
        <Route path={appRoutes.root} element={!user.id ? <Navigate to={appRoutes.login} /> : <Welcome />} />
        <Route path={appRoutes.historicalSubmites} element={!user.id ? <Navigate to={appRoutes.login} /> : <Suspense fallback={<i className="fa fa-circle-o-notch fa-spin"></i>}><History /></Suspense>} />
        {/* <Route path={appRoutes.root} element={<Welcome />} /> */}
      </Routes>
    </div>
  );
}

export default App;
