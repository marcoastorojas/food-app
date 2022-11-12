const { Router } = require("express")
const { postRecipe, addDietsInRecipe, getRecipes, getRecipe } = require("../controllers/recipeController")
const { validateBodyRecipe, validateDbName } = require("../middlewares/validatePostRecipe")
const recipeRouter = Router()

recipeRouter.get("/", getRecipes)
recipeRouter.put("/add-diet", addDietsInRecipe)
recipeRouter.post("/", validateBodyRecipe, validateDbName, postRecipe)
recipeRouter.get("/:idReceta", getRecipe)



module.exports = recipeRouter