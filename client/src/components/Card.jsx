import React from "react";
import style from './Card.module.css';


export default function Card ({image, name , temperament, weightMax, weightMin}) {
    return (
        <div className={style.cards}>
            <img src={image} alt="" width="200px" height="250px" />
            <h3>{name}</h3>
            <p>Temperamento: {temperament}</p>
            <p>Peso Maximo: {weightMax}</p>
            <p>Peso Minimo: {weightMin}</p>
            
        </div>
    )
}