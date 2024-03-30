import React,{useState, useEffect} from 'react'
import { Link } from 'react-router-dom';


function LastProduct({products}) {

  const lastProduct = products?.find(({created_at}) => Date.parse(created_at) == Math.max(...products.map(p => Date.parse(p.created_at))))

  const {id, name, description, line, categories, colors, images, price, created_at, update_at, deleted_at, favorites, detail } = lastProduct

  return (
    <div className='panel'>
      <p>Ultimo Producto creado</p>
      <article className='producto'>
          {images? <img className="imagenes" src={images[0].pathName} alt={images[0].pathName}/> : <></>}
          <span>
            <b className="tittled">Nombre:</b> {name}
          </span>
          <span className="precio number">
            <b>Precio:</b> ${price}
          </span>
          <span>
            <b>Categoria:</b> {categories.name}
          
          </span>
          <span>
            <b>Cantidad:</b> {colors.reduce((acum, {stock}) => acum+Number(stock),0)}
          </span>
          <Link to={`/dashboard/product/${id}`}>Detalle</Link>
      </article>
    </div>
  )
}

export default LastProduct
