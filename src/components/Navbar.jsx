import React,{useState,useEffect} from "react";
import {Link} from 'react-router-dom'
import LogoLargo from '/images/logo-largo.png'; 

export default function Navbar({user, setUser}){

    useEffect(()=> {

    },[])

    function handleLogout(e) {
        e.preventDefault()
        sessionStorage.clear()
        setUser({access: false})
    }

    return(
        <nav >
            <span className="barrasuperior">
                <img className="logoLargo" src={LogoLargo} alt="logo-largo.png"/>
                {user?.hasOwnProperty('access') && user.access? 
                    <span className="loginNavbar">
                        <img id="userImg" src={user.imagen} alt=""/>
                        <p>Hola, {user.nombre}</p>
                        <button onClick={handleLogout}>Cerrar Sesion</button>
                    </span>
                : <span className="loginNavbar">
                    <button onClick={(e)=> e.preventDefault()}><Link to="/dashboard/login">Login</Link></button>
                </span>    
                }
            </span>
            <hr></hr>
        </nav>
        
    )
}