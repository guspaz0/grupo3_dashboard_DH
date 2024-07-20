const host = window.location.host
window.onload = () => {

//--------> PAGINACION DE PRODUCTOS <--------//
    let articles = Array.from(document.querySelectorAll("article"));
    let pageAnchor = document.querySelectorAll('a#page');
    let currentPage = document.querySelector('.currentPage');
    pageAnchor.forEach((anchor) => {
        anchor.addEventListener('click', async (e) => {
            e.preventDefault();
            let page = e.target.innerText;
            currentPage.classList.toggle("currentPage")
            currentPage = anchor.parentElement;
            currentPage.classList.toggle("currentPage")
            document.querySelector("b#currentPage").innerHTML = page
            let perPage = 10;
            let query = location.search.includes('?')? location.search : '?';
            const data = await fetchData(`/api/products${query}&page=${page}&perPage=${perPage}`);
            articles.forEach((element,i) => {
                let [t0,imgTag,t1,titulo,t2,categoria,t3,colores,t4,precio,t5,stock,t6,buttons ] = element.childNodes;
                if (+i >= data.products.length) {
                    element.style.display = 'none';
                } else {
                    const {categories, colors, created_at, id, images, line, name, price, updated_at} = data.products[i]
                    element.style.display = 'flex';
                    titulo.innerHTML = name;
                    titulo.href = `/products/${id}`;
                    imgTag.src = images[0].pathName;
                    categoria.innerHTML = categories.name;
                    colores.childNodes.forEach((color,c) => {
                        if (c % 2 != 0) {
                            if (colors[Math.floor(c/2)]) {
                                color.firstChild.style.display = 'flex';
                                color.firstChild.style.backgroundColor = colors[Math.floor(c/2)].color.hex;
                                color.firstChild.style.color = colors[Math.floor(c/2)].color.hex;
                            } else {
                                color.firstChild.style.display = 'none';
                            }
                        }
                    })
                    precio.innerHTML = "$"+price;
                    stock.innerHTML = colors.reduce((acum,{stock}) => acum+Number(stock),0);
                    let [bt0, editAnchor, bt1, formDelete ] = buttons.childNodes
                    editAnchor.href = `/products/${id}/edit`;
                    formDelete.action = `/products/${id}/delete?_method=DELETE`;
                }
            })
        })
    })

// -----> CREACION DE CATEGORIAS <----- //

    const btnFormCategory = document.querySelector('button#category')
    btnFormCategory.addEventListener('click', (e) => {
        e.preventDefault();
        btnFormCategory.disabled = true
        const container = document.createElement('div')
        let formulario = `<button id="closeCategory" class="delete">X</button>
            <b>Nueva Categoria</b>
            <form id="newCategory" method="POST" action="/api/categories">
                <label for="name">Nombre:</label>
                <input type="text" id="name" name="name" required/>
                <button id="postCategory" class="button">Crear</button>
            </form>`;
        container.insertAdjacentHTML('afterbegin', formulario)
        btnFormCategory.parentNode.appendChild(container)
        const form = document.querySelector('form#newCategory')
        form.addEventListener('submit', async (e) => {
            try {
                e.preventDefault();
                const body = {
                    name: form.name.value
                }
                const data = await fetchData(`/api/categories`, body)
                if (data) {
                    alert('Categoria creada')
                    const closeButton = document.querySelector('button#closeCategory')
                    closeButton.click()
                }
            } catch (error) {
                alert(error.message)
            }
        })
        const closeButton = document.querySelector('button#closeCategory')
        closeButton.addEventListener('click', () => {
            closeButton.parentNode.remove();
            btnFormCategory.disabled = false
        })
        window.onkeyup = (e) => {
            if (e.key == "Escape") {
                closeButton.click()
            }
        }
    })
};

async function fetchData(endpoint, body) {
    try {
        const response = await fetch(`http://${host}${endpoint}`,{
            method: body? 'POST' : 'GET',
            headers: {
                'Accept': 'application/json',
                'Content-Type': 'application/json'
            },
            body: body? JSON.stringify(body) : null
        });
        const data = await response.json();
        return data
    } catch (error) {
        alert(error.message)
    }
};