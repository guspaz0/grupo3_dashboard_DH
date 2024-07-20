const db = require("../database/models")
const fs = require('fs');
const path = require('path');
// const usersFilePath = path.join(__dirname, '../data/users.json');
const users = require("../models/user");
// const Users = JSON.parse(fs.readFileSync(usersFilePath, 'utf-8'));

async function recordameMiddleware(req, res, next) {
try{
    if (req.cookies.recordame !== undefined && req.session.user === undefined) {
        
        const { recordame } = req.cookies;
        const email =  recordame
        let user = await db.Users.findOne({where:{email}})  
        if (user != undefined) {
                  req.session.user = user? user : {}
            return res.status(200).redirect('/')
        }
    
} 
    next();
}catch(error){return error}
}

module.exports = recordameMiddleware;
