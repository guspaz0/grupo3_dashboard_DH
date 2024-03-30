import React from 'react';
import {NavLink} from 'react-router-dom'


export default function SideBar({Menu}) {


    return (<>
    <link rel="stylesheet" href="/css/sidebar.css"/>
    <div className='sidebar sideMenu'>
        <b>Menu</b>
        <ul>
            {Menu.map(({id,name,route}) => <li key={id+name}><NavLink to={route? route : '/dashboard'}>{name}</NavLink></li>)}
        </ul>
    </div>
    </>
    )
}