import React, {useState,useContext} from 'react'
import { useEffect } from 'react'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'
import fetchData from '../../utils/fetchData'


function PaymentMetrics(props) {


    const [metrics, setMetrics] = useState()

    useEffect(()=> {
        fetchData(`/api/payment/metric`)
        .then(data => {
            setMetrics(data)
        })
    },[])
    
    return (
        <div>
            <h3>Metricas de ventas</h3>
            {metrics?.totalSales? <div className='paneles1'>
                <div className='panel'>
                    <p>Totales de Ventas</p>
                    <span><b>Cantidad productos:</b> {metrics?.totalSales?.quantity}</span>
                    <span><b>Monto:</b> <span className='number'>{Number(metrics?.totalSales?.totalAmount).toFixed(2)}</span></span>
                </div>
                <div className='panel'>
                    <p>Productos mas vendidos</p>
                    <span className='category'><b>Nombre</b><b>Cant/particip.</b></span>
                    {metrics?.topProduct.map(({cantidadVendida, product})=> {
                        let {name, line, price, created_at, categories} = product
                        return <span key={name} className='category'>
                            <Link to={`/dashboard/products/${product.id}`}>{name}</Link>
                            {cantidadVendida}/{(cantidadVendida/metrics.totalSales.quantity*100).toFixed(2)}%
                        </span>})}
                </div>
                <div className='panel'>
                    <p>Ultimos Productos vendidos</p>
                    <span className='category'><b className='non-flex'>Nombre</b><b>Cant</b><b>Pago</b></span>
                    {metrics.lastProductSales.map((prod,i) => {
                        let {product_id, name, price, cantidad, payment_id} = prod
                        return <article key={product_id+name} className='category'>
                            <Link className="non-flex" to={`/dashboard/products/${product_id}`}>{name}</Link>
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

PaymentMetrics.propTypes = {
    id: PropTypes.number,
    GlobalState: PropTypes.object
}

export default PaymentMetrics
