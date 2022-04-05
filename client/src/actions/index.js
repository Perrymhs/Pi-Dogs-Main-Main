import axios from 'axios';

export function getDogs(){
    return async function(dispatch){
        let json = await axios ("http://localhost:3001/dogs") //aca es donde se conecta el back con el front
        let temperaments= await axios ("http://localhost:3001/temperament")
        
        return dispatch({
            type: "GET_DOGS",
            temperaments: temperaments.data,
            payload: json.data
        })
    }
};

export function filterDogsbyName(payload){
    return {
        type: "FILTER_BY_NAME",
        payload
    }   
   
};

export function filterDogsbyTemperament(payload){
    return {
        type: "FILTER_BY_TEMPERAMENT",
        payload
    }
};
  

export function filterDogsbyWeight(payload){
   
    return{
        type:"FILTER_BY_WEIGHT",
        payload
    }
};

export function filterCreatedOrApi(payload){  
    console.log(payload)    
    return{
            type: "FILTER_CREATED",
            payload
        }
}

export function getNameDogs(name){
    return async function(dispatch){
        try{
            let json =await axios.get("http://localhost:3001/dogs?name="+ name);
            return dispatch({
                type: "GET_NAME_DOGS",
                payload: json.data  //es que lo que devuelve la ruta cuando le asigno algo por "name"
            })
        }catch(error){
            console.log(error)
        }
    }
}
//exporta la funcion getDogs con promesas
/* export const getDogs = () => {
    return (dispatch) => {
        axios.get("http:localhost:3001/dogs")
            .then(response => {
                dispatch({
                    type: 'GET_DOGS',
                    payload: response.data.message
                })
            })
            .catch(error => {
                console.log(error);
            })
    }
} */
