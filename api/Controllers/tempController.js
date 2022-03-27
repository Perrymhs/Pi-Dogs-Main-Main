const axios = require ('axios');


const getTemperament = async () => {
    const apiUrl = await axios.get('https://api.thedogapi.com/v1/temperaments');
    const saveApi = await apiUrl.data.map((temperament)=>{
        return {
            name: temperament.name,
        }
    })
    return saveApi;
}


module.exports = {getTemperament}
