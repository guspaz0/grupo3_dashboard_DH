const errorMensaje = document.querySelector("#error-deleteacount")
const BotonDelete = document.querySelector("#deleteMenu button")



BotonDelete.addEventListener("click", (e)=>{
 const id = document.querySelector("#deleteMenu button").id
const input = document.querySelector('#inputPassword')
console.log(input.value)
if(input.value != ""){
    preEliminacion(id)     
}else{

    errorMensaje.style.display = "block"
    errorMensaje.textContent = "Ingrese su contraseña"
}

})

function preEliminacion(id){
    const body = document.querySelector("body")
    const popup = document.createElement('span');
    popup.classList.add('popupscreen');
    popup.innerHTML = `
        <div class="popUps" id="popUpDetailLogin">
            <h3>¿Está seguro de que desea proceder con la eliminación de su cuenta?</h3>
            <h4>Esta acción resultará en la eliminación permanente de todos los datos asociados con su cuenta.</h4>
            <div class="botonPopup">
                <a onclick="eliminarUsuario('${id}')">Aceptar</a>
                <a onclick="popUpoOff()">Cancelar</a>
            </div>  
        </div>
    `;
    body.appendChild(popup);

}




function popUpoOff(){
    const body = document.querySelector("body")
    const elementosPopup = document.querySelector('.popupscreen');
    
    body.removeChild(elementosPopup);
    
}


function eliminarUsuario(id) {
        popUpoOff()
        errorMensaje.style.display = "none"
        const password = document.querySelector("#inputPassword").value;
        
        if (password) { 
            fetch(`/users/${id}/delete`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    password: password,
                }),
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
                        <h3>Su cuenta se elimino correctamente</h3>
                            <div class="botonPopup">
                                <a onclick="cerrarSesion()">Aceptar</a>
                            </div>  
                        </div>
                    `;
                    body.appendChild(popup);
                
                }
                else if(respuesta.message == "La contraseña es incorrecta"){
                    errorMensaje.style.display = "block"
                    errorMensaje.textContent = respuesta.message

                } else {
                    alert(respuesta.message);
                }
            })
            .catch(error => {
                console.error('Error al eliminar el usuario:', error.message);
            });
        } else {
            console.error('Contraseña no proporcionada');
        }
    
}

function cerrarSesion(){
    
    const enlaceCerrarSesion = document.getElementById('cerrarsesion');
    console.log(enlaceCerrarSesion)
    enlaceCerrarSesion.click()
}
