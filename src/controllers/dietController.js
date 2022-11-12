const { request, response } = require("express")
const { Diet, Recipe } = require("../db")

const getAlldiets = (req = request, res = response) => {
    Diet.findAll({
        include: [{ model: Recipe }]
    })
        .then(dietas => res.status(200).json(dietas))
        .catch(error => res.status(400).json({ error }))
}

const getDietId = (req = request, res = response) => {
    const { id } = req.params
    Diet.findByPk(id, {
        include: [{ model: Recipe, include:[{model:Diet}] }]
    })
        .then(dieta => res.status(200).json(dieta))
        .catch(error => res.status(400).json({ error }))
}

const postDieta = async (req =  request, res = response) => {
    try {
        const newDiet = await Diet.create(req.body)
        res.status(201).json(newDiet)

    } catch (error) {
        res.status(500).json({ errors: { error: error.message } })
    }
}


module.exports = {
    getAlldiets,
    postDieta,
    getDietId
}
