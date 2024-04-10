import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import fetchData from '../../utils/fetchData'
import imagenPublic from "../../../public/images/blank-profile-picture-973460_1280.png"

export default function DetailUsers(){

    const [usuario, setUsuario] = useState({})

    const {id} = useParams()

        useEffect(()=> {
        fetchData(`/api/users/${id}`)
        .then((data) => {
            if(data){
                
                setUsuario(data)
            }
        })
    },[])


return(
<>
<link rel="stylesheet" href="/css/userDetail.css"></link>

    <h2>{usuario.nombre} {usuario.apellido}</h2>
    <h3>Usuario creado: {usuario.created_at}</h3>
    {usuario.admin === 0? <h3>Usuario administrador</h3> : <h3>Usuario no administrador</h3>}
    { usuario.imagen != "" 
    ?<img src={usuario.imagen} className="imgProfile" alt={`${usuario.nombre.slice(0,1)+usuario.apellido.slice(0,1)}`}/>
    :<img src={imagenPublic} className="imgProfile" />

    }
    <div id="info-user"> 
    <h4>ID Usuario: {usuario.id}</h4>
    <h4>Email: {usuario.email}</h4>
    <h4>Nombre de usuario: {usuario.userName}</h4>
    <h4>Fecha de nacimiento: {usuario.fechaNacimiento}</h4>
    </div>

    <div id="otros-datos">
    <h4>provincia: {usuario.provincia}</h4>
    <h4>localidad: {usuario.localidad} </h4>
    <h4>calle: {usuario.calle} </h4>
    <h4>numero de calle: {usuario.calleNumero}</h4>
    <h4>departamento: {usuario.departamento}</h4>
    <h4>piso: {usuario.piso}</h4>
    

    </div>


</>
)




}