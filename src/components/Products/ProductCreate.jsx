import React,{useState, useContext} from 'react'
import { GlobalState } from '../../App.jsx'

function ProductCreate() {

  const {reducer} = useContext(GlobalState)
  const allProducts = reducer.find((p) => p.id == 3).state

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
    image: [''],
    price: 0,
  })

  function handleChange(e){
    const {name,value} = e.target
    setForm({...form, [name]: value})
  }

  function handleSubmit(e) {
    e.preventDefault()
    const { name, value } = e.target
  }


  return (
    <div>
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
                onChange={handleChange}>{form.description}
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
                    {allProducts.countByCategory.map((name) => 
                      <option key={name} value={name}>{name}</option>
                    )}
                </select>
            </label>
            {errors.category? 
                <small id="category" className="errors">{errors.category.msg}</small>
            : <></>}
            <fieldset className="container-colorinputs">
                <legend><b>Colores</b></legend>
            {form.colorStock.map(({color,stock},i) => { 
                  let background=`color:${color};`
                  return <div key={i+color}>
                        <input className={`c+${i}`} type="color" name="color" id="color" value={color} onChange={handleChange}/>
                        <span id={`c${i}`} style={background}></span>
                        {errors.color?
                            <small id="color" className="errors">{errors.color.msg}</small>
                        : <></> }
                        <label htmlFor="stock">Stock:</label>
                        <input type="number" name="stock" value={stock} className="number" onChange={handleChange}/>
                        {errors.stock?
                            <small id="stock" className="errors">{errors.stock.msg}</small>
                        : <></>}
                    </div>
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
                {form.files.length > 0?
                    form.files.map((el,i) => <span key={i+el.originalname}>
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
