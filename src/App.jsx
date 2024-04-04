import React,{ useState,useEffect, createContext } from 'react'
import { Route, useLocation, Routes, Navigate } from 'react-router-dom'
import fetchData from './utils/fetchData'
import Navbar from './components/Navbar'
import Error from './components/Errors'
import Login from './components/Login'
import SideBar from './components/SideBar'
import Inicio from './components/Inicio/Inicio'
import ProductDetail from './components/Products/ProductDetail'
import Products from './components/Products/Products'
import ProductCreate from './components/Products/ProductCreate'
import Payments from './components/Payment/Payments'
import Users from './components/Users/Users'
import PaymentMetrics from './components/Payment/PaymentMetrics'
import PaymentDetail from './components/Payment/PaymentDetail'
import DetailUsers from './components/Users/DetailUsers'

const GlobalState = createContext(null)

function App() {

  const location = useLocation()

  const [user,setUser] = useState({access: false})

  const Menu = [
    {id: 1, name: 'Inicio', route: '/dashboard'},
    {id: 2, name: 'Usuarios', route: '/dashboard/users', endpoint: '/api/users?key=allUsers'},
    {id: 3, name: 'Productos', endpoint: '/api/products', 
      sublist: [
        {name: 'Listado', route: '/dashboard/products'},
        {name: 'Crear Producto', route: '/dashboard/products/create'},
    ]},
    {id: 5, name: 'Informes de Ventas', endpoint:`/api/payment/metric`,
      sublist: [
        {name: 'Metricas', route: '/dashboard/payments/metrics'},
        {name: 'Listados', route: '/dashboard/payments'}
      ]
    }
  ]

  const [reducer, setReducer] = useState(
    Menu.map(comp => {return {
        id: comp.id,
        state: {}
    }})
  )

useEffect(()=>{
  if (user.access) {
    const promises = Menu.map(comp => {
      let compState = reducer.find(({id}) => id == comp.id).state
      if (comp.endpoint && Object.keys(compState).length == 0) {
        return new Promise(resolve => resolve(fetchData(comp.endpoint)))
          .then((data) => {
            return {id: comp.id, state: data}})
      } else if (!comp.endpoint) {
        return {id: comp.id, state: {}}
      }
    })
    Promise.all(promises).then(data => {
      setReducer(data)
    })
  } else {
    setReducer(Menu.map(comp => {
        return {
          id: comp.id,
          state: {}
        }
      }))
  }
},[user])


  return (<>
    <link rel="stylesheet" href="/css/dashboard.css"/>
      {user.access? <React.Fragment>
          <Navbar user={user} setUser={setUser}/>
          <SideBar Menu={Menu}/>
        </React.Fragment> : <Navigate to="/dashboard/login"/>}
      <div className='container'>
      <GlobalState.Provider value={{reducer, setReducer}}>
        <Routes>
            <Route path="/dashboard" element={!user.access? <Navigate to="/dashboard/login"/> 
              : <Inicio GlobalState={GlobalState}/>}/>
            <Route path="/dashboard/payments" element={!user.access? <Navigate to="/dashboard/login"/> 
              : <Payments id={5} GlobalState={GlobalState}/>}/>
            <Route path="/dashboard/payments/metrics" element={!user.access? <Navigate to="/dashboard/login"/>
              : <PaymentMetrics id={5} GlobalState={GlobalState}/>}/>
            <Route path="/dashboard/payments/:id" element={!user.access? <Navigate to="/dashboard/login"/>
              : <PaymentDetail/>}/>
            <Route path="/dashboard/products" element={!user.access? <Navigate to="/dashboard/login"/> 
              : <Products id={3} GlobalState={GlobalState}/>}/>
            <Route path="/dashboard/products/create" element={!user.access? <Navigate to="/dashboard/login"/> 
              : <ProductCreate id={3} GlobalState={GlobalState}/>}/>
            <Route path="/dashboard/products/:id" element={!user.access? <Navigate to="/dashboard/login"/> 
              : <ProductDetail />}/>
            <Route path="/dashboard/users" element={!user.access? <Navigate to="/dashboard/login"/> 
              : <Users id={2} GlobalState={GlobalState}/>}/>
            <Route path="/dashboard/users/:id" element={!user.access? <Navigate to="/dashboard/login"/> 
            : <DetailUsers/>}/>
          <Route path="/dashboard/login" element={<Login user={user} setUser={setUser}/>}/>
          <Route path="*" element={<Error/>}/>
        </Routes>
      </GlobalState.Provider> 
    </div>
    </>
  )
}

export default App
