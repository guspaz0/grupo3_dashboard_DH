import React,{useEffect, useState} from 'react';
import SideBar from './SideBar';
import Navbar from './Navbar';
const {VITE_DB_HOST} = import.meta.env
import Products from './Products';
import Users from './Users';
import Lastregisters from './Lastregisters';
import Payments from './Payment/Payments';
import Inicio from './Inicio/Inicio';



function Dashboard({user, setUser}) {

    const [state, setState] = React.useState(1)

    const Menu = [
        {id: 1, name: 'Inicio', component: (props) => {return <Inicio props={props}/>}},
        {id: 2, name: 'Usuarios', component: (props) => {return <Users props={props}/>}, endpoint: '/api/users?key=allUsers'},
        {id: 3, name: 'Productos', component: (props) => {return <Products props={props}/>}, endpoint: '/api/products'},
        {id: 4, name: 'Ultimos Registros',component: (props) => {return <Lastregisters props={props}/>}},
        {id: 5, name: 'Informe de Pagos', component: (props) => {return <Payments props={props}/>}}
        
        //{id: 4, active: false, name: 'Otros'}
    ]

    const [reducer, setReducer] = useState(
        Menu.map(comp => {return {
            id: comp.id,
            state: {}
        }})
    )

    async function fetchData(endpoint) {
        try {
            const response = await fetch(`http://${VITE_DB_HOST}${endpoint}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: "include",
            })
            const data = await response.json()
            return data
        }catch(error) {
            console.log(error)
        }
    }


    useEffect(()=>{
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
    },[reducer])

    return (<>
    <Navbar user={user} setUser={setUser}/>
    <link rel="stylesheet" href="/css/dashboard.css"/>
    <div className='container'>
        <SideBar setState={setState} Menu={Menu}/>
        <section>
        {state? Menu.find(comp => comp.id == state).component({id: state, reducer, setReducer}) : null}
        </section>
    </div>
    </>
    )
}

export default Dashboard