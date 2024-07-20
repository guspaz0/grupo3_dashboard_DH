let agregarColor = document.getElementById('agregar');


agregarColor.addEventListener('click', function () {
    let inputCount = document.querySelectorAll('input[type="color"]').length;
    let input = `<fieldset class="colorStock">
        <legend id="c${inputCount? inputCount: 0}"></legend>
        <input class="c${inputCount? inputCount : 0}" type="color" name="color" id="color"/>
        <span id="c${inputCount? inputCount : 0}"></span>
        <label for="c${inputCount? inputCount : 0}">Stock:</label>
        <input id="c${inputCount? inputCount : 0}" class="inputform number" type="number" name="stock" value="1.00"/>
        ${inputCount == 0? "" : `<button id="c${inputCount}" class="deleteImage">Borrar</button>`}
    </fieldset>`;


    const container = document.getElementsByClassName('container-colorinputs')[0];
    if (+inputCount < 5) {
        container.insertAdjacentHTML("afterbegin", input);
        input = document.querySelector(`input[class="c${inputCount? inputCount : 0}"]`)
        const deleteButton = document.querySelector(`button#c${inputCount? inputCount : 0}`);
        deleteButton.addEventListener('click',(e) => {
            e.preventDefault();
            console.log(inputCount)
            if (inputCount >= 1) {
                deleteButton.parentNode.remove()
            }
        })
        input.onchange = () => {
            let spanColor = document.querySelector(`legend#${input.className}`);
            var match = ntc.name(input.value);
            spanColor.innerHTML = match[1];
            spanColor.style = `color:${match[0]}`;
            input.value = match[0];
            let key = input
            validateForm(key.name)
            if(errores[key.name]) {
                let htmlError = `<small id="${key.name}" class="errors">${errores[key.name]}</small>`
                key.insertAdjacentHTML('beforebegin',htmlError)
            }
        };
        input.onfocus = () => {
            let key = input
            validateForm(key.name)
            if(errores[key.name]) {
                let htmlError = `<small id="${key.name}" class="errors">${errores[key.name]}</small>`
                key.insertAdjacentHTML('beforebegin',htmlError)
            }
        }
        const stockinput = document.querySelector(`input#c${inputCount? inputCount : 0}`)
        stockinput.onchange= () => {
            let key = stockinput

            validateForm(key.name)
            if(errores[key.name]) {
                let htmlError = `<small id="${key.name}" class="errors">${errores[key.name]}</small>`
                key.insertAdjacentHTML('beforebegin',htmlError)
            }
        }
        stockinput.onfocus = () => {
            let key = stockinput
            validateForm(key.name)
            if(errores[key.name]) {
                let htmlError = `<small id="${key.name}" class="errors">${errores[key.name]}</small>`
                key.insertAdjacentHTML('beforebegin',htmlError)
            }
        }
    };
});

let ColorsError = document.querySelectorAll('input[type="color"]');

ColorsError.forEach((c) => {
    c.addEventListener("change", () => {
        let spanColor = document.querySelector(`legend#${c.className}`);
        var match = ntc.name(c.value);
        spanColor.innerHTML = match[1];
        spanColor.style = `color:${match[0]}`;
        c.value = match[0];
    });
});

let buttonsDelete = document.querySelectorAll('button#deleteColor')

Array.from(buttonsDelete).forEach(button => {
    button.onclick = (e) => {
        e.preventDefault()
        e.target.parentNode.remove()
        if (!document.querySelector('input[type="color"]')) agregarColor.click()
    }
})

window.onload = () => {
    if (!document.querySelector('input[type="color"]')) agregarColor.click()
}