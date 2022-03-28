const {getAllInfo} = require ('../Controllers/controllers.js');
const axios = require ('axios');



//crea un controlador de temperament haciendo maps y separando los datos
/* const getTemperament = async () => {
    const temperament = await getAllInfo();
    const temparray= []
    const temperamentMap = {};
    temperament.forEach(e => {
      temperamentMap[e.name] = e.temperament; 
         temparray.push(e.temperament);
    });

    temparray.map(e => {
        return 
        
    })
    return temparray;
};
 */
// crear un controlador de temperament haciendo un reduce
const getTemperament = async () => {
    const temperament = await getAllInfo();
    const temparray= []
    const temperamentMap = {};
    temperament.forEach(e => {
        temperamentMap[e.name] = e.temperament;
        temparray.push(e.temperament);
    });
    const reducer = (accumulator, currentValue) => accumulator + currentValue;
    const result = temparray.reduce(reducer);
    const result2= result.split(', ');
    const tempSet = [...new Set(result2)];
    return tempSet;
};

module.exports = {getTemperament}

