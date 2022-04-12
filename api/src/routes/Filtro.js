const router = require ("express").Router()

const {getAllInfo} = require('../../Controllers/controllers.js');

router.get("/", async (req ,res)=>{
    const allDogs = await getAllInfo()
    let dogsMin = allDogs.sort((a,b)=> {
        if(a.weightMin>b.weightMin)return 1;
        if(b.weightMin>a.weightMin)return -1;
        return 0
    })
    res.send(200, dogsMin)
})

module.exports = router