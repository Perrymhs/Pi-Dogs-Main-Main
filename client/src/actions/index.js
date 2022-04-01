import axios from 'axios';
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

export function getDogs(){
    return async function(dispatch){
        let json = await axios ("http://localhost:3001/dogs") //aca es donde se conecta el back con el front
        
        
        return dispatch({
            type: "GET_DOGS",
            payload: json.data

        })

            
    }
}