const {getAllInfo} = require('../../Controllers/controllers.js');
const {Router} = require('express');
/* const Dog = require('../models/Dog.js');
const Temperament = require('../models/Temperament.js'); */
const axios = require('axios');
const { Dog, Temperament} = require('../db')

const router = Router();
router.get('/', async (req, res) => {
    const info = await getAllInfo();
    res.json(info);
}); 
 
router.get('/dogs', async (req, res) => {
    let {name} = req.query;
    const totalDogs = await getAllInfo();
    if (name) {
      let dogsName = await totalDogs.filter(e => e.name.toLowerCase().includes(name.toLowerCase()));
       dogsName.length > 0 ? 
       res.status(200).send(dogsName) :
       res.status(404).send('No hay perros con ese nombre');
    }
    else{
        res.status(200).send(totalDogs);
    }
});

router.get('/dogs/:id', async (req, res) => {
    let { id } = req.params;
    const totalDogs = await getAllInfo();
    let dogsId = await totalDogs.filter(e => e.id.toString() === id.toString());
     
    if (dogsId.length > 0) return res.status(200).send(dogsId) 
    else res.status(404).send('No hay perros con ese id');

    ;
});


router.post('/dogs', async (req, res, next)  => {
    console.log("No funca hermano se re pico")
    try {
        const { name, heightMax, heightMin,weightMax ,weightMin, life_span, image } = req.body;
        const newDog = await Dog.create({
            name,
            heightMax,
            heightMin,
            weightMax,
            weightMin,
            life_span,
            image

        });
        res.status(201).send(newDog);
    } catch (error) {
        next(error);
    }
}) 




    


/* 
{
    "name":"Alfredito",
    "heightMax": 8,
    "heightMin": 11,
    "weightMax": 7,
    "weightMin": 5,
    "life_span": 12,
    "image": "https://www.tuexperto.com/wp-content/uploads/2016/09/URL_perro_01.jpg",
    "createInDb": true,
    "temperaments": ["Friendly"]
}
*/

module.exports = router;
