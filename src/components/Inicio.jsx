import React from 'react'

function Inicio({props}) {

    const {id, reducer, setReducer} = props

    const Usuarios = reducer.find(state => state.id == 2).state
    const Productos = reducer.find(state => state.id == 3).state

    return (
        <div>
            <h3>Inicio</h3>
            <div>
                <b>Total de productos</b>
                {Productos.count}
            </div>
            <hr></hr>
            <div>
                <p><b>Total de Categorias</b>
                {Productos.countByCategory? Object.keys(Productos.countByCategory).length : null}
                </p>
            </div>

        </div>
    )
}

export default Inicio
