const payments = require('../models/payments');

module.exports = {
    all: async function (req,res) {
        try {
            const response = await payments.all(req.query)
            res.status(200).json(response)
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