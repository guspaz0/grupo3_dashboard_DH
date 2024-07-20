const { body, validationResult } = require('express-validator');
const users = require('../models/user');
const productos = require('../models/products');
const Images = require('../models/images')
const bcrypt = require('bcryptjs');
const path = require('path');
const categories = require('../models/categories');
const Colors = require('../models/colors');
const regexPassword = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
const db = require('../database/models')

const extNames = ['.jpg', '.png', '.jpeg']
const maxFileSize = 2048000 //bytes

module.exports = {
    login: function () {
        return [
            body('email')
                .notEmpty().withMessage('Ingresar Usuario o email registrado')
                .custom(async (value) => {
                    const usersdb = await db.Users.findAll()
                    const user = usersdb.some((u) => u.userName == value || u.email == value)
                    if (!user) {
                        return Promise.reject('usuario o correo electronico no registrados');
                    }
            
                    return Promise.resolve();
                }),
            body('password')
                .notEmpty().withMessage('La contraseña no puede estar en blanco')
                .custom(async (value, { req }) => {
                    const usersdb = await db.Users.findAll()
                    const user = usersdb.find((u) => u.userName == req.body.email || u.email == req.body.email);
            
                    if (!user) {
                        throw new Error('Verificar Usuario');
                    }
            
                    const checkPass = await bcrypt.compare(value, user.password);
            
                    if (!checkPass) {
                        throw new Error('Contraseña incorrecta');
                    }
            
                    return true;
                }),
        ]
    },
    registerUser: function () {
        return [
            body('nombre')
            .notEmpty().withMessage('Debe ingresar un nombre')
            .isLength({min: 2}).withMessage('debe tener al menos 2 caracteres'),
            body('apellido')
            .notEmpty().withMessage('Debe ingresar un apellido')
            .isLength({min: 2}).withMessage('debe tener al menos 2 caracteres'),
            body('password')
                .notEmpty().withMessage('La contraseña no puede estar en blanco')
                .isLength({min: 8}).withMessage('la contraseña debe ser mayor a 8 caracteres')
                .custom(value => regexPassword.test(value)).withMessage('La contraseña debe contener letras mayúsculas, minúsculas, un número y un carácter especial.'),
            body('repassword').custom((value, {req}) => {
                return value === req.body.password
            }).withMessage('las contraseñas no coinciden'),
            body('userName')
                .notEmpty().withMessage('Debes completar el nombre')
                .isLength({min: 6}).withMessage('el nombre debe ser mayor a 6 caracteres')
                .custom(async (value) => {
                    const users1 = await db.Users.findAll({paranoid: false})
                    const user = users1.some((u) => u.userName == value);
                    if (user) {
                        throw new Error('El nombre de usuario ya está en uso');
                    }
            
                    return true;
                }),
            body('email')
                .isEmail().withMessage('email no valido')
                .custom(async (value, { req }) => {
                    const user1 = await db.Users.findAll({paranoid: false})
                    const anotherUserWithSameEmail = user1.some((user) => user.email == value);

                  if (anotherUserWithSameEmail) {
                     throw new Error('Este email ya esta registrado');
                     }

                    return true;
                }),
            body('fechaNacimiento')
                .isISO8601().withMessage('ingresar una fecha valida'),
            body('provincia')
                .notEmpty().withMessage('selecciona una provincia'),
            body('localidad')
                .notEmpty().withMessage('selecciona una localidad'),    
            body('codigoPostal')
                .isNumeric({ min: 1, max: 10000 }).withMessage('solo numeros')
                .notEmpty().withMessage('el codigo postal no puede estar vacio'),
            // body('calle')
            //     .isLength({min: 3, max:30}) 
            //     .notEmpty().withMessage('la calle no puede estar vacia'),
            body('calleNumero')
                .isNumeric({ min: 1, max: 10000 }).withMessage('ingresar el numero de calle/solo numeros'),
            body('imagen')
                .custom((value, {req})=>{
                    const extensionName = req.files.map((x) => {return path.extname(x.path)})
                    return extensionName.some((ext) => extNames.includes(ext)) 
                }).withMessage(`solo se admiten archivos ${extNames.join(', ')}`)
                .custom((value, {req})=>{
                    const filesSizes = req.files.map((x) => {return x.size})
                    return !filesSizes.some((file) => file >= maxFileSize)
                }).withMessage(`el tamaño maximo permitido por imagen es ${maxFileSize/1024} KB`),
            // body('piso')
            //     .isLength({max:10}), 
            // body('departamento')
            //     .isLength({max:10}),
        ]
    },
    editUser: function () {
        return [
            body('nombre')
            .notEmpty().withMessage('Debe ingresar un nombre')
            .isLength({min: 2}).withMessage('debe tener al menos 2 caracteres'),
            body('apellido')
            .notEmpty().withMessage('Debe ingresar un apellido')
            .isLength({min: 2}).withMessage('debe tener al menos 2 caracteres'),
            body('email')
                .isEmail().withMessage('email invalido')
                .custom(async (value,{req}) => {

                    const usuario1 = await db.Users.findAll({paranoid: false})
                    const anotherUserWithSameEmail = usuario1.some((user) => user.id != req.params.id && user.email == value)
                    if (anotherUserWithSameEmail) {
                        throw new Error('El email ya está en uso');
                        }
   
                        return true;
                   }),
            body('fechaNacimiento')
                .isISO8601().withMessage('ingresar una fecha valida'),
            body('provincia')
                .notEmpty().withMessage('selecciona una provincia'),
            body('localidad')
                .notEmpty().withMessage('selecciona una localidad'),
            body('codigoPostal')
                .isNumeric({ min: 1, max: 10000 }).withMessage('solo numeros')
                .notEmpty().withMessage('el codigo postal no puede estar vacio'),
            // body('calle')
            //     .isLength({min: 3, max:30})
            //     .notEmpty().withMessage('la calle no puede estar vacia'),
            body('calleNumero')
                .isNumeric({ min: 1, max: 10000 }).withMessage('ingresar el numero de calle'),
            body('imagen')
                .custom((value, {req})=>{
                    if(req.files.length === 0){return true}
                    const extensionName = req.files.map((x) => {return path.extname(x.path)})
                    return extensionName.some((ext) => extNames.includes(ext))
                }).withMessage(`solo se admiten archivos ${extNames.join(', ')}`)
                .custom((value, {req})=>{
                    if(req.files.length === 0){return true}
                    const filesSizes = req.files.map((x) => {return x.size})
                    return !filesSizes.some((file) => file >= maxFileSize)
                }).withMessage(`el tamaño maximo permitido por imagen es ${maxFileSize/1024} KB`),
            // body('piso', 'no puede superar 10 caracteres')
            //     .isLength({max:10}),
            // body('departamento', 'no puede superar 10 caracteres')
            //     .isLength({max:10}) 
        ]
    },
    restore: function () {
        return [
            body('password')
                .notEmpty().withMessage('La contraseña no puede estar en blanco')
                .isLength({min: 8}).withMessage('la contraseña debe ser mayor a 8 caracteres')
                .custom(value => regexPassword.test(value)).withMessage('La contraseña debe contener letras mayúsculas, minúsculas, un número y un carácter especial.'),
            body('repeatPassword').custom((value, {req}) => {
                return value === req.body.password
            }).withMessage('las contraseñas no coinciden')
        ]
    }
}
