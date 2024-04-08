import React,{useState, useContext, useEffect} from 'react'
import { GlobalState } from '../../App.jsx'
import fetchData from '../../utils/fetchData.js'
import ntc from '../../utils/ntc.js'

function ProductCreate() {

  const {reducer, setReducer} = useContext(GlobalState)
  const allProducts = reducer.find(p => p.id == 3).state

  useEffect(()=> {
    if (Object.keys(allProducts).length == 0) {
        fetchData(`/api/products`)
        .then(data => {
            setReducer([
                ...reducer.filter(e => e.id != 3),
                {id: 3, state: data}
            ])}
        )
    }
  },[])

  const [errors, setErrors] = useState({})

  const [body, setBody] = useState({})

  const [form,setForm] = useState({
    name: '',
    description: '',
    line: '',
    category: '',
    colorStock: [
      {
        color: 'white',
        stock: 1
      }
    ],
    image: [],
    price: 0,
  })

  function handleChange(e){
    const {name,value} = e.target
    if (name == "color") {
        const closestHex = ntc.name(value)
        setForm({...form, colorStock: [
            ...colorStock.filter(c => c)
        ]})
    } else {
        setForm({...form, [name]: value})
    }

  }

  function handleSubmit(e) {
    e.preventDefault()
    const { name, value } = e.target
  }


  return (
    <div>
        <link href="\css\createForm.css" rel="stylesheet"/>
    <span className="tituloCreate">
            <p>Creacion de Producto</p>
        </span>
        <form className="form-producto">
            <label htmlFor="name"><b>Nombre:</b></label>
                <input className="inputForm" 
                id="name" 
                type="text" 
                name="name" 
                placeholder="Ingresar Nombre"
                value={form.body}
                onChange={handleChange}
                />
            {errors.name? 
                <small id="name" className="errors">{errors.name.msg}</small>
            : <></>}
            <label htmlFor="description"><b>Descripcion:</b></label>
            <textarea 
                id="description" 
                name="description"
                placeholder="Ingresar descripcion..."
                value={form.description}
                onChange={handleChange}>
            </textarea>
            {errors.description? 
                <small id="description" className="errors">{errors.description.msg}</small>
            : <></>}
            <fieldset>
                <legend><b>Linea</b></legend>
                <label><input id="line" name="line" type="radio" value="sublimada" checked={body.line == "sublimada"} onChange={handleChange}/>Sublimada</label>
                <label><input id="line" name="line" type="radio" value="artesanal" checked={body.line == "artesanal"} onChange={handleChange}/>Artesanal</label>
              {errors.line? 
                    <small id="line" className="errors">{errors.line.msg}</small>
                : <></>}
            </fieldset>
            <label htmlFor="category"><b>Categoria:</b>
                <select id="category" name="category" value={form.category} onChange={handleChange}>
                    {allProducts.hasOwnProperty('countByCategory')? 
                    Object.keys(allProducts.countByCategory).map((name) => 
                        <option key={name} value={name}>{name}</option>
                    ) : <></>}
                </select>
            </label>
            {errors.category? 
                <small id="category" className="errors">{errors.category.msg}</small>
            : <></>}
            <fieldset className="container-colorinputs">
                <legend><b>Colores</b></legend>
            {form.colorStock.map(({color,stock},i) => { 
                return <fieldset key={i+color}>
                    <legend id={`c${i}`} style={{color: `${color}`}}>{color}</legend>
                        <input className={`c+${i}`} type="color" name="color" id={i} value={color} onChange={handleChange}/>
                        {errors.color?
                            <small id="color" className="errors">{errors.color.msg}</small>
                        : <></> }
                        <label htmlFor="stock">Stock:</label>
                        <input type="number" name="stock" value={stock} className="number" onChange={handleChange}/>
                        {errors.stock?
                            <small id="stock" className="errors">{errors.stock.msg}</small>
                        : <></>}
                    </fieldset>
            })}
                <span id="agregar" className="button">Agregar color</span>
            </fieldset>

            <label htmlFor="price">Precio:</label>
            <input className="inputForm number" 
                type="number"
                id="price" 
                name="price"
                step=".10"
                value={form.price}
                onChange={handleChange}
            />
            {errors.price?
                <small id="price" className="errors">{errors.price.msg}</small>
            : <></>}
            <fieldset>
                <legend><b>Imagenes</b></legend>
            <div className="inputform button-wrap">
                <label className="button" htmlFor="imageinput">Subir imagen</label>
                <input 
                    className="uploadFile"
                    type="file"
                    name="image"
                    id="imageinput"
                    accept="image/jpeg, image/png, image/jpg"
                    files={form.image}
                    multiple
                    onChange={handleChange}
                />
            </div>
            <span id="imageRender">
                {form.image.length > 0?
                    form.image.map((el,i) => <span key={i+el.originalname}>
                            <small>{`${el.originalname}, ${(el.size/1024).toFixed(2)}KB`}</small>
                            <input name="imageHold" type="hidden" value={el.path}/>
                            <img id="inValidation" src={el.path} alt={el.originalname}/>
                            <button id="deleteImage" className="deleteImage">Borrar</button>
                        </span>
                    )
                : <></>}
            </span>
            {errors.image?
                <small id="image" className="errors">{errors.image.msg}</small>
            : <></> }
        </fieldset>
            <button className="button" type="submit" onClick={handleSubmit}>Enviar</button>
        </form>
        <script src="\scripts\ntc.js"></script>
        <script src="\scripts\validacionProducto.js"></script>
        <script src="\scripts\colorValidator.js"></script>
    </div>
  )
}

export default ProductCreate
