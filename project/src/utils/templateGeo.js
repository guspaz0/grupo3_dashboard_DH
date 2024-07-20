const Localidades = require('./localidades.json')
const Provincias = require('./provincias.json')
const fs = require('fs')

let prov = []

Provincias.provincias.map((x) => {
    prov.push({id: x.id, nombre: x.nombre})
})

let data = []

for (let p in prov) {
    let {id} = prov[p]
    const loc = Localidades.localidades.filter((l) => l.provincia.id == id)
    data.push({
        provincia: prov[p].nombre,
        localidades: loc.map((i) =>{
            let {nombre, centroide, departamento} = i
            return {nombre, departamento: departamento.nombre, centroide,}
        })
    })
}

fs.writeFileSync(__dirname+'/proviciasLocalidades.json', JSON.stringify(data, 0,4), 'utf-8')