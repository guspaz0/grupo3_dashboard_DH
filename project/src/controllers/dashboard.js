//const dashboard = require('../models/payments');

module.exports = {
    index: async function (req,res) {
        try {
            res.status(200).render('dashboard/dashboard')
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
    detail: async function (req,res) {
        try {
            const response = await payments.detallePago(req.params.id)
            res.status(200).json(response)
        } catch (error) {
            res.status(500).json(error.message)
        }
    },
}