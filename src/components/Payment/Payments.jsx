import React,{useEffect, useState, useContext} from 'react';
import {Link} from 'react-router-dom'
import LineChart from '../Charts/LineChart'
import fetchData from '../../utils/fetchData';
import PropTypes from 'prop-types'

function Payments(props) {

    const {reducer, setReducer} = useContext(props.GlobalState)

    const Selector = reducer.find(comp => comp.id == props.id).state

    const [form,setForm] = useState({
        desde: '2023-12-01',
        hasta: new Date(Date.now()+24 * 60 * 60 * 999).toISOString().split('T')[0],
        estado: 'completado',
    })

    function handleChange(e) {
        e.preventDefault()
        const {name,value} = e.target;
        setForm({...form, [name]: value})
    }

    function handleSubmit(e) {
        e.preventDefault()
        fetchData(`/api/payment?desde=${form.desde}&hasta=${form.hasta}&estado=${form.estado}`)
        .then(data => {
            setReducer([
                ...reducer.filter(comp => comp.id !== props.id),
                {id: props.id, state: {...Selector, ...data}}
            ])
        }).catch(error => alert(error.message))
    }

    return (
    <div className='containerData'>
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
                            <td><Link to={`/dashboard/payments/${id}`} className="button">{id}</Link></td>
                            <td className="number">{total}</td>
                            <td className={status}>{status}</td>
                            <td>{new Date(created_at).toLocaleString()}</td>
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

Payments.propTypes = {
    id: PropTypes.number,
    GlobalState: PropTypes.object
}

Payments.defaultProps = {
    id: 5,
    GlobalState: {
        reducer: [{id: 5, state: {}}],
        setReducer: ()=>{}
    }
}

export default Payments