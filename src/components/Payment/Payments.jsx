import React,{useEffect, useState} from 'react';
import LineChart from '../Charts/LineChart'
import PaymentDetail from './PaymentDetail';
const {VITE_DB_HOST} = import.meta.env

function Payments({props}) {

    let {id, reducer, setReducer} = props

    const Selector = reducer.find(comp => comp.id == id).state

    const [form,setForm] = useState({
        desde: '2023-12-01',
        hasta: '2023-12-31',
        estado: 'completado',
    })

    function handleChange(e) {
        e.preventDefault()
        const {name,value} = e.target;
        setForm({...form, [name]: value})
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault()
            const response = await fetch(`http://${VITE_DB_HOST}/api/payment?desde=${form.desde}&hasta=${form.hasta}&estado=${form.estado}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: "include",
            })
            const Data = await response.json()
            setReducer([
                ...reducer.filter(comp => comp.id !== id),
                {id, state: Data}
            ])
        } catch (error) {
            console.log(error)
        }
    }

    const [detail,setDetail] = useState()

    async function handleDetail(e) {
        e.preventDefault()
                try {
            const response = await fetch(`http://${VITE_DB_HOST}/api/payment/${e.target.value}`,{
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                credentials: 'include'
            })
            const data = await response.json()
            setDetail(data)
        } catch (error){
            console.log(error)
        }
        
    }

    return (
    <div className='containerData'>
        {detail && <PaymentDetail detail={detail} setDetail={setDetail}/>}
        <link href="\css\payments.css" rel="stylesheet"/>
        <h2>Informes de Pagos</h2>
        <form id="payment">
            <label htmlFor="fecha_desde">Desde:</label>
            <input id="fecha_desde" type="date" name="desde" value={form.desde} onChange={handleChange}/>
            <label htmlFor="fecha_hasta">Hasta:</label>
            <input id="fecha_hasta" type="date" name="hasta" value={form.hasta} onChange={handleChange}/>
            <label htmlFor="estado">Estado:</label>
            <select id="estado" name="estado" value={form.estado} onChange={handleChange}>
                <option disabled style={{width: '50px'}}>seleccionar</option>
                <option value="completado" className="completado">Completado</option>
                <option value="enproceso" className="enproceso">En Proceso</option>
                <option value="cancelado" className="cancelado">Cancelado</option>
                <option value="rechazado" className="rechazado">Rechazado</option>
            </select>
            <button type="submit" className="button" onClick={handleSubmit}>Enviar</button>
        </form>
        <div>
            <div className="lastsales">
                {Selector.data && <table>
                    <caption>Ultimos Pagos</caption>
                    <tbody>
                        <tr><th>Detalle</th><th>Total</th><th>Estado</th><th>Fecha</th></tr>
                        {Selector.data.map(({id,total,status,created_at,updated_at}) => <tr key={id}>
                            <td><button className="button" value={id} onClick={handleDetail}>{id}</button></td>
                            <td className="number">{total}</td>
                            <td className={status}>{status}</td>
                            <td>{created_at}</td>
                        </tr>)}
                    </tbody>
                </table>}
            </div>
            {Selector.grafico && <LineChart data={Selector.grafico} options={{legend: {display: false}}}/>}       
            <div className="topuser">
                
            </div>
        </div>

    </div>
    )
}

export default Payments