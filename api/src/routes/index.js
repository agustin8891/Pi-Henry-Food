const { Router } = require('express');
// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');
const recipeRoute = require('./Recipe')
const dietsRoute=require('./Diet')


const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use('/recipes', recipeRoute);
router.use('/diets', dietsRoute);


module.exports = router;
