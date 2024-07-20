const menu = document.querySelector("#menuburguer")
const imagen = document.querySelector(".barrasuperior a img").src
menu.addEventListener("click", ()=>{
    const body = document.querySelector("body")
    const login = document.querySelector(".loginNavbar button a").id
    const sitemenu = document.querySelectorAll(".site ul a").length
    const burgermenu = document.createElement('span')
    burgermenu.classList.add("burgermenu") 
    const menudiv = document.createElement("div")
    menudiv.id = "menu"
    menudiv.innerHTML = `
            <div id="Xboton">
                <img class="logoLargo" src="${imagen}" alt="La Tienda de Maria"/>
                <a  onclick="cerrarmenu()"><i class="fa-solid fa-x"></i></a>
            </div>
    `
    if(login == "ingresar"){
    
    menudiv.innerHTML +=`
    <div id="logindiv">
        <button>  
                <a  href="/users/login">Ingresá</a>
        </button>
    </div>
    `
    }
    else{
    menudiv.innerHTML +=`
    <div id="logindiv">
            <span>
                <a href="/cart"><i class="fa-solid fa-cart-shopping"></i></a>
                <a href="/users/profile"><i class="fa-solid fa-user"></i></a>
            </span>
            <button>
                <a id="cerrarsesion" href="/users/logout">Cerrar Sesión</a>
            </button>
     </div>`
    }
    if(sitemenu == 5){
    menudiv.innerHTML +=`
    <ul>
    <a href="/"><li>Inicio</li></a>
    <a href="/products"><li>Productos</li></a>
    <a href="/about"><li>Conocenos</li></a>
    <a href="/contacto"><li>Contacto</li></a>
    <a href="/autor"><li>Sobre Mi</li></a>
    </ul>
    `}
    else{
        menudiv.innerHTML +=`<ul>
    <a href="/"><li>Inicio</li></a>
    <a href="/products"><li>Productos</li></a>
    <a href="/about"><li>Conocenos</li></a>
    <a href="/contacto"><li>Contacto</li></a>
    <a href="/autor"><li>Sobre Mi</li></a>
    <a href="/dashboard"><li>Panel Administrador</li></a>
    </ul>`
}
    menudiv.innerHTML +=`
    <div class="redes">
        <a href="https://www.facebook.com/latienda.demaria.311" target="_blank"><i class="fa-brands fa-square-facebook"></i></a>
        <a href="https://instagram.com/latienda.demaria?igshid=NzZlODBkYWE4Ng==" target="_blank"><i class="fa-brands fa-square-instagram"></i></a>
        <a href="https://api.whatsapp.com/send?phone=5493855873879&text=" target="_blank"><i class="fa-brands fa-square-whatsapp"></i></a>
         <a href="mailto:Latiendademaria.ok@gmail.com" target="_blank"><i class="fa-solid fa-square-envelope"></i></a>       
    </div>
    `  
    burgermenu.appendChild(menudiv)
    body.appendChild(burgermenu)
    body.style.overflow = 'hidden';
})

function cerrarmenu(){
    const body = document.querySelector("body")
    const menu = document.querySelector(".burgermenu")

    body.removeChild(menu)
    body.style.overflow = '';
}
