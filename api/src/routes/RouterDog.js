const {getAllInfo} = require ('../../Controllers/controllers.js');
const {Router} = require('express');

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



module.exports = router;
