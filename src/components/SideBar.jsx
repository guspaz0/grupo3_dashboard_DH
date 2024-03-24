import React from 'react';
import {Link} from 'react-router-dom'
import Products from './Products';
import Users from './Users';
import Lastregisters from './Lastregisters';
import Payments from './Payments';

export default function SideBar({setState}) {

    const Menu = [
        {id: 0, name: 'Informe de Pagos', component: () => {return <Payments/>}},
        {id: 1, name: 'Usuarios', component: () => {return <Users />}},
        {id: 2, name: 'Productos',component: () => {return <Products/>}},
        {id: 3, name: 'Ultimos Registros',component: () => {return <Lastregisters />}},
        //{id: 4, active: false, name: 'Otros'}
    ]

    function handleMenu(e) {
        e.preventDefault()
        let state = Menu.find(el => el.id == e.target.value)
        setState(state.component())
    }


    return (<>
    <link rel="stylesheet" href="/css/sidebar.css"/>
    <div className='sidebar'>
        <h3>Menu</h3>
        <ul>
            {Menu.map(({id,name}) => <li key={id+name}><button value={id} onClick={handleMenu}>{name}</button></li>)}
        </ul>
    </div>
    </>
    )
}