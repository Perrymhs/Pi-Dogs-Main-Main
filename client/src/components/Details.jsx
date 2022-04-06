import React from 'react';
import {Link, useParams} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail } from '../actions/index';
import { useEffect } from 'react';


export default function Detail(props){
    console.log(props)
    const dispatch = useDispatch();
    const{id} = useParams();
    useEffect(() => {
        dispatch(getDetail(id));
    }
    , [dispatch]);

    const myDog = useSelector((state) => state.detail);
    return (
        <div>
            {
                myDog.length>0 ?
                <div>
                    <img src={myDog[0].img? myDog[0].img : myDog[0].image} alt="" width="500px" height="700px"/>
                    <h2>{myDog[0].name}</h2>
                    <h2>Temperamento: {myDog[0].temperament+ " "}</h2>
                    <h2>Peso Maximo: {myDog[0].weightMax}</h2>
                    <h2>Peso Minimo: {myDog[0].weightMin}</h2>
                    <h2>Altura Maxima: {myDog[0].heightMax}</h2>
                    <h2>Altura Minima: {myDog[0].heightMin}</h2>
                    <h2>Años de Vida: {myDog[0].life_span}</h2>
                    

                </div> : <p>Loading...</p>
            }
            <Link to="/home">
                <button>Volver</button>
            </Link>
            </div>
    )
}