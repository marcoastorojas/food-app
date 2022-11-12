const { Recipe } = require("../db")

const validateBodyRecipe = async (req = request, res = response, next) => {
    const { name, healthScore, overview, steps } = req.body
    let errors = {}
    if (!name || !healthScore || !overview || !steps) {
        errors.body = "faltan datos para crear una receta"
    }
    if (typeof (healthScore) !== "number" || healthScore < 0 || healthScore > 100) {
        errors.healthScore = "healtScore debe ser un numero y debe estar entre 0 y 100"
    }
    if (name?.length > 35) {
        errors.name = "el nombre no debe pasar de los 35 caracteres "
    }
    if (Object.values(errors).length > 0) return res.status(400).json({ errors })
    next()
}
const validateDbName = async (req = request, res = response, next) => {
    const { name } = req.body
    const recipe = await Recipe.findOne({ where: { name } })
    if (recipe) return res.status(400).json({ errors: { repetido: "el nombre de la receta debe ser unica" } })
    next()
}

module.exports = {
    validateBodyRecipe,
    validateDbName
}