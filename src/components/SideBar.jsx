import React from 'react';
import {Link} from 'react-router-dom'


export default function SideBar({Menu}) {


    return (<>
    <link rel="stylesheet" href="/css/sidebar.css"/>
    <div className='sidebar sideMenu'>
        <b>Menu</b>
        <ul>
            {Menu.map(({id,name, route, sublist}) => {
            if (!sublist) return <li key={id}><Link to={route}>{name}</Link></li>
            else return <li key={id+name}>{name}
                    <ul>
                        {sublist.map((sub) => <li key={name+sub.name}><Link to={sub.route}>{sub.name}</Link></li>)}
                    </ul>
                </li>
            })}
        </ul>
    </div>
    </>
    )
}