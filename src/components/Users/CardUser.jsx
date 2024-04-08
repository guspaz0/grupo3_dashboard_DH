import React,{useState, useEffect} from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import fetchData from '../../utils/fetchData';
import './CardUser.css'

function CardUser({Usuario}) {

  const [user,setUser] = useState(Usuario)

  useEffect(()=> {
    if (Usuario != user) {
      setUser(Usuario)
    }
  },[Usuario])

  function handleDelete(e) {
    e.preventDefault()
    const {name,value} = e.target
    fetchData(`/api/user/${value}/delete`,{id: value}, 'DELETE')
    .then(data => {
      console.log(data)
    })
  }

  return (
    <>
    {user?.map((element, index) => ( 
      <div className='card-user' key={index}>
        <div id="linea-frontal-card">
        <h3>ID de usuario: {element.id}</h3>
        <button className='delete' onClick={handleDelete} value={element.id}>X</button>
        </div>
        <h3>Nombre: {element.name}</h3>
        <h3>Email: {element.email}</h3>
        <div id="boton">
        <Link to={`/dashboard/users/${element.id}`}>Detalle
        </Link>
        </div>
      </div>
    ))}
  </>
  );
}



export default CardUser;
