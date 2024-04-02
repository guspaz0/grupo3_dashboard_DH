import React from 'react'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import fetchData from '../../utils/fetchData'


function PaymentMetrics({id, reducer, setReducer}) {

    const Selector = reducer.find((comp) => comp.id == id)?.state
    
    return (
        <div>
            <h3>Metricas de ventas</h3>
            {Selector.totalSales? <div className='paneles'>
                <div className='panel'>
                    <p>Totales de Ventas</p>
                    <span><b>Cantidad productos:</b> {Selector.totalSales?.quantity}</span>
                    <span><b>Monto:</b> <span className='number'>{Number(Selector.totalSales?.totalAmount).toFixed(2)}</span></span>
                </div>
                <div className='panel'>
                    <p>Productos mas vendidos</p>
                    <span className='category'><b>Nombre</b><b>Cant/particip.</b></span>
                    {Selector.topProduct.map(({cantidadVendida, product})=> {
                        let {name, line, price, created_at, categories} = product
                        return <span key={name} className='category'>
                            <Link to={`/dashboard/product/${product.id}`}>({product.id}){name}</Link>
                            {cantidadVendida}/{(cantidadVendida/Selector.totalSales.quantity*100).toFixed(2)}%
                        </span>})}
                </div>
                <div className='panel'>
                    <p>Ultimos Productos vendidos</p>
                    <span className='category'><b className='non-flex'>Nombre</b><b>Cant</b><b>Pago</b></span>
                    {Selector.lastProductSales.map((prod,i) => {
                        let {product_id, name, price, cantidad, payment_id} = prod
                        return <article key={product_id+name} className='category'>
                            <Link className="non-flex" to={`/dashboard/product/${product_id}`}>{name}</Link>
                            <span >{cantidad}</span>
                            <Link to={`/dashboard/payments/${payment_id}`} className='button'>{payment_id}</Link>
                        </article>

                    })}
                </div>
            </div>
            : <></>
            }

    </div>
    )
}

export default PaymentMetrics
