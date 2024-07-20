// VALIDACION DE FORMULARIO DE PRODUCTOS 

const form = document.querySelector('form')
let errores = {}
function validateForm(inputs) {
    const {name, description, image, line, category, price, stock, color } = document.querySelector('form')
    if (errores[inputs]) {
        document.querySelector(`small#${inputs}`).remove()
        delete errores[inputs]
    }
    switch (inputs) {
        case 'name':
            if (name.value.length <= 5 || name.value.length > 30) errores.name = "el nombre debe ser mayor a 5 caracteres";
            break
        case 'description':
            if (description.value.length <= 20 || description.value.length > 140) errores.description = "la descripcion debe ser mayor a 20 caracteres"
            break
        case 'line':
            if (!line.value) errores.line = "seleccionar una linea de producto"
            break
        case 'category':
            if (!category.value) errores.category = "seleccionar una categoria"
            break
        case 'price':
            if (!price.value) errores.price = "ingresar un precio"
            if (price.value <= 0) errores.price = "el precio debe ser mayor a 0"
            break
        case 'image':
            let allowedExtension = ['image/jpeg', 'image/jpg', 'image/png'];
            Array.from(image.files).forEach((file,i) => {
                if (!allowedExtension.includes(file.type)) errores.image = `solo se permiten archivos ${allowedExtension.join(',')}`
            })
            break
        case 'stock':
            let stocks = Array.from(stock).length > 0? Array.from(stock) : [stock];
            stocks.forEach((el) => {
                if (el.value <= 0) errores.stock = "la cantidad debe ser mayor a 0"
            })
            break
        case 'color':
            let colors = Array.from(color).length > 0? Array.from(color) : [color];
            colors.forEach((el,i) => {
                if (colors.some((color,z) => color.value == el.value && z != i )) errores.color = "no puede haber 2 colores iguales"
            })
            break
        default:
            break
    }
}

Array.from(form).forEach((key) => {
    key.onchange = () => {
        if (key.name == "image") {
            const imageInput = key
            for (let i = 0; i < key.files.length; i++) { //por cada archivo subido, hacer todo lo que sigue -->
                const containerImage = document.getElementById("imageRender");
                //img tag
                const img = document.createElement("img")
                img.type = "image"
                img.src = URL.createObjectURL(imageInput.files[i])
                
                //img info
                const imageInfo = document.createElement('span');
                imageInfo.id = imageInput.files[i].name;
                imageInfo.innerHTML = `<small>${imageInput.files[i].name}, ${(imageInput.files[i].size/1024).toFixed(2)}KB</small>`;
                
                //agrego button para borrar imagen subida
                const deleteButton = document.createElement('button');
                deleteButton.id = "deleteImage";
                deleteButton.className = "deleteImage";
                deleteButton.innerHTML = "Borrar";
                deleteButton.addEventListener('click',(e) => {
                    e.preventDefault();
                    updateFileList(imageInput,i)
                    deleteButton.parentNode.remove()
                })
                //inserto los tags al HTML
                containerImage.appendChild(imageInfo);
                imageInfo.appendChild(img);
                imageInfo.appendChild(deleteButton);
            }; //fin de la presente iteracion, continuar con el siguiente archivo, si es que hay mas.
        }
        validateForm(key.name)
        if(errores[key.name]) {
            let htmlError = `<small id="${key.name}" class="errors">${errores[key.name]}</small>`
            key.insertAdjacentHTML('beforebegin',htmlError)
        }
    }
    key.onfocus = () => {
        validateForm(key.name)
        if(errores[key.name]) {
            let htmlError = `<small id="${key.name}" class="errors">${errores[key.name]}</small>`
            key.insertAdjacentHTML('beforebegin',htmlError)
        }
    }
})

let updateFileList = function (fileField, index) {
    let fileBuffer = Array.from(fileField.files);
    fileBuffer.splice(index, 1);

    /** Code from: https://stackoverflow.com/a/47172409/8145428 */
    const dT = new ClipboardEvent('').clipboardData || // Firefox < 62 workaround exploiting https://bugzilla.mozilla.org/show_bug.cgi?id=1422655
      new DataTransfer(); // specs compliant (as of March 2018 only Chrome)

    for (let file of fileBuffer) { dT.items.add(file); }
    fileField.files = dT.files;
}

const deleteButton = document.querySelectorAll('button#deleteImage')

Array.from(deleteButton).forEach((key,i) => {
    key.addEventListener('click', (e) => {
        e.preventDefault();
        key.parentNode.remove()
    })
})

form.onsubmit = (event) => {
    //Array.from(form).forEach(input => validateForm(input.name))
    if(Object.keys(errores).length > 0) {
        event.preventDefault()
        alert('corregir los errores del formulario')
    }
}