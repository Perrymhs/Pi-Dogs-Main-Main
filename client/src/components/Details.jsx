import React from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail, deletedById } from '../actions/index';
import { useEffect } from 'react';

import style from './Details.module.css';


export default function Detail(props){
    console.log(props)
    const navigate = useNavigate()
    const dog = useSelector(state => state.detail);
    const dispatch = useDispatch();
    const{id} = useParams();
    useEffect(() => {
        dispatch(getDetail(id));
        console.log(dog)
    }
    , [dispatch]);

    function handleDelete(){
      if(dog[0].id.includes("-")){
          dispatch(deletedById(id))
          alert("Raza eliminada")
          navigate('/home')
      }else{  
      alert("No se puede eliminar la Raza")
      }
    }

    const myDog = useSelector((state) => state.detail);
    return (
        <div className={style.cards}>
            {
                myDog.length>0 ?
                <div>
                    <img src={myDog[0].img? myDog[0].img : myDog[0].image} alt="" width="500px" height="700px"/>
                    <h1>{myDog[0].name}</h1>
                    
                    <h2>🦴Temperamento: {myDog[0].temperament+ " "}</h2>
                    <h2>🦴Peso Maximo: {myDog[0].weightMax}</h2>
                    <h2>🦴Peso Minimo: {myDog[0].weightMin}</h2>
                    <h2>🦴Altura Maxima: {myDog[0].heightMax}</h2>
                    <h2>🦴Altura Minima: {myDog[0].heightMin}</h2>
                    <h2>🦴Años de Vida: {myDog[0].life_span}</h2>
                    <button className={style.boton} onClick={()=>handleDelete()}>❌</button>
            <Link to="/home">
                <button className={style.btn}>↩</button>
            </Link>

                </div> : <p>Loading...</p>
            }
            </div>
    )
}