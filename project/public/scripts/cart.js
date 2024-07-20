const host = window.location.host
const cartascart = document.querySelectorAll(".cartascart")

let productosCarrito = []
const body = document.querySelector("body")


cartascart.forEach((e) => {
   
    //obtener id productos y del color
    const ids = e.id.split("-")
    const idProducto = parseInt(ids[1])
    const idColor = parseInt(ids[2])
    const sumar = document.querySelector(`#${e.id} #sumar`)
    const restar = document.querySelector(`#${e.id} #restar`)
    const priceIndividual = parseFloat(document.querySelector(`#${e.id} #precio`).textContent)
    const subTotal = document.querySelector(`#${e.id} #subtotalproduct`) 
    const count = document.querySelector(`#${e.id} #cantidad`).value
    const totalCompleto = document.querySelector("#subtotalfinal")
    const stock = document.querySelector(`#${e.id} #tdcolors`)
    const stockValue = document.querySelector(`#${e.id} #tdcolors`).textContent.split(" ")[1]
    
    
     let producto = {
        product_id: idProducto,
        precio: priceIndividual,
        color_id: idColor,
        cantidad: parseInt(count)
    };

    productosCarrito.push(producto)

   
  
    if(parseInt(count) == 1){
        restar.disabled = true
    }

    if(parseInt(count) == parseInt(stockValue)){
        sumar.disabled = true
        stock.style.color = "red"
    }

    sumar.addEventListener("click", () => {
    
        const cantidad = document.querySelector(`#${e.id} #cantidad`).value
        const precioindividual = parseFloat(document.querySelector(`#${e.id} #precio`).textContent)
        let subTotalSuma = parseFloat(subTotal.textContent) + precioindividual 
        subTotal.textContent = subTotalSuma.toFixed(2)
        
        if(cantidad > 1){
            restar.disabled = false
        }

        
        const cantidadfinal = parseInt(document.querySelector(`#cantidadTotal`).textContent)
        const sumacantidad = cantidadfinal + 1
        document.querySelector(`#cantidadTotal`).textContent = sumacantidad
        

        const precioFinal = parseFloat(document.querySelector("#precioSubTotal").textContent)
        const sumaPrecioFinal = precioFinal + precioindividual
        document.querySelector("#precioSubTotal").textContent = sumaPrecioFinal.toFixed(2)
        totalCompleto.textContent = sumaPrecioFinal.toFixed(2)

        if(cantidad == stockValue){
            sumar.disabled = true;
            stock.style.color = "red"
        }

        productosCarrito.forEach(element =>{
            element.color_id == idColor ? element.cantidad = parseInt(cantidad) : "";
        })
        
    })
    
    restar.addEventListener("click", (element) => {
  
        const cantidad = document.querySelector(`#${e.id} #cantidad`).value
        const precioindividual = parseFloat(document.querySelector(`#${e.id} #precio`).textContent)
        let subTotalresta = parseFloat(subTotal.textContent) - precioindividual 
        subTotal.textContent = subTotalresta.toFixed(2) 
        
        if(parseInt(cantidad) == 1){
            restar.disabled = true
        }

        const cantidadfinal = parseInt(document.querySelector(`#cantidadTotal`).textContent)
        const sumacantidad = cantidadfinal - 1
        document.querySelector(`#cantidadTotal`).textContent = sumacantidad

        const precioFinal = parseFloat(document.querySelector("#precioSubTotal").textContent)
        const restaPrecioFinal = precioFinal - precioindividual
        document.querySelector("#precioSubTotal").textContent = restaPrecioFinal.toFixed(2)
        totalCompleto.textContent = restaPrecioFinal.toFixed(2)

        if(parseInt(cantidad) < parseInt(stockValue)){
            sumar.disabled = false;
            stock.style.color = "black"
        }

        productosCarrito.forEach(element =>{
            element.color_id == idColor ? element.cantidad = parseInt(cantidad) : "";
        })

    })
 
})


function eliminarProducto(id, color) {
    const popup = document.createElement('span');
    popup.classList.add('popupscreen');
    popup.innerHTML = `
        <div class="popUps" id="popUpDetailLogin">
            <h3>¿Estás seguro de que deseas eliminar este producto del carrito?</h3>
            <div class="botonPopup">
                <a onclick="deleted('${id}','${color}')">Aceptar</a>
                <a onclick="popUpoOff()">Cancelar</a>
            </div>  
        </div>
    `;
    body.appendChild(popup);
}


 

