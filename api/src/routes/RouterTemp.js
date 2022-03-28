
//importa getTemperament
const {getTemperament} = require('../../Controllers/tempController');
const {Router} = require('express');
const { axios } = require('axios');



const router = Router();


router.get('/temperament', async (req, res) => {
    const temperament = await getTemperament();
    res.json(temperament);
});




module.exports = router;
