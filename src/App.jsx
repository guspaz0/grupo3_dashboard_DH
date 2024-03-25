import React,{ useState,useEffect } from 'react'
import {Route, useLocation, Routes, useNavigate, Navigate, Link} from 'react-router-dom'
import SideBar from './components/SideBar'
import Dashboard from './components/Dashboard'

import Error from './components/Errors'
import Login from './components/Login'
//import './App.css'

function App() {

  const location = useLocation()

  const [user,setUser] = useState({access: false})

//--------> guardamos el usuario en session storage unicamente para fase de testing. despues lo borramos > ----------------- //
  useEffect(()=> {
    if (sessionStorage.user) {
      const userSession = JSON.parse(sessionStorage.user)
      if (user != userSession) setUser(userSession)
    }
  },[sessionStorage])

  return (
    <div>
      {user.access? <Navigate to="/dashboard"/> : <Navigate to="/dashboard/login"/>}
      <Routes>
        {user.access && user.admin == 1 && <Route path="/dashboard" element={<Dashboard user={user} setUser={setUser}/>}/>}
        <Route path="/dashboard/login" element={<Login setUser={setUser}/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  )
}

export default App
