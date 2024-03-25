import React from 'react';
import {Link} from 'react-router-dom'


export default function SideBar({setState, Menu}) {



    function handleMenu(e) {
        e.preventDefault()
        setState(+e.target.value)
    }


    return (<>
    <link rel="stylesheet" href="/css/sidebar.css"/>
    <div className='sidebar'>
        <b>Menu</b>
        <ul>
            {Menu.map(({id,name}) => <li key={id+name}><button value={id} onClick={handleMenu}>{name}</button></li>)}
        </ul>
    </div>
    </>
    )
}