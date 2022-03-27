const axios = require ('axios');
const {Dog, Temperament} = require('../../api/src/db.js');
const router = require('../src/routes/RouterDog.js');




const getInfoApi =  async () => {
const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
const saveApi = await apiUrl.data.map((dog)=>{
    const peso = dog.weight.metric.split("-")
    const altura = dog.height.metric.split("-")
    const pesoMin = parseInt(peso[0]);
    const pesoMax = parseInt(peso[1]);
    const alturaMin = parseInt(altura[0]);
    const alturaMax = parseInt(altura[1]);
    return {
        id: dog.id,
        name: dog.name,
        heightMax: alturaMax ? alturaMax : '',
        heightMin: alturaMin ? alturaMin : '',
        weightMax: pesoMax ? pesoMax : '',
        weightMin: pesoMin ? pesoMin : '',
        life_span: dog.life_span,
        image: dog.image.url,
        temperament: dog.temperament,
    }
})
return saveApi;
}

const getInfoDb = async () => {
return await Dog.findAll({
    include: {
        model: Temperament,
        attributes: ['name'],
        through: {attributes:[]} //A travez de la tabla Temperament_Dog   
 
    }
})
}

const getAllInfo = async () =>{
  const infoApi = await getInfoApi();  // va a guardar la info de la api  
    const infoDb = await getInfoDb(); // va a guardar la info de la db
    const allInfo = infoApi.concat(infoDb); // va a concatenar la info de la api con la info de la db
    return allInfo;
}



    
        

module.exports = {getAllInfo}
