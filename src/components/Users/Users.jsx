import React,{useEffect, useState } from 'react';
import CardUser from './CardUser';
import fetchData from '../../utils/fetchData';
import "./Users.css"

function Users(props) {

  const [allUsers, setAllUsers] = useState()

  const usuarios = allUsers?.users

  useEffect(()=> {
    fetchData(`/api/users?key=allUsers`)
      .then(data => {
        setAllUsers(data)
    })
  },[])

  return (
    <div >
      <h3>Usuarios</h3>
      <h4>total de usuarios {allUsers?.count}</h4>
      <div id="cartas-contenedor">
      <CardUser Usuario={usuarios}/>
      </div>
    </div>
  );
}


export default Users;
