window.addEventListener("load", async function(){

const day = currentDay()
let submitButton = document.querySelector('input[type="submit"]')
const requiredinput = document.querySelectorAll(".requiredinput")
let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const mensaje = 'Este campo debe estar completo'
const streetnumber = document.querySelector("#streetnumber")
const errorStreetNumber = document.querySelector("#errorNumero")
const codigoPostal = document.querySelector("#codigoPostal")
const errorCodigoPostal = document.querySelector("#errorCodigoPostal")
const elementProvincia = document.querySelector("#provincia")
const elementLocalidad = document.querySelector("#localidad")
const errorcheck = document.querySelectorAll(".error-required")
let withOutErrors = {
    nombre: false,
    apellido: false,
    fechaNacimiento: false,
    codigoPostal: true,
    calle: true,
    numeroCalle: true,
    imagen: false,
    piso: true,
    departamento: true,
    email: false,
    userName: false,
    password: false,
    repassword: false,
    provincia: false,
    localidad: false
}
console.log(elementLocalidad.value)
if(elementLocalidad.value != ""){
    elementLocalidad.value = ""
}
console.log(elementProvincia.value)
if(elementProvincia != ""){
    elementProvincia.value = ""
}

requiredinput.forEach((element)=>{
    const error = document.querySelector(`#error-${element.name}`)

    if(element.value != ""){
        withOutErrors[element.name] = true
    }
    if(error.style.display == "block"){
        withOutErrors[element.name] = false
    }
    
    
})

errorcheck.forEach((error)=>{
    if(error.style.display == "block"){
        localStorage.removeItem('userName');
    }
})

submitButton.addEventListener("click", (e)=>{
    e.preventDefault()

    console.log("errores", withOutErrors)
    
    const requiredinputForm = document.querySelectorAll(".requiredinput")
    
    requiredinputForm.forEach((elemento)=>{

        if(elemento.value.length < 1){
            const error = document.querySelector(`#error-${elemento.name}`)
            error.style.display = "block"
            error.textContent = mensaje
            elemento.style.border = "2px solid red"
         }

        if(elemento.name == "provincia"){
    
            if(elemento.style.border === "2px solid green"){
                    withOutErrors.provincia = true;
             }else{
                  
                    withOutErrors.provincia = false;
             }
        }else if(elemento.name == "localidad"){
           
            if(elemento.style.border === "2px solid green"){
               
                    withOutErrors.localidad = true;
             }else{
            
                    withOutErrors.localidad = false;
             }
        }

        
    })
    
    let submitform = true
    let contador = 0
    for(let error in withOutErrors){
        if(!withOutErrors[error]){
            contador++;
            submitform = false
        }

    }
    console.log("submitform", submitform)
   if(submitform){
    const body = document.querySelector("body")
    const popup = document.createElement('span');
    popup.classList.add('popupscreenregistro');
    popup.innerHTML = `
    <div class="popUpsregistro">
            <h2>Verificación de Registro</h2>
            <p>Por favor, revise su informacion antes de continuar.</p>
            <h3>¿Desea modificar algo?</h3>
            
            <div class="botonPopup">
                <a onClick="popUpOff()">Modificar </a>
                <a onClick="registrar()">Registrarse</a>
            </div>  
            
                ¡Gracias por su atención!</p>
        </div>
    `;
    body.appendChild(popup);
    
   }
})

codigoPostal.addEventListener("input", function (e) {
    if (isNaN(parseInt(e.target.value))) {
        codigoPostal.style.border = '2px solid red';
        errorCodigoPostal.textContent = 'Tiene que ingresar solo números';
        errorCodigoPostal.style.display = 'block';
        withOutErrors.codigoPostal = false;
    } else {
        codigoPostal.value = e.target.value === "" ? 0 : parseInt(e.target.value);
        codigoPostal.style.border = '2px solid green';
        errorCodigoPostal.style.display = 'none';
        withOutErrors.codigoPostal = true;
    }
});

streetnumber.addEventListener("input", function (e) {
    if (isNaN(parseInt(e.target.value))) {
        streetnumber.style.border = '2px solid red';
        errorStreetNumber.textContent = 'Tiene que ingresar solo números';
        errorStreetNumber.style.display = 'block';
        withOutErrors.numeroCalle = false;
    } else {
        streetnumber.value = e.target.value === "" ? 0 : parseInt(e.target.value);
        streetnumber.style.border = '2px solid green';
        errorStreetNumber.style.display = 'none';
        withOutErrors.numeroCalle = true;
    }
});


requiredinput.forEach((element)=>{

element.addEventListener("input", (e)=>{

    const error = document.querySelector(`#error-${element.name}`)
    
    switch(element.name) {
            case "nombre":
                if(e.target.value === ""){
                    element.style.border = '2px solid red'
                    error.textContent = mensaje
                    error.style.display = 'block'
                    withOutErrors.nombre = false;
                }
                else if(e.target.value.length === 1){
                    element.style.border = '2px solid red'
                    error.textContent = "El nombre debe tener al menos 2 caracteres"
                    error.style.display = 'block'
                    withOutErrors.nombre = false;
                   
                }else{
                    element.style.border = '2px solid green'
                    error.style.display = 'none'
                    withOutErrors.nombre = true;
                }
            break
            case "apellido":
                if(e.target.value === ""){
                    element.style.border = '2px solid red'
                    error.textContent = mensaje
                    error.style.display = 'block'
                    withOutErrors.apellido = false;
                }
                else if(e.target.value.length === 1){
                    element.style.border = '2px solid red'
                    error.textContent = "El apellido debe tener al menos 2 caracteres"
                    error.style.display = 'block'
                    withOutErrors.apellido = false;
        
                }else{
                    element.style.border = '2px solid green'
                    error.style.display = 'none'
                    withOutErrors.apellido = true;
                }
         
            break
            case "fechaNacimiento":
                if(e.target.value === ""){
                    element.style.border = '2px solid red'
                    error.textContent = mensaje;
                    error.style.display = 'block'
                    withOutErrors.fechaNacimiento = false;
                   
                }
                else if(fechaFutura(day,e.target.value)){
                    element.style.border = '2px solid red'
                    error.textContent = 'No puede seleccionar una fecha en el futuro'
                    error.style.display = 'block'
                    withOutErrors.fechaNacimiento = false;
                }
                else if(mayorEdad(day,e.target.value)){
                    element.style.border = '2px solid red'
                    error.textContent = 'Debes tener o ser mayor de 16 años'
                    error.style.display = 'block'
                    withOutErrors.fechaNacimiento = false;
                }
                else if(aniospasado(day, e.target.value)){
                    element.style.border = '2px solid red'
                    error.textContent = 'No puede seleccionar un año tan en el pasado'
                    error.style.display = 'block'
                    withOutErrors.fechaNacimiento = false;
                }
                else{
                    element.style.border = '2px solid green'
                    error.style.display = 'none'
                    withOutErrors.fechaNacimiento = true;
                }
            break
            case "imagen":
                const iconoCheck = document.getElementById('iconoCheck');
                if(e.target.files[0].type === "image/jpeg" || e.target.files[0].type === "image/png"|| e.target.files[0].type === "image/jpg"){
                    error.style.display = "none";
                    iconoCheck.style.display = 'block';
                    withOutErrors.imagen = true
                 }else{
                    error.textContent = "La imagen tiene que ser formato .jpeg, .png, .jpg"
                    error.style.display = "block"
                    iconoCheck.style.display = 'none';
                    withOutErrors.imagen = false
                 }
            break
            case "email":
                if(e.target.value === ""){
                    email.style.border = '2px solid red'
                    error.textContent = mensaje
                    error.style.display = 'block'
                    withOutErrors.email = false
                    
                }
                else if(!regex.test(e.target.value)){
                    element.style.border = '2px solid red'
                    error.textContent = "Debe ingresar un Email valido"
                    error.style.display = 'block'
                    withOutErrors.email = false
                }
                else{
                    element.style.border = '2px solid green'
                    error.style.display = 'none'
                    withOutErrors.email = true
                }
            break
            case "userName":
                if(e.target.value === ""){
                    element.style.border = '2px solid red'
                    error.textContent = mensaje
                    error.style.display = 'block'
                    withOutErrors.userName = false;
                }
        
                else if(e.target.value.length < 6){
                    element.style.border = '2px solid red'
                    error.textContent = "El nombre de usuario debe tener al menos 6 caracteres"
                    error.style.display = 'block'
                    withOutErrors.userName = false;
                }
                else{
                    element.style.border = '2px solid green'
                    error.style.display = 'none'
                    withOutErrors.userName = true;
                }
            break
            case "password":
                if(e.target.value === ""){
                    element.style.border = '2px solid red'
                    error.textContent = mensaje;
                    error.style.display = "block"
                    withOutErrors.password = false;
          
                }
                else if(e.target.value.length < 7){
                  element.style.border = '2px solid red'
                  error.textContent = "La contraseña debe tener al menos 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial."
                  error.style.display = "block"
                  withOutErrors.password = false;
                }
                else if(!regexPassword.test(e.target.value)){
                  element.style.border = '2px solid red'
                  error.textContent = "La contraseña debe contener letras mayúsculas, minúsculas, un número y un carácter especial."
                  error.style.display = "block"
                  withOutErrors.password = false;
                }
                else{
                  element.style.border = '2px solid green'
                  error.style.display = "none"
                  withOutErrors.password = true;
                }
            break
            case "repassword":
            let password = document.querySelector('#password')

            if(e.target.value === ""){
                    element.style.border = '2px solid red'
                    error.textContent = mensaje
                    error.style.display = "block"
                    withOutErrors.repassword = false;
                }
            else if(password.style.border != '2px solid green'){
                    element.style.border = '2px solid red'
                    error.textContent = "Ingrese una contraseña correcta"
                    error.style.display = "block"
                    withOutErrors.repassword = false;
                }
                else if(password.value != e.target.value){
                    element.style.border = '2px solid red'
                    error.textContent = "Las contraseñas no coinciden"
                    error.style.display = "block"
                    withOutErrors.repassword = false;
                }
                else{
                    element.style.border = '2px solid green';
                    error.style.display = "none";
                    withOutErrors.repassword = true;
                }                
                break
                default:
                break
        
                     }    
                      

        })
    })

})






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
            switch(input) {
                case 'provincia':
                    const errorProvincia = document.querySelector("#error-provincia")
                    if (provincia.value.length == 0) {
                        errorProvincia.innerText = 'Debe ingresar una provincia'
                        errorProvincia.style.display = "block"
                        provincia.style.border = '2px solid red'
                        break
                    }
                    const {provincias} = await fetchProvincia(provincia.value)
                    if (provincias[0].nombre !== provincia.value) {
                        errorProvincia.innerText = 'La provincia ingresada no existe'
                        errorProvincia.style.display = "block"
                        provincia.style.border = '2px solid red'
                    }else{
                        errorProvincia.style.display = "none"
                        provincia.style.border = '2px solid green'
                    }
                    break
                case 'localidad':
                    const errorLocalidad = document.querySelector("#error-localidad")
                    if (errores.provincia) break
                    if (localidad.value.length == 0) {
                        errorLocalidad.innerText = 'Debe ingresar una localidad'
                        localidad.style.border = '2px solid red'
                        errorLocalidad.style.display = "block"
                        
                        break
                    }
                    const {localidades} = await fetchLocalidad(provincia.value, localidad.value)
                    if (!localidades.some(({nombre})=> nombre == localidad.value)){ 
                        errorLocalidad.innerText = 'Seleccionar una localidad valida'
                        localidad.style.border = '2px solid red'
                        errorLocalidad.style.display = "block"
                        
                    }
                    else{
                        errorLocalidad.style.display = "none";
                        localidad.style.border = "2px solid green"
                       
                    }
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

    function popUpOff(){
    
        const elementosPopup = document.querySelector('.popupscreenregistro');
        const body = document.querySelector("body")
        body.removeChild(elementosPopup);
        
    }

    function registrar(){
        let formulario = document.querySelector("#formulario")
        let nombre = document.querySelector("#nombre").value
        localStorage.setItem("userName",nombre)
        formulario.submit()
    }

//         else {
//             // if(validacionCompleta()){
//                 const promises = [
//                     new Promise(resolve => resolve(validateForm(localidad.name))),
//                     new Promise(resolve => resolve(validateForm(provincias.name)))
//                 ]
//                 Promise.all(promises).then(() => {
//                     if (Object.keys(errores).length > 0) {
//                         alert(`corregir los errores del formulario en ${Object.keys(errores).join(', ')}`)
//                     } else {
//                         console.log("Submit")
//                         // formulario.submit()
//                     }
//                 })
//             }
//         //}

//     })
    
