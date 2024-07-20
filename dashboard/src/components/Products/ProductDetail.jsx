import React, {useState, useEffect} from 'react'
import {useParams} from 'react-router-dom'
import fetchData from '../../utils/fetchData'

function ProductDetail() {

    const [product,setProduct] = useState({
        id: '', name: '', description: '', line: '', categories: '', colors: [], images: [],
        price: '', created_at: '', updated_at: '', deleted_at: '', favorites: []
    })

    const {id} = useParams()

    useEffect(()=> {
        fetchData(`/api/products/${id}`)
        .then((data) => {
            if (product != data) {
                setProduct(data)
            }
        })
    },[id])

    const { name, description, line, categories, colors, images, price, created_at, updated_at, deleted_at, favorites, detail } = product
    return (<>
    {product? 
        <div className='panel'>
        <link href="/css/detalle.css" rel="stylesheet"/>
        <p>Detalle de Producto</p>
        <article>
        <div className="imagenes">
            {images?.map((img) => <img key={img.id} src={img.pathName} alt={img.pathName}/>)}
        </div>
        <section className="carousel">
            {images?.map((img, i) => <>
                <span id={`item-${i+1}`}></span>
                <div className={`carousel-item item-${i+1}`} style={{backgroundImage: `url(${img.pathName})`}}>
                {i+1 == 1? <a href={`#item-${images.length}`} className="arrow-prev arrow"></a>
                : <a href={`#item-${i}`} className="arrow-prev arrow"></a>}
                {i+1 == images.length? <a href="#item-1" className="arrow-next arrow"></a>
                :<a href={`#item-${i+2}`} className="arrow-prev arrow"></a>}
                </div>
            </>)}
        </section>

            <div className='form-detalle'>
                <h2 className="tittled">{name}
                    <span className="containerheart">
                        <div id="heart" className="heart">
                            {favorites?.some(prod => prod.id == id)?
                            <div className=""></div>
                            : <div className="unheart"></div>}
                        </div>
                    </span>
                </h2>
                <h3 className="precio">{price}</h3>
                <h5>cantidad: {colors.reduce((acum, color) => acum+Number(color.stock),0)}</h5>
                <span className="color"> <p>Color:</p>
                {colors.map(({stock, color},i) => <span key={i}>
                    <i className="colorIcon" style={{ backgroundColor: color.hex}}></i>
                    <p>{color.name_es}</p>
                    <small>Stock: {stock}</small>
                    </span>)}
                </span>
            </div>
        </article>
        <div className="contenedordescription">
            <h3>Descripcion:</h3>
            <p>{description}</p> 
        </div>
    </div>
    : <></>}
    </>
    )
}

export default ProductDetail
