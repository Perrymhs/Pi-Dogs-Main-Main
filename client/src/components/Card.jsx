import React from "react";

export default function Card ({image, name , temperament, weightMax, weightMin}) {
    return (
        <div>
            <img src={image} alt="" width="200px" height="250px" />
            <h3>{name}</h3>
            <p>Temperamento: {temperament}</p>
            <p>Peso Maximo: {weightMax}</p>
            <p>Peso Minimo: {weightMin}</p>
            
        </div>
    )
}