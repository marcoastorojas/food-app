const {Router} = require("express")
const { getAlldiets, postDieta, getDietId } = require("../controllers/dietController")
const { validateDbName } = require("../middlewares/validatePostDiet")
const dietRouter = Router()

dietRouter.get("/",getAlldiets)
dietRouter.post("/",validateDbName,postDieta)
dietRouter.get("/:id",getDietId)

    


module.exports = dietRouter