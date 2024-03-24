import React,{useEffect, useState} from 'react';

function Payments(props) {

    const [state,setState] = useState()

    const [form,setForm] = useState({
        desde: '',
        hasta: '',
        estado: '',
    })

    function handleChange(e) {
        e.preventDefault()
        const {name,value} = e.target;
        setForm({...form, [name]: value})
    }

    async function handleSubmit(e) {
        try {
            e.preventDefault()

        } catch (error) {
            console.log(error)
        }
    }

    return (
    <>
    <link href="\css\payments.css" rel="stylesheet"/>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/2.9.4/Chart.js"></script>
        <div className="lastsales">
            <table>
                <caption>Ultimos Pagos</caption>
                <tbody>
                    <tr><th>Detalle</th><th>Total</th><th>Estado</th><th>Fecha</th></tr>
                    <tr id="emptyRow"></tr>
                </tbody>
            </table>
        </div>
        <div>
            <h2>Informes de Pagos</h2>
            <form id="payment">
                <label htmlFor="fecha_desde">Desde:</label>
                <input id="fecha_desde" type="date" name="desde" />
                <label htmlFor="fecha_hasta">Hasta:</label>
                <input id="fecha_hasta" type="date" name="hasta" />
                <label htmlFor="estado">Estado:</label>
                <select id="estado" name="estado" required>
                    <option disabled selected value style={{width: '50px'}}>seleccionar</option>
                    <option value="completado" className="completado">Completado</option>
                    <option value="enproceso" className="enproceso">En Proceso</option>
                    <option value="cancelado" className="cancelado">Cancelado</option>
                    <option value="rechazado" className="rechazado">Rechazado</option>
                </select>
                <button type="submit" className="button" onClick={handleSubmit}>Enviar</button>
            </form>
            <div id="container">            
                <div className="saleschart">
                    <h3>Grafico Pagos</h3>
                    <canvas id="paymentChart" style={{width: '100%', maxWidth: '700px'}}></canvas>
                </div>
            </div>
            <div id="topuser">            
                <div className="topuser">
                    <canvas id="userChart" style={{width: '100%', maxWidth: '700px'}}></canvas>
                </div>
            </div>
        </div>
    </>
    )
}

export default Payments