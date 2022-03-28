const {getAllInfo} = require ('../Controllers/controllers.js');
const axios = require ('axios');


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


