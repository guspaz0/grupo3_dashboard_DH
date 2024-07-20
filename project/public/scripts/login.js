window.addEventListener("load", function(){
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const email = document.querySelector("#email")
    const password = document.querySelector("#password")
    const boton = document.querySelector("#loginboton")
    const errorPassword = document.querySelector("#mensajePassword")
    const errorEmail = document.querySelector("#mensajeEmail")
    const form = document.querySelector("#formulario-login")

    email.addEventListener("input", function(e){
        const valid = document.querySelector(".validacionusername")
        if(e.target.value === ""){
            email.style.border = '2px solid red'
            errorEmail.textContent = "Ingrese un Email valido"
            errorEmail.style.display = "block"
            
        }
        else if(!regex.test(e.target.value)){
            email.style.border = '2px solid red'
            errorEmail.textContent = "Debe ingresar un Email valido"
            errorEmail.style.display = "block"
        }
        else{
            email.style.border = '2px solid green'
            errorEmail.style.display = "none"
        }
    })

    password.addEventListener("input", function(e){
      if(e.target.value === ""){
        password.style.border = '2px solid red';
        errorPassword.textContent = 'Ingrese una contraseña'
        errorPassword.style.display = "block"
      }
      else{
        password.style.border = '2px solid green';
        errorPassword.style.display = "none"
      }


    })

    boton.addEventListener("click", function(e){
      let errors = {}
      e.preventDefault()
      
      if(email.value.length < 1){
        errors.email = "Ingrese un Email valido"
      }
      if(password.value.length < 1){
        errors.password = "Ingrese una contraseña"
      }
      if(Object.keys(errors).length < 1){
        if(ValidacionLogin()){
          form.submit()
      }
      }
      else{
        if(errors.email){
            email.style.border = '2px solid red'
            errorEmail.textContent = errors.email
            errorEmail.style.display = "block"
        }
        if(errors.password){
          password.style.border = '2px solid red';
          errorPassword.textContent = errors.password
          errorPassword.style.display = "block"
        }


      }
  
  


})


function ValidacionLogin(){

  const emailValid = email.checkValidity()
  const passwordValid = password.checkVisibility()
  
  if(emailValid && passwordValid){
    return true;
  }else{
    return false;
  }
}


})