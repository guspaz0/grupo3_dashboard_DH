window.addEventListener("load", ()=>{
const botones = document.querySelectorAll(".submenu a li")
const payment = document.querySelector(".payments")
const favorite = document.querySelector(".favoritos")
const deletedCount = document.querySelector(".delete-acount")
const changePass = document.querySelector(".change-pass")
let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
let changepassword = {
    currentPass: false,
    newPass: false,
    newRePass: false
}

let inputsNotEmpty = {
    currentPass: false,
    newPass: false,
    newRePass: false
}


const inputChangePass = document.querySelectorAll("#contenedor-pass input")
const botonChange = document.querySelector("#contenedor-pass a")

botonChange.addEventListener("click", (e)=>{    
    let submit = true
    for(let errors in inputsNotEmpty){
        if(!inputsNotEmpty[errors]){
            const error = document.querySelector(`#error-${errors}`)
            error.style.display = "block"
            error.textContent = "Debe llenar este campo"
            submit = false
        }
    }
    console.log(submit)
    if(submit){
        const id = document.querySelector("#userID").textContent    
        cambiarcontrasena(id)
    }

})


inputChangePass.forEach((element)=>{

    element.addEventListener("input",(e)=>{
        switch(element.name){
            case "currentPass":
                const errorCurrent = document.querySelector(`#error-${element.name}`)
                if(e.target.value == ""){
                    errorCurrent.style.display = "block"
                    errorCurrent.textContent = "Debe llenar este campo"
                    changepassword.currentPass = false
                    inputsNotEmpty.currentPass = false;
                }else{
                    errorCurrent.style.display = "none"
                    changepassword.currentPass = true
                    inputsNotEmpty.currentPass = true;
                }
            break
            case "newPass":
                const actualPass = document.querySelector("#currentP")
                const errorNewPass = document.querySelector(`#error-${element.name}`)
                    if(e.target.value == ""){
                        errorNewPass.style.display = "block"
                        errorNewPass.textContent = "Debe llenar este campo"
                        changepassword.newPass = false
                        inputsNotEmpty.newPass = false;
                    }
                    else if(e.target.value.length < 7){
                        errorNewPass.textContent = "La contraseña debe tener al menos 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial."
                        errorNewPass.style.display = "block"
                        changepassword.newPass = false
                        inputsNotEmpty.newPass = true;
                      }
                      else if(!regexPassword.test(e.target.value)){
                        errorNewPass.textContent = "La contraseña debe contener letras mayúsculas, minúsculas, un número y un carácter especial."
                        errorNewPass.style.display = "block"
                        changepassword.newPass = false
                        inputsNotEmpty.newPass = true;
                      }
                      else if(actualPass && actualPass.value == e.target.value){
                            errorNewPass.textContent = "La nueva contraseña debe ser diferente a la actual"
                            errorNewPass.style.display = "block"
                            changepassword.newPass = false
                            inputsNotEmpty.newPass = true;
                        
                      }
                      else{
                        errorNewPass.style.display = "none"
                        changepassword.newPass = true
                        inputsNotEmpty.newPass = true;
                      }
    
            break
            case "newRePass":
                let password = document.querySelector('#newPass')
                let errorpassword = document.querySelector("#error-newPass")
                const errorNewRePass = document.querySelector(`#error-${element.name}`)
                if(e.target.value === ""){
                    errorNewRePass.textContent = "Debe llenar este campo"
                    errorNewRePass.style.display = "block"
                    changepassword.newRePass = false
                    inputsNotEmpty.newRePass = false;
                    
                }
            else if(errorpassword.style.display != "none"){
                    
                errorNewRePass.textContent = "Ingrese una contraseña correcta"
                errorNewRePass.style.display = "block"
                changepassword.newRePass = false
                inputsNotEmpty.newRePass = true;
                    
                }
                else if(password.value != e.target.value){
                    
                    errorNewRePass.textContent = "Las contraseñas no coinciden"
                    errorNewRePass.style.display = "block"
                    changepassword.newRePass = false
                    inputsNotEmpty.newRePass = true;
                }
                else{
                    
                    errorNewRePass.style.display = "none";
                    changepassword.newRePass = true
                    inputsNotEmpty.newRePass = true;
                }                
            break
            default:
            break
        }
    })



})

botones.forEach(element => {
    element.addEventListener("click", ()=>{
        switch(element.textContent){
            case "Mis compras":
                if(changePass){
                    const errores = document.querySelectorAll(".changePassError")
                    const inputsChange = document.querySelectorAll("#contenedor-pass input")
                    errores.forEach((elemento)=>{
                        elemento.style.display = "none"
                    })
                    inputsChange.forEach((elemento)=>{
                        elemento.value = ""
                    })
                    changePass.style.display = "none"
                }
                payment.style.display = "flex"
                favorite.style.display = "none"
                if(deletedCount){
                const inputDelete = document.querySelector("#inputPassword") 
                const errorDelete = document.querySelector("#error-deleteacount")
                errorDelete.style = "none"
                inputDelete.value = ""
                deletedCount.style.display = "none"
                }
               
            break
            case "Mis favoritos":
                favorite.style.display = "flex"
                payment.style.display = "none"
                if(changePass){
                    const errores = document.querySelectorAll(".changePassError")
                    const inputsChange = document.querySelectorAll("#contenedor-pass input")
                    errores.forEach((elemento)=>{
                        elemento.style.display = "none"
                    })
                    inputsChange.forEach((elemento)=>{
                        elemento.value = ""
                    })
                    changePass.style.display = "none"
                }
                if(deletedCount){
                    const inputDelete = document.querySelector("#inputPassword") 
                    const errorDelete = document.querySelector("#error-deleteacount")
                    errorDelete.style = "none"
                    inputDelete.value = ""
                    deletedCount.style.display = "none"
                    }
                
            break   
            case "Eliminar Cuenta":
                deletedCount.style.display = "flex"
                payment.style.display = "none"
                favorite.style.display = "none"
                if(changePass){
                    const errores = document.querySelectorAll(".changePassError")
                    const inputsChange = document.querySelectorAll("#contenedor-pass input")
                    errores.forEach((elemento)=>{
                        elemento.style.display = "none"
                    })
                    inputsChange.forEach((elemento)=>{
                        elemento.value = ""
                    })
                    changePass.style.display = "none"
                }
               
            break
            case "Cambiar contraseña":
                changePass.style.display = "flex"
                payment.style.display = "none"
                favorite.style.display = "none"
                if(deletedCount){
                    const inputDelete = document.querySelector("#inputPassword") 
                    const errorDelete = document.querySelector("#error-deleteacount")
                    errorDelete.style = "none"
                    inputDelete.value = ""
                    deletedCount.style.display = "none"
                    }
                
            break
            case "Mis productos":
                payment.style.display = "flex"
                favorite.style.display = "none"
                if(changePass){
                    const errores = document.querySelectorAll(".changePassError")
                    const inputsChange = document.querySelectorAll("#contenedor-pass input")
                    errores.forEach((elemento)=>{
                        elemento.style.display = "none"
                    })
                    inputsChange.forEach((elemento)=>{
                        elemento.value = ""
                    })
                    changePass.style.display = "none"
                }
                
            break
            default:
            break
            }

    })
    
    
    })
})

