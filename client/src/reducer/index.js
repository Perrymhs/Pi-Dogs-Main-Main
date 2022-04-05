
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
        
        case "GET_NAME_DOGS":
            return {
                ...state,
                dogs: action.payload,
                allDogs: action.payload,
               
            }
        
        case "FILTER_BY_TEMPERAMENT":
        
        const allDogsTemp = state.allDogs.filter(e => {if(e.temperament && e.temperament.includes(action.payload))return e})
            return {
                ...state,
                dogs: allDogsTemp
            }
        case "FILTER_BY_WEIGHT":
        
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

        case "FILTER_BY_NAME":
            let allDogsName;
            if (action.payload === "asc"){
                let dogsNameAsc = state.allDogs.sort((a,b) =>{
                    if(a.name> b.name) return 1;
                    if(b.name> a.name) return -1;
                    return 0
                })
                allDogsName = dogsNameAsc
            }
            if (action.payload ==="desc"){
                let dogsNameDesc = state.allDogs.sort((a,b)=>{
                    if(a.name>b.name) return -1;
                    if(b.name>a.name) return 1;
                    return 0
                })
                allDogsName =dogsNameDesc
            }
            return {
                ...state,
                dogs: allDogsName
            }


        case "FILTER_CREATED":
        console.log(state.allDogs[1].id)
        let filteredDogs;
        if (action.payload === "createdAt"){
            let filterByCreated = state.allDogs.filter(e => e.createdAt)
            filteredDogs = filterByCreated;
        }
        if (action.payload === "Api") {
            let aux = state.allDogs.filter((e) => e.id.length < 4);
            filteredDogs = aux;
          }
        console.log(filteredDogs)
        return {...state,
            dogs: filteredDogs}

        default:
             return state
        
    }
}


export default rootReducer;

//

