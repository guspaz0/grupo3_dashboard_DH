import React from 'react'
const { VITE_DB_HOST } = import.meta.env

function PaymentDetail({detail, setDetail}) {

    function handleClose(e) {
        e.preventDefault()
        setDetail(null)
    }

    return (
        <div className="detail">
        {detail? <div>
            <button className="delete" onClick={handleClose}>X</button>
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
