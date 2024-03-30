import React,{ useState,useEffect } from 'react'
import { Route, useLocation, Routes, Navigate } from 'react-router-dom'
import fetchData from './utils/fetchData'
import Navbar from './components/Navbar'
import Error from './components/Errors'
import Login from './components/Login'
import SideBar from './components/SideBar'
import Inicio from './components/Inicio/Inicio'
import ProductDetail from './components/Products/ProductDetail'
import Products from './components/Products/Products'
import Payments from './components/Payment/Payments'
import Users from './components/Users'


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

  const Menu = [
    {id: 1, name: 'Inicio', route: '/dashboard'},
    {id: 2, name: 'Usuarios', route: '/dashboard/users', endpoint: '/api/users?key=allUsers'},
    {id: 3, name: 'Productos', route: '/dashboard/products', endpoint: '/api/products'},
    {id: 5, name: 'Informe de Pagos', route: '/dashboard/payments'}
    
    //{id: 4, active: false, name: 'Otros'}
]

  const [reducer, setReducer] = useState(
    Menu.map(comp => {return {
        id: comp.id,
        state: {}
    }})
)

useEffect(()=>{
  if (user.access) {
    Menu.forEach(comp => {
      let compState = reducer.find(state => state.id == comp.id).state
      if (comp.endpoint && Object.keys(compState).length == 0) {
          fetchData(comp.endpoint).then((data) => {
              setReducer([
                  ...reducer.filter(({id}) => id !== comp.id),
                  {id: comp.id, state: data}
              ])
          })
      }
    })
  }
},[reducer,user])


  return (<>
    <link rel="stylesheet" href="/css/dashboard.css"/>
      {user.access? <React.Fragment>
          <Navbar user={user} setUser={setUser}/>
          <SideBar Menu={Menu}/>
        </React.Fragment> : <Navigate to="/dashboard/login"/>}
      <div className='container'>
      <Routes>
          <Route path="/dashboard" element={!user.access? <Navigate to="/dashboard/login"/> 
            : <Inicio reducer={reducer} setReducer={setReducer}/>}/>
          <Route path="/dashboard/payments" element={!user.access? <Navigate to="/dashboard/login"/> 
            : <Payments id={5} reducer={reducer} setReducer={setReducer}/>}/>
          <Route path="/dashboard/products" element={!user.access? <Navigate to="/dashboard/login"/> 
            : <Products id={3} reducer={reducer} setReducer={setReducer}/>}/>
          <Route path="/dashboard/product/:id" element={!user.access? <Navigate to="/dashboard/login"/> 
            : <ProductDetail />}/>
          <Route path="/dashboard/users" element={!user.access? <Navigate to="/dashboard/login"/> 
            : <Users id={2} reducer={reducer} setReducer={setReducer}/>}/>
        <Route path="/dashboard/login" element={<Login user={user} setUser={setUser}/>}/>
        <Route path="*" element={<Error/>}/>
      </Routes>
    </div>
    </>
  )
}

export default App
