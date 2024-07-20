const fs = require('fs')

let id = 0

let usuarios = [
    {
        id: id+1,
        nombre: 'Gustavo',
        apellido: 'Paz',
        fechaNacimiento: new Date(1990,5,11,0,0,0),
        provincia: 'Santiago del estero',
        localidad: 'capital',
        codigopostal: 4200,
        calle: 'tomas edison',
        callenumero: 520,
        piso: null,
        departamento: null,
        username: 'gpaz',
        email: 'gpaz@latiendademaria.com',
        password: 'abc123',
    },
    {
        id: id+2,
        nombre: 'Omar',
        apellido: 'Perez',
        fechaNacimiento: new Date(1996,1,7,0,0,0),
        provincia: 'Santiago del estero',
        localidad: 'capital',
        codigopostal: 4200,
        calle: 'calle publica',
        callenumero: 's/n',
        piso: null,
        departamento: null,
        username: 'operez',
        email: 'operez@latiendademaria.com',
        password: 'abc123',
    }
]

fs.writeFileSync(__dirname+'/users.json', JSON.stringify(usuarios,0,4), 'utf-8')