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


 router.post('/dog', async (req, res, next)  => {
    const {
        name,
        heightMax,
        heightMin,
        weightMax,
        weightMin,
        temperament, 
        life_span,
        image,
      } = req.body;
      try {
        let NewDog = await Dog.create({
          name,
          heightMax,
          heightMin,
          weightMax,
          weightMin,
          life_span,
          image,
        });
       
        let temperamentNewDog = await Temperament.findAll({
          where: { name: temperament },
        });
       
        NewDog.addTemperament(temperamentNewDog);
        res.send("Tu nueva raza perruna ha sido agregada");
      } catch (error) {
        res.send(error);
      }
})  

router.delete('/deleted/:id', async (req, res) => {
    let { id } = req.params;
    try{
      if(id){
        await Dog.destroy({
          where: { id: id }
        });
      }
      return res.send({msg: "Raza deleted"});
    }catch(error){
      console.log(error);
    }
  });






    


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
