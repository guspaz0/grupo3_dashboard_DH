import React from "react";

import LogoLargo from '/images/logo-largo.png'; 

export default function Navbar({user, setUser}){


    function handleLogout(e) {
        e.preventDefault()
        sessionStorage.clear()
        setUser({access: false})
    }

    return(
        <nav >
            <span className="barrasuperior">
            <h2>Dashboard</h2>
                <img className="logoLargo" src={LogoLargo} alt="logo-largo.png"/>
                {user?.hasOwnProperty('access') && user.access? 
                    <span className="loginNavbar">
                        <img className="perfil" id="userImg" src={user.imagen} alt={user.nombre.slice(0,1)+user.apellido.slice(0,1)}/>
                        Hola, {user.nombre}
                        <button onClick={handleLogout}>Cerrar Sesion</button>
                    </span>
                : <span className="loginNavbar">
                </span>    
                }
            </span>
            <hr></hr>
        </nav>
        
    )
}