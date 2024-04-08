import React,{useState, useEffect } from 'react'
import LastProduct from './LastProduct'
import PaymentMetrics from '../Payment/PaymentMetrics'
import Loading from '../Loading'
import PropTypes from 'prop-types'
import fetchData from '../../utils/fetchData'

function Inicio(props) {

    const [state, setState] = useState()

    const Productos = state?.find(state => state.id == 3).state
    const Usuarios = state?.find(state => state.id == 2).state

    useEffect(()=> {
        const promises = [
            new Promise(resolve => resolve(fetchData(`/api/users?key=allUsers`)))
                .then(data => {return {id: 2, state: data}}),
            new Promise(resolve => resolve(fetchData(`/api/products`)))
                .then(data => {return {id: 3, state: data}})
        ]
        Promise.all(promises).then(data => {
            setState(data)
        })
    },[])

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
            <PaymentMetrics />
        </div>
        : <div>
            Cargando...
            <Loading/>
        </div>}
        </>
    )
}

Inicio.propTypes = {

}

Inicio.defaultProps = {

}

export default Inicio
