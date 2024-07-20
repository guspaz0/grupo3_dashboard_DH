let errores = {}
function handleErrors(inputs) {
    const {password, repeatPassword, token, email} = document.querySelector('form')
    let regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    let regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (errores[inputs]) {
        document.querySelector(`small#${inputs}`).remove()
        delete errores[inputs]
    }
    switch(inputs){
        case 'email':
            if (email.value.length == 0) errores.email = "Este campo no puede estar vacio"
            else if (!regex.test(email.value)) errores.email = "Ingresar un correo electronico valido"
            break
        case 'password':
            if(password.value.length == 0) errores.password = "Este campo no puede estar vacio"
            else if(password.value.length < 7) errores.password = "La contraseña debe tener al menos 8 caracteres, letras mayúsculas, minúsculas, un número y un carácter especial."
            else if(!regexPassword.test(password.value)) errores.password = "La contraseña debe contener letras mayúsculas, minúsculas, un número y un carácter especial."
            break
        case 'repeatPassword':
            if(repeatPassword.value.length == 0) errores.repeatPassword = "Este campo no puede estar vacio"
            else if(repeatPassword.value != password.value) errores.repeatPassword = "Las contraseñas no coinciden"
            break
        case 'token':
            if (token.value.length == 0) errores.token = "no puede estar vacio."
            if (token.value.length != 137) errores.token = "token no valido."
            break
        default:
            break
    }
}

const form = document.querySelector('form')

Array.from(form).forEach((key) => {
    key.onchange = () => {
        handleErrors(key.name)
        if(errores[key.name]) {
            let htmlError = `<small id="${key.name}" class="errors">${errores[key.name]}</small>`
            key.insertAdjacentHTML('beforebegin',htmlError)
        }
    }
    key.onfocus = () => {
        handleErrors(key.name)
        if(errores[key.name]) {
            let htmlError = `<small id="${key.name}" class="errors">${errores[key.name]}</small>`
            key.insertAdjacentHTML('beforebegin',htmlError)
        }
    }
})

form.onsubmit = (event) => {
    if(Object.keys(errores).length > 0) {
        event.preventDefault()
        alert('corregir los errores del formulario')
    }
}