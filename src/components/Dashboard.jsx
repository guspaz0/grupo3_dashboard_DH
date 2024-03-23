import React from 'react';
import SideBar from './SideBar';
//import Payments from './Payments';
import Navbar from './Navbar'

function Dashboard() {

    const [state, setState] = React.useState('')

    return (<>
    <h2>Dashboard</h2>
    <SideBar setState={setState}/>
    </>
    )
}

export default Dashboard