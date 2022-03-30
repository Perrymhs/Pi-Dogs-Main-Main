
const {getAllInfo} = require ('../../Controllers/controllers')
const axios = require ('axios');
const router = require ('express').Router();
const {Temperament} = require ('../db')

router.get("/temperament", async (req, res) => {
    try {
      const allDogs = await getAllInfo();
      const temperament = [
        ...new Set(
          allDogs
            .map((e) => e.temperament)
            /* todos los t. en un array cuyos elementos son str */
            .join()
            .split(",")
  
          /* un array donde cada elemento es un unico temperamento en str */
        ),
      ]
        .sort()
        .filter((e) => e && e[0] === " ");

        const clearTemp = temperament.map((e) => e.trim());

      for (let i = 0; i < clearTemp.length; i++) {
        const e = clearTemp[i];
        Temperament.findOrCreate({
          where: { name: e },
        });
      }
  
      const AllTemperament = await Temperament.findAll();
      res.send(AllTemperament);
    } catch (error) {
      console.log(error);
    }
  });
  module.exports = router;
  