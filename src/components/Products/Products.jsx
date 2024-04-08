import React,{useEffect, useState, useContext} from 'react'
import fetchData from '../../utils/fetchData';
import { Link } from 'react-router-dom';
import { GlobalState } from '../../App';

function Products() {
    
    const {reducer,setReducer} = useContext(GlobalState)

    const [Productos, setProductos] = useState()

    useEffect(()=> {
        fetchData(`/api/products`).then(data => {
            setProductos(data)
            setReducer([
                ...reducer.filter((comp)=> comp.id != 3),
                {id: 3, state: data}
            ])
        })
    },[])

    return (
        <>
            <link rel="stylesheet" href="/css/profile.css"/>
            <h3>Productos</h3>
            <section className='payments productsAdmin'>
                <span className='header'>
                    <b>Imagen</b><b>Nombre</b><b>Categoria</b><b>Precio</b><b>Stock</b><b></b>
                </span>
                    {Productos?.products.map((product) => {
                        const { name, description, line, categories, colors, images, price,
                            created_at, updated_at, deleted_at, favorites, detail } = product
                            {return <article key={name}>
                                <img src={images[0].pathName} alt={images[0].pathName}/>
                                <p><Link to={`/dashboard/products/${product.id}`}>{name}</Link></p>
                                <p>{categories.name}</p>
                                <p className='price number'>${price}</p>
                                <p>{colors.reduce((acum,{stock})=> acum+Number(stock),0)}</p>
                                <p></p>
                            </article>}
                        })
                    }
            </section>
        </>
    )
}

export default Products
