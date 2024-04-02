import React,{useEffect, useState} from 'react'
import {useParams, Link} from 'react-router-dom'
import fetchData from '../../utils/fetchData'

function PaymentDetail() {

    const {id} = useParams()

    const [detail, setDetail] = useState()

    useEffect(()=> {
        fetchData(`/api/payment/${id}`)
        .then(data => {
            setDetail(data)
        }).catch(error => alert(error))
    },[id])

    return (
        <div className="detail">
        <link href="\css\payments.css" rel="stylesheet"/>
        {detail? <div>
            <Link to="/dashboard/payments" className="delete">X</Link>
            <span> 
                <b>Referencia</b><p>{detail.id}</p> 
            </span>
            <span>
                <b>Fecha</b><p>{new Date(detail.created_at).toLocaleString()}</p>
            </span>
            <span>
                <b>Total:</b><p className="number">{detail.total}</p>
            </span>
            <span>
                <b>Estado de pago:</b><i className={detail.status}>{detail.status}</i>
            </span>
            <span>
                <b>Usuario:</b>{detail.user.id}{detail.user.apellido}, {detail.user.nombre}
            </span>
            <table>
                <tbody>
                    <tr><th>Producto</th><th>Color</th><th>Cant</th><th>Precio</th><th>Subtotal</th></tr>
                    {detail.products.map(({ product, color, cantidad, precio }) => { return <tr key={product.id}>
                        <td><img className="product" src={product.images[0].pathName} alt="img"/>({product.id}){product.name}</td>
                        <td><i className="colorIcon" style={{ backgroundColor: color.name }}></i></td>
                        <td>{cantidad}</td>
                        <td className="number">{precio}</td>
                        <td><b className="number">{(cantidad*precio).toFixed(2)}</b></td>
                    </tr>})}
                </tbody>
            </table>
        </div>
        : null}
        </div>
    )
}

export default PaymentDetail
