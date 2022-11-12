const { Diet } = require("../db")

const validateDbName = async (req, res, next) => {
    let errors = {}
    const { name } = req.body
    if (!name) errors.name = "el parametro nombre es obligatorio"
    const diet = await Diet.findOne({ where: { name } })
    if (diet) errors.repetido = "el nombre de la dieta debe ser unico"
    if (Object.values(errors).length > 0) return res.status("400").json({ errors })
    next()
}

module.exports = {
    validateDbName
}