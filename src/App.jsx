import React,{ useState,useEffect } from 'react'
import {Route, useLocation, Routes, useNavigate, Navigate, Link} from 'react-router-dom'
import SideBar from './components/SideBar'
import Dashboard from './components/Dashboard'
import Payments from './components/Payments'
import Navbar from './components/Navbar'
import Error from './components/Errors'
import Login from './components/Login'
//import './App.css'

function App() {

  const location = useLocation()

  const [user,setUser] = useState({access: false})

  useEffect(()=> {
    if (sessionStorage.user) {
      const userSession = JSON.parse(sessionStorage.user)
      if (user != userSession) setUser(userSession)
    }

  },[sessionStorage])

  return (
    <div>
      {location.pathname !== '/'? location.pathname !== '/dashboard/login' && <Navbar user={user} setUser={setUser}/>: null}
      {user.access? <Navigate to="/dashboard"/> : <Navigate to="/dashboard/login"/>}
      <Routes>
        {user.access && user.admin == 1? <>
          <Route path="/dashboard" element={<Dashboard/>}/>
          <Route path="/dashboard/payments" element={<Payments/>}/>
        </>:
        null
        }
        <Route path="/dashboard/login" element={<Login setUser={setUser}/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
  )
}

export default App
