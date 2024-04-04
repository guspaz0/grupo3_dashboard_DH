import React from 'react';
import CardUser from './CardUser';
import "./Users.css"

function Users({id, reducer, setReducer}) {

  const allUsers = reducer.filter((elemento) => elemento.id === id);

  const usuarios = allUsers[0].state.users
 
  return (
    <div >
      <h3>Usuarios</h3>
      <h4>total de usuarios {allUsers[0].state.count}</h4>
      <div id="cartas-contenedor">
      <CardUser Usuario={usuarios}/>
      </div>
    </div>
  );
}



export default Users;
