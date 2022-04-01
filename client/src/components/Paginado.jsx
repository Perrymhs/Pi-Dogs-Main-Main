import React from "react";

export function Paginado ({dogsPerPage, allDogs , paginado}){
    const pageNumbers = []

    for (let i=1; i<= Math.ceil(allDogs/dogsPerPage); i++){
        pageNumbers.push(i)
    }

    return (
        <div>
                { pageNumbers &&
                    pageNumbers.map(number => (
                      
                        <button key={number} onClick={()=> paginado(number)}>{number}</button>
                        ))}
            </div>
                )
            }
                      
            
            
                    


