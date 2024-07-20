const body = document.querySelector("body")
const nombre = localStorage.getItem('userName');

if(nombre){
    const mensaje = document.createElement("span")
    mensaje.classList.add("welcome")
    mensaje.innerHTML = `
    <div id="mensajewelcome">
    <h2> ¡Bienvenido ${nombre}! <h2> 
    <h4>Muchas gracias por elegirnos</h4>
    </div>
    `
    body.appendChild(mensaje)

    mensaje.addEventListener("click", ()=>{


    body.removeChild(mensaje)
    localStorage.removeItem('userName');
    
    
    })

}    
