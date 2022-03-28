const { Router } = require('express');
const RouterDog = require('../routes/RouterDog');
const {Dogs, Temperaments} = require('../db')
const RouterTemp = require('../routes/RouterTemp');

// Importar todos los routers;
// Ejemplo: const authRouter = require('./auth.js');



const router = Router();

// Configurar los routers
// Ejemplo: router.use('/auth', authRouter);

router.use("/", RouterDog);
router.use("/", RouterTemp);


module.exports = router;



