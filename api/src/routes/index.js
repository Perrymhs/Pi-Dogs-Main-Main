const { Router } = require('express');
const RouterDog = require('../routes/RouterDog');
const {Dogs, Temperaments} = require('../db')

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');

//importa getTemperament
const getTemperament = require('../../controllers/tempController');

const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", RouterDog);


module.exports = router;



