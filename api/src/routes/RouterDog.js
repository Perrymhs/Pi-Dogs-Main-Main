const {getAllInfo} = require ('../../Controllers/controllers.js');
const {Router} = require('express');

const router = Router();
router.get('/', async (req, res) => {
    const info = await getAllInfo();
    res.json(info);
});


module.exports = router;
