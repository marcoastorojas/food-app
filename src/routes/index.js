const { Router } = require('express');
const dietRouter = require('./dietRouter');
const recipeRouter = require('./recipeRouter');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);
router.use("/diet",dietRouter)
router.use("/recipe",recipeRouter)

module.exports = router;