function cambiarcontrasena(id){
    const actual = document.querySelector("#currentP").value
     const nueva = document.querySelector("#newPass").value

    let bodys = {
        currentPass: actual,
        newPass: nueva
    }
 
        fetch(`/users/${id}/changepass`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(bodys),
        })
        .then(response => {
            if(response.status == 500){
                throw new Error(response)
            }
            else{
                return response.json()
            }
        }).then(respuesta =>{
            
            if(respuesta.success){
                    const body = document.querySelector("body")
                    const popup = document.createElement('span');
                    popup.classList.add('popupscreen');
                    popup.innerHTML = `
                        <div class="popUps" id="popUpDetailLogin">
                        <h3>La contraseña se actualizó correctamente</h3>
                        <h5>Se cerrará la sesión. Por favor, ingrese nuevamente.</h5>
                            <div class="botonPopup">
                                <a onclick="cerrarSesion()">Aceptar</a>
                            </div>  
                        </div>
                    `;
                    body.appendChild(popup);
                
            }
            else if(respuesta.message == "La contraseña es incorrecta"){
                const errorMensajeCurrentPass = document.querySelector("#error-currentPass")
                const inputChangePass2 = document.querySelectorAll("#contenedor-pass input")
                errorMensajeCurrentPass.style.display = "block"
                errorMensajeCurrentPass.textContent = respuesta.message
                inputChangePass2.forEach((input)=>{
                    input.value = ""
                })

            } else {
                alert(respuesta.message);
            }
        })
        .catch(error => {
            console.error('Error al actualizar la contraseña:', error.message);
        });
    

 }

 function cerrarSesion(){
    
    const enlaceCerrarSesion = document.getElementById('cerrarsesion');
    console.log(enlaceCerrarSesion)
    enlaceCerrarSesion.click()
}
 