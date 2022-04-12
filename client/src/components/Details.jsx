import React from 'react';
import {Link, useParams, useNavigate} from 'react-router-dom';
import {useDispatch, useSelector} from 'react-redux';
import { getDetail, deletedById, cleanDetail } from '../actions/index';
import { useEffect } from 'react';

import style from './Details.module.css';


export default function Detail(props){
    console.log(props)
    const navigate = useNavigate() //lo uso en el handledelete para  que me redireccione a la home
    const dog = useSelector(state => state.detail);
    const dispatch = useDispatch();
    const{id} = useParams();
    useEffect(() => {
        dispatch(getDetail(id));
        console.log(dog)
    }
    , [dispatch]);

    function handleClean(){
        dispatch(cleanDetail())
    }


    function handleDelete(){
      if(dog[0].id.includes("-")){
          dispatch(deletedById(id))
          alert("Raza eliminada")
          navigate('/home')
      }else{  
      alert("No se puede eliminar la Raza")
      }
    }

    let myDog = useSelector((state) => state.detail);
    myDog  =  myDog.length>0 ? myDog[0] : null  //si el elemento no es nulo lo va a mostrar
    return (
        <div className={style.cards}>
            {
                myDog ?
                <div>
                    <img src={myDog.img? myDog.img : myDog.image} alt="" width="500px" height="700px"/>
                    <h1>{myDog.name}</h1>
                    <h2>🦴Temperamento: {myDog.temperament+ " "}</h2>
                    <h2>🦴Peso Maximo: {myDog.weightMax}</h2>
                    <h2>🦴Peso Minimo: {myDog.weightMin}</h2>
                    <h2>🦴Altura Maxima: {myDog.heightMax}</h2>
                    <h2>🦴Altura Minima: {myDog.heightMin}</h2>
                    <h2>🦴Años de Vida: {myDog.life_span}</h2>
                    {
                    myDog.id.length > 5 &&
                        <button className={style.boton} onClick={()=>handleDelete()}>❌</button>
                    }
            <Link to="/home">
                <button className={style.btn}onClick={()=>handleClean()}>↩</button>
            </Link>
                </div> : <p className={style.loader}></p>
            }
            </div>
    )
}