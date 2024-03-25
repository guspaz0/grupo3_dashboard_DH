import React,{useState} from 'react';
import SideBar from './SideBar';

import Navbar from './Navbar';


function Dashboard({user, setUser}) {

    const [state, setState] = React.useState('')


    return (<>
    <Navbar user={user} setUser={setUser}/>
    <link rel="stylesheet" href="/css/dashboard.css"/>
    <div className='container'>
        <SideBar setState={setState}/>
        <section>
        {state? state: null}
        </section>
    </div>
    </>
    )
}

export default Dashboard