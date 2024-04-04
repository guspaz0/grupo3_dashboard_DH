import React,{useContext} from 'react';
import CardUser from './CardUser';
import "./Users.css"

function Users(props) {

  const {reducer, setReducer } = useContext(props.GlobalState)

  const allUsers = reducer.filter((elemento) => elemento.id === props.id);

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
