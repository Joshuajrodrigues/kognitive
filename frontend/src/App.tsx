
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { appRoutes } from './AppConstants'
import Navbar from './components/navbar/Navbar'
import About from './pages/about/About'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

function App() {


  return (
    <div style={{ "padding": "2em" }} >
      <Navbar/>

      
      <Routes>
        <Route path={appRoutes.root} element={<Home/>} />
        <Route path={appRoutes.signup} element={<Signup/>} />
        <Route path={appRoutes.login} element={<Login/>} />
        <Route path={appRoutes.about} element={<About/>}/>
      </Routes>
    </div>
  )
}

export default App
