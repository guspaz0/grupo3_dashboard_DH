import React,{useState} from 'react';
import SideBar from './SideBar';
import Navbar from './Navbar';
import Products from './Products';
import Users from './Users';
import Lastregisters from './Lastregisters';
import Payments from './Payment/Payments';


function Dashboard({user, setUser}) {

    const [state, setState] = React.useState('')

    const Menu = [
        {id: 1, name: 'Informe de Pagos', component: (props) => {return <Payments props={props}/>}},
        {id: 2, name: 'Usuarios', component: (props) => {return <Users props={props}/>}},
        {id: 3, name: 'Productos',component: (props) => {return <Products props={props}/>}},
        {id: 4, name: 'Ultimos Registros',component: (props) => {return <Lastregisters props={props}/>}},
        //{id: 4, active: false, name: 'Otros'}
    ]

    const [reducer, setReducer] = useState(
        Menu.map(comp => {return {
            id: comp.id,
            state: {}
        }})
    )

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