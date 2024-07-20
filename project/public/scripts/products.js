const host = window.location.host
window.onload = () => {
    let productSection = document.querySelector("section.cards");
    const isLogged = document.querySelector('a#cerrarsesion');
    let articles = Array.from(document.querySelectorAll("article"));
    let pageAnchor = document.querySelectorAll('a#page');
    let smalls = document.querySelector(".smalls")
    pageAnchor.forEach((anchor) => {
        anchor.addEventListener('click', async (e) => {
            e.preventDefault();
            let page = e.target.innerText;
            document.querySelector('.currentPage').classList.toggle('currentPage')
            e.target.classList.toggle('currentPage')
            let perPage = 12;
            let query = location.search.includes('?')? location.search : '?';
            const data = await fetchData(`/api/products${query}&page=${page}&perPage=${perPage}`);
            let favoritos = [] 
            if (isLogged) favoritos = await fetchData(`/api/user/favorites`);
            articles.forEach(async (element,i) => {
                let [t0,titulo,t1,anchorImagen,t2,precio,t3,colores,t4 ] = element.childNodes;
                if (+i >= data.products.length) {
                    element.style.display = 'none'
                } else {
                    const {categories, colors, created_at, id, images, line, name, price, updated_at} = data.products[i]
                    element.style.display = 'flex'
                    titulo.innerHTML = name;
                    if (isLogged) {
                        try {
                            let favHeart = '<div id="heart" class="heart">'
                            if (favoritos.some(prod => prod.id == id)) {
                                favHeart += '<div class=""></div>'
                            } else {
                                favHeart += '<div class="unheart"></div>'
                            }
                            favHeart += '</div>'
                            titulo.innerHTML += favHeart
                        } catch (error) {
                            alert(error.message)
                        }
                    }
                    anchorImagen.href = `/products/${id}`
                    anchorImagen.firstChild.src = images[0].pathName
                    precio.innerHTML = `$ ${price}`;
                    Array.from(colores.childNodes).forEach((color,c) => {
                        if (c % 2 != 0) {
                            if (colors[Math.floor(c/2)]) {
                                color.style.display = 'flex'
                                color.style.backgroundColor = colors[Math.floor(c/2)].color.hex
                                color.style.color = colors[Math.floor(c/2)].color.hex
                            } else {
                                color.style.display = 'none'
                            }
                        }
                    })
                }
            })
        })
    })

    const query = new URLSearchParams(location.search)
    const form = document.querySelector('form#filtros')
    Array.from(form).forEach(input => {
        if (query.has(input.name) && query.getAll(input.name).includes(input.value)) {
            input.checked = true
            smalls.insertAdjacentHTML('beforebegin',`<small style="background-color:darkgray;border-radius:5px;padding:5px;width:fit-content;">${input.name}: ${input.parentNode.innerText}</small>`)
        }
        if (input.value == "Reset") {
            input.onclick = (e) => {
                e.preventDefault()
                window.history.replaceState({},'',`${location.pathname}`)
                form.reset()
                form.submit()
            }
        }
    });
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