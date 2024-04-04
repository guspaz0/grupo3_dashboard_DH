import React,{useState, useEffect, useContext } from 'react'
import LastProduct from './LastProduct'
import PaymentMetrics from '../Payment/PaymentMetrics'
import Loading from '../Loading'
import PropTypes from 'prop-types'

function Inicio(props) {

    const {reducer, setReducer} = useContext(props.GlobalState)

    const Productos = reducer?.find(state => state.id == 3).state
    const Usuarios = reducer?.find(state => state.id == 2).state

    return (<>
        <h3>Inicio</h3>
        {Productos? 
        <div className='paneles'>
            <div className='panel'>
                <p>Total de productos</p>
                {Productos.count}
            </div>
            <div className='panel'>
                <p>Total de Usuarios</p>
                {Usuarios? Usuarios.count : null}
            </div>
            <div className='panel'>
                <p>Total de Categorias</p>
                {Productos.countByCategory? Object.keys(Productos.countByCategory).length : null}
            </div>
            {Productos.products && <LastProduct products={Productos.products}/>}
            {Productos.countByCategory && <div className='panel categories'>
                <p>Recuento de productos por Categoria</p>
                {Object.keys(Productos.countByCategory).map((category) => <span className='category' key={category}>
                    <b>{category}:</b><span>{Productos.countByCategory[category]}</span>
                </span>
                )}
            </div>}
            <PaymentMetrics id={5} GlobalState={props.GlobalState}/>
        </div>
        : <div>
            Cargando...
            <Loading/>
        </div>}
        </>
    )
}

Inicio.propTypes = {
    id: PropTypes.number,
    GlobalState: PropTypes.object
}

Inicio.defaultProps = {
    id: 0,
    GlobalState: {
        reducer: [
            {id: 2, state: {}},
            {id: 3, state: {
                count: 0,
                products: [],
                countByCategory: {}}}
        ],
        setReducer: () => {}
    }
}

export default Inicio
