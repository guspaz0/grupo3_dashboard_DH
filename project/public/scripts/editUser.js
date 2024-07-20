window.addEventListener("load", async function(){

let usuarios = await fetch("http://localhost:3001/api/usersregistro?key=allUsers")
.then(response => response.json())
.then(data => data)
const URL = window.location.href
const idUser = obtenerIdDesdeUrl(URL)
const day = currentDay()

let switchInput = {
nombre: false,
apellido: false,
fechaNacimiento: false,
provincias: false,
localidad: false,
codigoPostal: false,
streetnumber: false,
calle: false,
piso: false,
departamento: false,
email: false,
imagen: false

};

//ELEMENTOS
let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let email = document.querySelector("#email")
let nombre = document.querySelector("#nombre")
let apellido = document.querySelector("#apellido")
let inputImagen = document.querySelector("#imagen")
const iconoCheck = document.getElementById('iconoCheck');
const fechaNacimiento = document.querySelector('#fechaNacimiento')
let streetnumber = document.querySelector("#calleNumero")
let codigoPostal = document.querySelector("#codigoPostal")
const street = document.querySelector("#street")
const piso = document.querySelector("#buildingfloor")
const departamento = document.querySelector("#departamento")
//ERRORES
const errorNombre = document.querySelector("#errorNombre")
const errorApellido = document.querySelector("#errorApellido")
const errorEmail = document.querySelector("#errorEmail")
const errorImagen = document.querySelector("#errorImagen")
const errorFechaNacimiento = document.querySelector("#errorFechaNacimiento")
const errorCodigoPostal = document.querySelector("#errorCodigoPostal")
const errorStreetNumber = document.querySelector("#errorNumero")
const imagenPerfil = document.getElementById("imagen")
let submitButton = document.querySelector('input[type="submit"]')
const formulario = document.querySelector("form")
let fotoPerfil = document.querySelector("#imagenPerfil")



//ENCONTRAR USUARIO
let usuarioFind = findUser(usuarios, idUser);
for( elemento in usuarioFind){
    if(usuarioFind[elemento] == null){
        usuarioFind[elemento] = "";
    }
}

// SI TIENE IMAGEN
if(imagenPerfil && (imagenPerfil.value != undefined || imagenPerfil != "")){
    iconoCheck.style.display = "block"
}

//EVENTOS

submitButton.addEventListener('click', function(e) {
    e.preventDefault()
    let cambio = false;
    for(let elemento in switchInput){
        if(switchInput[elemento] == true){
            cambio = true
        }
     }
        if(cambio == false){
        window.history.back()}
        else if (Object.keys(errores).length > 0) {
            alert(`corregir los errores del formulario de ${Object.keys(errores).join(', ')}`)
        } else {
            formulario.submit()
        }
    
});

inputImagen.addEventListener("change", function (e){
        
        let file = e.target.files[0]
        if (file) {
          const reader = new FileReader();
            reader.onload = function(event) {
            fotoPerfil.src = event.target.result;
            }
                reader.readAsDataURL(file);
        } 
      
if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png"|| e.target.files[0].type === "image/jpg"){
    iconoCheck.style.display = 'block';
    errorImagen.textContent = "Imagen cambiada";
    errorImagen.style.display = "block"
    errorImagen.style.color = "green"
    errorImagen.style.fontSize = "15px"
    switchInput.imagen = true;

    }else{
       errorImagen.textContent = "La imagen tiene que ser formato .jpeg, .png, .jpg"
       errorImagen.style.display = "block"
       iconoCheck.style.display = 'none';
    }

    
    
});

nombre.addEventListener("input", function(e){
    

    if(e.target.value === ""){
     nombre.style.border = '2px solid red'
     errorNombre.textContent = "Este campo no puede estar vacio"
     errorNombre.style.display = 'block'
    }
    else if(e.target.value.length === 1){
     nombre.style.border = '2px solid red'
     errorNombre.textContent = "El nombre debe tener al menos 2 caracteres"
     errorNombre.style.display = 'block'

    }else{
        nombre.style.border = '2px solid green'
        errorNombre.style.display = 'none'

    }

    if(usuarioFind.nombre === e.target.value){
        switchInput.nombre = false;
    }
    else{
        switchInput.nombre = true;
    }
    
    
});

apellido.addEventListener("input", function(e){
    
    
    if(e.target.value === ""){
        apellido.style.border = '2px solid red'
        errorApellido.textContent = "Este campo no puede estar vacio"
     errorApellido.style.display = 'block'
    }
    else if(e.target.value.length === 1){
        apellido.style.border = '2px solid red'
     errorApellido.textContent = "El nombre debe tener al menos 2 caracteres"
     errorApellido.style.display = 'block'

    }else{
        apellido.style.border = '2px solid green'
        errorApellido.style.display = 'none'
    }
    
    if(usuarioFind.apellido === e.target.value){
        switchInput.apellido = false;
    } else {
        switchInput.apellido = true;
    }

});

fechaNacimiento.addEventListener("change", function(e){
         if(e.target.value === ""){
                fechaNacimiento.style.border = '2px solid red'
                errorFechaNacimiento.textContent = 'Debe completar este campo'
                errorFechaNacimiento.style.display = 'block'
               
            }
         else if(fechaFutura(day,e.target.value)){
                fechaNacimiento.style.border = '2px solid red'
                errorFechaNacimiento.textContent = 'No puede seleccionar una fecha en el futuro'
                errorFechaNacimiento.style.display = 'block'
            }
         else if(mayorEdad(day,e.target.value)){
                fechaNacimiento.style.border = '2px solid red'
                errorFechaNacimiento.textContent = 'Debes tener o ser mayor de 16 años'
                errorFechaNacimiento.style.display = 'block'
            }
          else if(aniospasado(day, e.target.value)){
                fechaNacimiento.style.border = '2px solid red'
                errorFechaNacimiento.textContent = 'No puede seleccionar un año tan en el pasado'
                errorFechaNacimiento.style.display = 'block'
            
        }
            else{
                fechaNacimiento.style.border = '2px solid green'
                errorFechaNacimiento.style.display = 'none'
            }

            if(usuarioFind.fechaNacimiento === e.target.value){
                switchInput.fechaNacimiento = false
                
            }
            else{
                switchInput.fechaNacimiento = true
            }
    
});


    const form = document.querySelector('form#formulario')

    if (!form.localidad.value) form.localidad.disabled = true
    if (form.provincia.value) form.localidad.disabled = false
    
    let errores = {}
    async function validateForm(input) {
        try {
            const {provincia, localidad} = document.querySelector('form#formulario')
            if (document.querySelector(`small#${input}`)) {
                document.querySelector(`small#${input}`).remove()
                document.querySelector(`input[name=${input}]`).style.border = 'none'
                delete errores[input]
            }
            if(form[input].value == usuarioFind[input]){
                switchInput[input] = false
            } else {
                switchInput[input] = true;
            }
            switch(input) {
                case 'provincia':
                    if (!provincia.value) {
                        errores.provincia = 'ingresar provincia'
                        break}
                    const {provincias} = await fetchProvincia(provincia.value)
                    if (provincias[0].nombre !== provincia.value) errores.provincia = 'la provincia ingresada no existe'
                    break
                case 'localidad':
                    if (errores.provincia) break
                    if (!localidad.value) {
                        errores.localidad = 'ingresar localidad'
                        break
                    }
                    const {localidades} = await fetchLocalidad(provincia.value, localidad.value)
                    if (!localidades.some(({nombre})=> nombre == localidad.value)) errores.localidad = 'seleccionar una localidad valida'
                    break
                default:
                    break
            }
        } catch (error) {
            console.log(error.message)
        }
    }
    
    form.provincia.oninput = async (e) => {
        if (e.target.value.length > 3) {
        try {
            form.localidad.disabled = true
            form.localidad.value = ""
            if (document.querySelector(`small#${e.target.name}`)) {
                document.querySelector(`small#${e.target.name}`).remove()
                e.target.style.border = 'none'
            }
            const data = await fetchProvincia(e.target.value)
            const {cantidad, provincias} = data
    
            const selectProvincia = document.createElement('select')
            selectProvincia.name = "idProvincia"
            selectProvincia.multiple = true
            selectProvincia.style.backgroundColor = '#B6E5DB'
            provincias.forEach((prov) => {
                const option = document.createElement('option')
                option.value = prov.id
                option.innerText = prov.nombre
                selectProvincia.appendChild(option)
            })
            selectProvincia.onchange = (s) => {
                let nombreProvincia = provincias.find(({id})=> id == s.target.value).nombre
                form.provincia.value = nombreProvincia
                form.localidad.disabled = false
                form.provincia.focus()
                form.provincia.blur()
                s.target.remove()
            }
            e.target.parentNode.appendChild(selectProvincia)
            selectProvincia.focus()
            selectProvincia.onblur = (s) => {
                s.target.remove()
            }
        } catch (error) {
            let errorhtml = `<small id="${e.target.name}" class="errors">Hubo un error al procesar la peticion</small>`
            e.target.parentNode.insertAdjacentHTML('beforebegin', errorhtml)
        }
    }
    }
    
    form.provincia.onblur = (e) => {
        validateForm(form.provincia.name)
        .then(() => {
            if (errores[form.provincia.name]) {
                e.target.style.border = '2px solid red'
                let errorhtml = `<small id="${e.target.name}" class="errors">${errores[e.target.name]}</small>`
                e.target.parentNode.insertAdjacentHTML('beforebegin', errorhtml)
            }
        })
    }
    
    form.localidad.oninput = async (e) => {
        if (e.target.value.length > 3) {
        try {
            if (document.querySelector(`small#${e.target.name}`)) {
                document.querySelector(`small#${e.target.name}`).remove()
                e.target.style.border = 'none'
            }
            const {provincias} = await fetchProvincia(form.provincia.value)
            const id = provincias[0]?.id
    
            const {localidades} = await fetchLocalidad(id,form.localidad.value)
    
            const selectLocalidad = document.createElement('select')
            selectLocalidad.name = "idLocalidad"
            selectLocalidad.multiple = true
            selectLocalidad.style.backgroundColor = '#B6E5DB'
            localidades.forEach((loc) => {
                const option = document.createElement('option')
                option.value = loc.id
                option.innerText = loc.nombre
                selectLocalidad.appendChild(option)
            })
            selectLocalidad.onchange = (s) => {
                let nombreLocalidad = localidades.find(({id})=> id == s.target.value).nombre
                form.localidad.value = nombreLocalidad
                form.localidad.focus()
                form.localidad.blur()
                s.target.remove()
            }
            e.target.parentNode.appendChild(selectLocalidad)
            selectLocalidad.focus()
            selectLocalidad.onblur = (s) => {
                s.target.remove()
            }
        } catch (error) {
            let errorhtml = `<small id="${e.target.name}" class="errors">Hubo un error al procesar la peticion</small>`
            e.target.parentNode.insertAdjacentHTML('beforebegin', errorhtml)
        }
    }
    }
    
    form.localidad.onblur = (e) => {
        validateForm(form.localidad.name).then(()=> {
            if (errores[form.localidad.name]) {
                e.target.style.border = '2px solid red'
                let errorhtml = `<small id="${e.target.name}" class="errors">${errores[e.target.name]}</small>`
                e.target.parentNode.insertAdjacentHTML('beforebegin', errorhtml)
            }
        })
    }
    
    async function fetchLocalidad(provincia,nombre) {
        try {
            //prop provincia es un numero de id
            //prop nombre es el nombre de la localidad
            const response = await fetch(`https://apis.datos.gob.ar/georef/api/localidades?provincia=${provincia}&campos=id,nombre&nombre=${nombre}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.log(error.message)
        }
    }
    
    async function fetchProvincia(nombre) {
        try {
            //prop nombre es el nombre de la provincia
            const response = await fetch(`https://apis.datos.gob.ar/georef/api/provincias?nombre=${nombre}`)
            const data = await response.json()
            return data
        } catch (error) {
            console.log(error.message)
        }
    }

    
codigoPostal.addEventListener("input", function (e) {
  
    if (isNaN(parseInt(e.target.value))) {
        codigoPostal.style.border = '2px solid red';
        errorCodigoPostal.textContent = 'Tiene que ingresar solo números';
        errorCodigoPostal.style.display = 'block';
    } else {
        codigoPostal.value = e.target.value === "" ? 0 : parseInt(e.target.value);
        codigoPostal.style.border = '2px solid green';
        errorCodigoPostal.style.display = 'none';
    }

    if(usuarioFind.codigoPostal == e.target.value){
        switchInput.codigoPostal = false
    }else{
        switchInput.codigoPostal = true;
    }


});

streetnumber.addEventListener("input", function (e) {
    
    if (isNaN(parseInt(e.target.value))) {
        streetnumber.style.border = '2px solid red';
        errorStreetNumber.textContent = 'Tiene que ingresar solo números';
        errorStreetNumber.style.display = 'block';
    } else {
        streetnumber.value = e.target.value === "" ? 0 : parseInt(e.target.value);
        streetnumber.style.border = '2px solid green';
        errorStreetNumber.style.display = 'none';
    }

    if(usuarioFind.calleNumero == e.target.value){
        switchInput.streetnumber = false
    }else{
        switchInput.streetnumber = true;
    }
});

email.addEventListener("input", function(e){
       
    if(e.target.value === ""){
        email.style.border = '2px solid red'
        errorEmail.textContent = "Este campo no puede estar vacio"
        errorEmail.style.display = 'block'
        
    }
    else if(!regex.test(e.target.value)){
        email.style.border = '2px solid red'
        errorEmail.textContent = "Debe ingresar un Email valido"
        errorEmail.style.display = 'block'
    }
    else if(usuarios.some(element => element.email === e.target.value && element.id !== idUser)){
        email.style.border = '2px solid red'
        errorEmail.textContent = "Este email ya esta registrado"
        errorEmail.style.display = 'block'
    }
    else{
        email.style.border = '2px solid green'
        errorEmail.style.display = 'none'
    }

    if(usuarioFind.email === e.target.value){
        switchInput.email = false
    }else{
        switchInput.email = true;
    }
});

street.addEventListener("input", function(e){

    if(usuarioFind.calle == e.target.value){
        switchInput.calle = false
    }else{
        switchInput.calle = true;
    }
})

piso.addEventListener("input", function(e){

    if(usuarioFind.piso == e.target.value){
        switchInput.piso = false
    }else{
        switchInput.piso = true;
    }
})

departamento.addEventListener("input", function(e){

    if(usuarioFind.departamento == e.target.value){
        switchInput.departamento = false
    }else{
        switchInput.departamento = true;
    }
})

document.getElementById("backButton").addEventListener("click", function(e) {
    e.preventDefault()
    window.history.back();
});



//FUNCIONES

    function currentDay(){

      const date = new Date()
      const year = date.getFullYear();
      let mes = date.getMonth() + 1; 
      let dia = date.getDate();
      
      return `${year}-${mes}-${dia}`

}

    function fechaFutura(hoy, value){
        let interruptor = 0
        const hoySplit = hoy.split("-") 
        const valueSplit = value.split("-") 
        
        if(parseInt(hoySplit[0]) < parseInt(valueSplit[0])){
            interruptor = 1
            
        } 
        else if(parseInt(hoySplit[1]) < parseInt(valueSplit[1]) && parseInt(hoySplit[0]) === parseInt(valueSplit[0])){
            interruptor = 1
            }
        else if(parseInt(hoySplit[1]) === parseInt(valueSplit[1]) && parseInt(hoySplit[2]) < parseInt(valueSplit[2]) && parseInt(hoySplit[0]) <= parseInt(valueSplit[0])){
            interruptor = 1
        }

        if(interruptor === 0){
            return false
           }
        else{ 
            return true
        }
            
}

    function mayorEdad(hoy, value){
        let interruptor = 0;
        const hoySplit = hoy.split("-") //[ "2024", "3", "11" ]
        const valueSplit = value.split("-") //[ "2024", "12", "10" ]

        if(parseInt(hoySplit[0]) - parseInt(valueSplit[0]) < 16){
            interruptor = 1
            
        }
        else if(parseInt(hoySplit[0]) - parseInt(valueSplit[0]) == 16 && parseInt(hoySplit[1]) < parseInt(valueSplit[1]) ){
            interruptor = 1
            
        }
        else if(parseInt(hoySplit[1]) === parseInt(valueSplit[1]) && parseInt(hoySplit[2]) < parseInt(valueSplit[2])){
            interruptor = 1
            
        }
        
        if(interruptor === 0){
            return false
           }
        else{ 
            return true
        }
                
}

function aniospasado(hoy, value){
    let interruptor = 0
    const hoySplit = hoy.split("-") 
    const valueSplit = value.split("-") 
    
    if((parseInt(hoySplit[0]) - parseInt(valueSplit[0])) > 110){
        interruptor = 1
    } 
    if(interruptor === 0){
        return false
       }
    else{ 
        return true
    }
        
}

    function obtenerIdDesdeUrl(url) {
    const regex = /\/users\/(\d+)\/update/;
    const match = url.match(regex);
  
    if (match && match[1]) {
      return parseInt(match[1], 10);
    } else {
      return null;
    }
}

    function findUser(objet, id){

        if(Object.keys(objet).length > 0){
            let userEncontrado = objet.filter(element => element.id == id)
            return userEncontrado[0]
        }else{
            return false
        }
    }

})