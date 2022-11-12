const { request, response } = require("express")
const { Recipe, Diet } = require("../db")
const { Op } = require("sequelize")
const getRecipes = async (req = request, res = response) => {
    const { name: nombre } = req.query

    try {
        if (nombre) {
            const listRecipes = await Recipe.findAll({
                where: { name: { [Op.iLike]: `%${nombre}%` } },
                include: [{ model: Diet, attributes: ["id", "name"] }]
            })
            // if (!listRecipes.length) return res.status(404).json({ error: `has no results for name :${nombre}` })
            return res.status(200).json({ data: listRecipes })
        }
        const allRecipes = await Recipe.findAll(
            {
                include: [{ model: Diet, attributes: ["id", "name"] }]
            }
        )
        res.status(200).json({ data: allRecipes })
    } catch (error) {
        res.status(404).json(error.message)
    }

}

const postRecipe = async (req = request, res = response) => {
    const { diets } = req.body
    try {
        const newRecipe = await Recipe.create(req.body)
        await newRecipe.addDiets(diets)
        res.status(201).json(newRecipe)

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const addDietsInRecipe = async (req = request, res = response) => {
    const { diets, id_recipe } = req.body
    if (!diets || !id_recipe) return res.status(400).json({ error: "faltan datos" })
    try {
        const recipe = await Recipe.findByPk(id_recipe)
        await recipe.addDiets(diets)
        res.status(201).json({ message: "conexion creada" })

    } catch (error) {
        res.status(400).json({ error: error.message })
    }
}

const getRecipe = async (req = request, res = response) => {
    const { idReceta } = req.params
    const id = Number(idReceta)
    if (!id) return res.status(400).json({ message: "must be a valid id" })

    const recipe = await Recipe.findOne(
        {
            where: { id },
            include: [{ model: Diet, attributes: ["id", "name"] }]
        },
    )
    if (!recipe) return res.status(404).json({ message: `no data for id ${idReceta}` })
    res.status(200).json(recipe)
}


module.exports = {
    getRecipes,
    postRecipe,
    addDietsInRecipe,
    getRecipe
}