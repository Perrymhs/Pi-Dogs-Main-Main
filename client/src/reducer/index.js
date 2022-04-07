
const initialState = {
    dogs: [],
    temperaments: [],
    allDogs: [],
    detail:[],
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
            const allDogsTemp = state.allDogs;
            const tempFilter = action.payload === "temperament"
            ? allDogsTemp
            : allDogsTemp.filter(t => t.temperament?.includes(action.payload))
            return {
                ...state,
                dogs:tempFilter
            }
        
        
        case "FILTER_BY_WEIGHT":
        
        let allDogsWeight;
        if (action.payload === "weightMax"){
            let dogsMax = state.dogs.sort((a,b)=> {
                if(a.weightMax> b.weightMax) return -1;
                if(b.weightMax> a.weightMax) return 1;
                return 0
            })
        allDogsWeight= dogsMax
        } 
        if (action.payload === "weightMin"){
            let dogsMin = state.dogs.sort((a,b)=> {
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
        case "POST_DOGS":
            return {
                ...state,
            }

        case "GET_TEMPERAMENTS":
            return {
                ...state,
                temperaments: action.payload
            }

        case "FILTER_BY_NAME":
            //pasalo a ternario
            const sortedArr = action.payload === 'all'
            ? state.dogs 
            :    action.payload === 'asc'
            ? state.dogs.sort((a, b) => a.name.localeCompare(b.name)) 
            : state.dogs.sort((a, b) => b.name.localeCompare(a.name))
            return {
                ...state,
                dogs: sortedArr
            }

            


        case "FILTER_CREATED":
        
        let filteredDogs;
        if (action.payload === "createdAt"){
            let filterByCreated = state.allDogs.filter(e => e.id.length> 4 )
            filteredDogs = filterByCreated;
        }
        if (action.payload === "Api") {
            let aux = state.allDogs.filter((e) => e.id.length < 4);
            filteredDogs = aux;
          }

        if (action.payload === "all" ){
            let aux = state.allDogs.filter((e)=> e.id.length === e.id.length)
            filteredDogs= aux
        }
        console.log(filteredDogs)
        return {...state,
            dogs: filteredDogs} 

        
        case "GET_DETAIL":
            return {
                ...state,
                detail: action.payload            
            };

        case "DELETE_DOG":
            return {
                ...state,
            }
        
            default:
             return state
        
    }
}


export default rootReducer;

//

