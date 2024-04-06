import React,{useEffect, useState, useContext} from 'react'
import {useParams, Link, useNavigate} from 'react-router-dom'
import fetchData from '../../utils/fetchData'
import { GlobalState } from '../../App'
import { popUpTimer } from '../../utils/popUps'

function PaymentDetail() {

    const {reducer, setReducer} = useContext(GlobalState)

    const {id} = useParams()
    const navigate = useNavigate()

    const [detail, setDetail] = useState()
    const [form,setForm] = useState()

    useEffect(()=> {
        fetchData(`/api/payment/${id}`)
        .then(data => {
            setDetail(data)
            setForm({
                id: data.id,
                status: data.status
            })
        }).catch(error => alert(error))
    },[id])



    function handleChange(e) {
        const {name,value} = e.target
        setForm({...form, [name]: value})
    }

    function handleEdit(e) {
        e.preventDefault()
        if (form.status != detail.status) {
            fetchData(`/api/payment`,{
                id: detail.id,
                status: form.status
            },'PUT').then(data => {
                if (data.error) {
                    popUpTimer(data.message, 6)
                } else {
                    setDetail(data)
                }
            })
        }
    }


    return (
        <div className="detail">
        <link href="\css\payments.css" rel="stylesheet"/>
        <link href="\css\popups.css" rel="stylesheet"/>
        {detail? <div>
            <button onClick={() => navigate(-1)}className="delete">Volver</button>
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
                <form id="editPayment">
                    <label htmlFor='status'>editar estado:</label>
                    <select id="status" name='status' value={form.status} onChange={handleChange}>
                        <option value="completado">Completado</option>
                        <option value="enproceso">En proceso</option>
                        <option value="cancelado">Cancelado</option>
                        <option value="rechazado">Rechazado</option>
                    </select>
                    <button onClick={handleEdit}>Editar</button>
                </form>
            </span>
            <span>
                <b>Usuario:</b>({detail.user?.id}){detail.user?.apellido}, {detail.user?.nombre}
            </span>
            <table>
                <tbody>
                    <tr><th>Producto</th><th>Color</th><th>Cant</th><th>Precio</th><th>Subtotal</th></tr>
                    {detail.products.map(({ product, color, cantidad, precio }) => { return <tr key={product.id}>
                        <td><img className="product" src={product.images[0].pathName} alt="img"/><Link to={`/dashboard/products/${product.id}`}>{product.name}</Link></td>
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
