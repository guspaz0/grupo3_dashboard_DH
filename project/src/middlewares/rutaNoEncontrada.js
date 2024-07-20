
function rutaNoEncontrada (req,res) {
    res.status(404).render('404notFound' , {url: req.url})
}

module.exports = rutaNoEncontrada