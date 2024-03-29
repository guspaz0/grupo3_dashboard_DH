import React,{useState, useEffect} from 'react'
import LastProduct from './LastProduct'

function Inicio({props}) {

    const {id, reducer, setReducer} = props

    const Productos = reducer.find(state => state.id == 3).state
    const Usuarios = reducer.find(state => state.id == 2).state

    return (<>
        <h3>Inicio</h3>
        <div className='paneles'>
            <div className='panel'>
                <p>Total de productos</p>
                {Productos.count}
            </div>
            <div className='panel'>
                <p>Total de Usuarios</p>
                {Usuarios? Usuarios.length : null}
            </div>
            <div className='panel'>
                <p>Total de Categorias</p>
                {Productos.countByCategory? Object.keys(Productos.countByCategory).length : null}
            </div>
        </div>
        {Productos?.products && <LastProduct products={Productos.products}/>}
        </>
    )
}

export default Inicio
