

function loguearRuta (req,res,next) {
    console.log(`Ingresando a: [${req.method}] ${req.url}`);
    next()
}

module.exports = loguearRuta