function deleted(id, color){ 
    const totals = document.querySelector("#precioSubTotal").textContent
  
        fetch(`/users/cart/${id}`, {
            method: 'delete',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                color: color
            })
        })
        .then(response => {

            if (!response.ok) {
                throw new Error(`Error al eliminar el producto: ${response.status}`);
            }
            if(response.status === 201){
            
               const productRow = document.getElementById(`product-${id}-${color}`);
               const subTotal = document.querySelector(`#product-${id}-${color} #subtotalproduct`).textContent
               const cantidad = document.querySelector(`#product-${id}-${color} #cantidad`).value
               const total = document.querySelector("#precioSubTotal")
               const cantidadTotal = document.querySelector("#cantidadTotal")
               const totalesCompleto = document.querySelector("#subtotalfinal")
            
               if (productRow) {
                   productRow.remove();
                   const newTotal = parseFloat(total.textContent) - parseFloat(subTotal);
                   total.textContent = newTotal.toFixed(2);
                   totalesCompleto.textContent = newTotal.toFixed(2);
                   cantidadTotal.textContent -= cantidad;
                   
                   productosCarrito = productosCarrito.filter((element)=>{
                   
                    return element.product_id !== parseInt(id) || element.color_id !== parseInt(color);

                   })
                   popUpoOff()
               }
            }
        })
        .catch(error => {
            console.error('Error al eliminar el producto:', error);
        });
    }

function prefinalizacion(id){
    if (productosCarrito.length == 0) {
        popUpRedirect('Tu carrito esta vacio, te vamos a redirigir a la seccion Productos', 5, '/products')
    }else{

    const popup = document.createElement('span');
    popup.classList.add('popupscreen');
    popup.innerHTML = `
        <div class="popUps" id="popUpDetailLogin">
            <h2>¡Ya casi!</h2>
            <h3>¿Estás listo para comprar o prefieres hacer alguna modificación?</h3>
            <div class="botonPopup">
                <a onclick="finalizarCompra('${id}')">Finalizar</a>
                <a onclick="popUpoOff()">Modificar</a>
            </div>  
        </div>
    `;
    body.appendChild(popup);
    }
}    


function finalizarCompra(id){
    
    const envio = document.querySelector('#calcularEnvio input:checked').value

    if (productosCarrito.length == 0) {
        popUpRedirect('Tu carrito esta vacio, te vamos a redirigir a la seccion Productos', 5, '/products')
    } else {
        let carrito = {
            idUser: parseInt(id), 
            products: productosCarrito,
            envio: envio == "true" ? true : false,
            status: "enproceso"
        }
        fetch(`http://${host}/api/payment`,{
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(carrito)
            }).then(res => res.json())
            .then(data => {
                popUpRedirect('Tu pedido fue enviado y se encuentra en proceso, contactate con el vendedor para pactar la entrega', 6, '/users/profile')
            })
    }
}

function popUpRedirect(message, second, endpoint) {
    const popup = document.createElement('span');
    popup.classList.add('popupscreen');
    
    popup.innerHTML = `
        <div class="popUps" id="popUpDetailLogin">
            <h3>${message}</h3>
            <div class="botonPopup">
                <p>Redirigiendote en <b id="counter"><b> segundos ...</p>
            </div>  
        </div>
    `;
    body.appendChild(popup);
    startTimerRedirect(second, endpoint)
}


function startTimerRedirect(seconds,endpoint) {
    const TIME_LIMIT = seconds
    let timePassed = 0
    let timeLeft;
    timerInterval = setInterval(() => {
        
        timePassed = timePassed += 1;
        timeLeft = TIME_LIMIT - timePassed;
        
        document.getElementById("counter").innerHTML = timeLeft;
        if (timePassed == TIME_LIMIT) {
            window.location = `http://${host}${endpoint}`
        }
    }, 1000);
}


function popUpoOff(){
    
    const elementosPopup = document.querySelector('.popupscreen');
    
    body.removeChild(elementosPopup);
    
}