const { Router } = require('express');
const axios = require ('axios');
const {Dog, Temperament} = require('../../api/src/db.js');




const getInfoApi =  async () => {
const apiUrl = await axios.get('https://api.thedogapi.com/v1/breeds');
const saveApi = await apiUrl.data.map((dog)=>{
    const peso = dog.weight.metric.split("-")
    const altura = dog.height.metric.split("-")
    const pesomin = peso[0].trim();
    const pesomax = parseInt(peso[1]);
    const alturamin = altura[0].trim();
    const alturamax = altura[1];
    return {
        name: dog.name,
        heightMax: alturamax ? alturamax : '',
        heightMin: alturamin ? alturamin : '',
        weightMax: pesomax ? pesomax : '',
        weightMin: pesomin ? pesomin : '',
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
