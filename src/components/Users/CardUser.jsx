import React from 'react';
import { Link } from 'react-router-dom';
import './CardUser.css'

function CardUser({Usuario}) {
  return (
    <>
    {Usuario?.map((element, index) => ( 
      <div className='card-user' key={index}>
        <div id="linea-frontal-card">
        <h3>ID de usuario: {element.id}</h3>
        <a href="#">X</a>
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
