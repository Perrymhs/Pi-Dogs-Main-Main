
const initialState = {
    dogs: [],
    
}

function rootReducer (state = initialState, action){  
    switch(action.type){
        case "GET_DOGS":
            return {
                ...state,
                dogs: action.payload  //en mi estado caracters que es un arreglo vacio, enviame todo lo que te envie la accion de getDogs
            }
            default:
                return state;
    }
}

export default rootReducer;

//

