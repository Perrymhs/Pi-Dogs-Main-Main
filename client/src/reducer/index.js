
const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
}

function rootReducer (state = initialState, action){  
    switch(action.type){
        case "GET_DOGS":
            return {
                ...state,
                temperaments: action.temperaments,
                dogs: action.payload,  //en mi estado caracters que es un arreglo vacio, enviame todo lo que te envie la accion de getDogs
                allDogs: action.payload
            }
        
        
        case "FILTER_BY_TEMPERAMENT":
        console.log(state.dogs[1].temperament)    
        const allDogsTemp = state.allDogs.filter(e => {if(e.temperament && e.temperament.includes(action.payload))return e})
            return {
                ...state,
                dogs: allDogsTemp
            }
        case "FILTER_BY_WEIGHT":
        console.log(state.allDogs[1].weightMin)
        let allDogsWeight;
        if (action.payload === "weightMax"){
            let dogsMax = state.allDogs.sort((a,b)=> {
                if(a.weightMax> b.weightMax) return -1;
                if(b.weightMax> a.weightMax) return 1;
                return 0
            })
        allDogsWeight= dogsMax
        } 
        if (action.payload === "weightMin"){
            let dogsMin = state.allDogs.sort((a,b)=> {
                if(a.weightMax>b.weightMax)return 1;
                if(b.weightMax>a.weightMax)return -1;
                return 0
            })
            allDogsWeight=dogsMin
        }
        return {
            ...state,
        dogs: allDogsWeight
    }
        
            default:
                return state;
    }
}

export default rootReducer;

//

