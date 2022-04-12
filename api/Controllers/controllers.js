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
        id: `${dog.id}`,
        name: dog.name,
        heightMax: alturaMax ? alturaMax : 1,  //le asigno valores por defecto por errores de la Api
        heightMin: alturaMin ? alturaMin : 1,
        weightMax: pesoMax ? pesoMax : 1,
        weightMin: pesoMin ? pesoMin : 1,
        life_span: dog.life_span,
        image: dog.image.url, //si no tiene imagen, para hacerle una por defecto sería ? dog.image : urldeimagen
        temperament: dog.temperament,
        
    }
})
return saveApi;
}



const getInfoDb = async () => {
return await Dog.findAll({
    include: { //tengo que incluir los datos del modelo Temperament para que me los traiga, si no nunca los va a traer
        model: Temperament,
        attributes: ['name'],
        through: {attributes:[]} //A travez de la tabla Temperament_Dog   
        
    }
})

}

const getAllInfo = async () =>{
  const infoApi = await getInfoApi();  // va a trae la info de la api  
    const infoDb = await getInfoDb(); // va a traer la info de la db
    let aux = await infoDb.map((e) => {
        return {
          id: e.id,
          name: e.name,
          heightMin: e.heightMin,
          heightMax: e.heightMax,
          weightMin: e.weightMin,
          weightMax: e.weightMax,
          life_span: e.life_span,
          image: e.image, //si no tiene imagen, para hacerle una por defecto sería ? dog.image : urldeimagen
          temperament: e.temperaments.map((e) => {
              return e.name;
            })
            .join(", "),
        };
    })
    const allInfo = infoApi.concat(aux); // va a concatenar la info de la api con la info de la db
    return allInfo;
}



    
        

module.exports = {getAllInfo}
