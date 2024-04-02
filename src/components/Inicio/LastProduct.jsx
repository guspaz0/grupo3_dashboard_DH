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
            <b>Nombre</b>
            <Link to={`/dashboard/product/${id}`}>{name}</Link>
          </span>
          <span>
            <b>Precio</b>
            <span className="precio number">${price}</span>
          </span>
          <span>
            <b>Categ</b>
            <span>{categories.name}</span>
          </span>
          <span>
            <b>Cant</b>
            <span>
              {colors.reduce((acum, {stock}) => acum+Number(stock),0)}
            </span>
          </span>
      </article>
    </div>
  )
}

export default LastProduct
