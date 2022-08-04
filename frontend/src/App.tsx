
import { Route, Routes } from 'react-router-dom'
import './App.css'
import { appRoutes } from './AppConstants'
import About from './pages/about/About'
import Home from './pages/home/Home'
import Login from './pages/login/Login'
import Signup from './pages/signup/Signup'

function App() {


  return (
    <div>
      <h1>
        CBT Journal ✌
      </h1>
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
