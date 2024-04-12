import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import fetchData from '../../utils/fetchData'
import imagenPublic from "../../../public/images/blank-profile-picture-973460_1280.png"

export default function DetailUsers(){

    const [usuario, setUsuario] = useState()

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
<link rel="stylesheet" href="/css/userDetail.css"/>
{usuario?<>
    <h2>{usuario.nombre} {usuario.apellido}</h2>
    <span><b>Usuario creado:</b> {usuario.created_at}</span>
    {usuario.admin === 0? <h3>Usuario Administrador</h3> : <h3>Usuario Comun</h3>}
    {usuario.imagen !== ""? <img src={usuario.imagen} className="imgProfile" alt={`${usuario.nombre.slice(0,1)+usuario.apellido.slice(0,1)}`}/>
    : <img src={imagenPublic} className="imgProfile" />

    }
    <div id="info-user"> 
    <span><b>ID Usuario:</b><p> {usuario.id}</p></span>
    <span><b>Email:</b><p> {usuario.email}</p></span>
    <span><b>Nombre de usuario:</b><p> {usuario.userName}</p></span>
    <span><b>Fecha de nacimiento:</b><p> {usuario.fechaNacimiento}</p></span>
    </div>

    <div id="otros-datos">
    <span><b>Provincia:</b> <p>{usuario.provincia}</p></span>
    <span><b>Localidad:</b> <p>{usuario.localidad}</p></span>
    <span><b>Calle:</b><p> {usuario.calle}</p></span>
    <span><b>Numero de calle:</b><p>{usuario.calleNumero}</p></span>
    <span><b>Departamento:</b><p> {usuario.departamento}</p></span>
    <span><b>Piso:</b><p> {usuario.piso}</p></span>
    

    </div>
    </>
: <></>}

</>
)




}