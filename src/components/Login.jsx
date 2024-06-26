import React,{useEffect, useState} from 'react';
import { useNavigate } from 'react-router-dom';
import fetchData from '../utils/fetchData';
const {VITE_DB_HOST} = import.meta.env

function Login({user, setUser}) {

    const [logInfo,setLogInfo] = useState({
        email: '',
        password: ''
    })
    const [errors,setErrors] = useState({})

    function handleChange(e) {
        const {name,value} = e.target
        setLogInfo({...logInfo, [name]: value})
    }
    const navigate = useNavigate()
    async function handleLogin(e) {
        e.preventDefault()
        try {
            const response = await fetch(`http://${VITE_DB_HOST}/api/user/login`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(logInfo),
                credentials: "include"
            });
            const data = await response.json();
            if (response.status == 401 && Object.keys(data).length > 0) {
                setErrors({email: 'solo administradores'})
            } else {
                sessionStorage.setItem('token', JSON.stringify(data))
                fetchData(`/api/user/profile`).then(userData => {
                    setUser(userData)
                })
            }
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(()=> {
        if (user?.access) {
            navigate('/dashboard')
        }
    },[user])

    return (
    <div className="login-modal">
        <link rel="stylesheet" href="/css/login.css"/>
        <form id="formulario-login">
            <label htmlFor='username'><b>E-mail</b></label>
                <input className='validacionusername'
                    id="username" type="email" 
                    name="email" onChange={handleChange}
                    value={logInfo.email}
                />
            {errors.email && <small className='errors'>{errors.email}</small>}
            <label htmlFor='password'><b>Contraseña</b></label>
                <input className='validacionpassword' 
                    id="password" type="password" 
                    name="password" onChange={handleChange}
                    value={logInfo.password}
                />
            {errors.password && <small className='errors'>{errors.password.msg}</small>}
            <label htmlFor="recordame">Recordame</label>
            <input id="recordame" type="checkbox" name="recordame"/>

            <button id="loginboton" onClick={handleLogin}><b>LogIn</b></button>
        </form>
    </div>
    )
}

export default Login