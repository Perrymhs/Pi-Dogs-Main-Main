import React from "react";
import { useEffect} from "react";
import {useDispatch, useSelector}  from "react-redux";
import {getDogs} from "../actions";
import Card from "./Card";
import {Link} from 'react-router-dom';


export default function Home (){

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    /* const allTemp = useSelector((state) => state.temp) */

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getDogs())
    }


    return (
        <div>
         <Link to = '/dogs'>Crea Tu Mascota</Link>   
         <h1>Aguante el perro papa, se lo come vivo al gato</h1>
         <button onClick={e => {handleClick(e)}}>
           Volver a cargar todos los perros   
        </button>
        <div>
            <select>
                <option value='all'>Nombre</option>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            <select>
                <option value='weight'>Peso</option>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            <select>
                <option value='temp'>Temperamento</option>
            </select>
            <select>
                <option value='All'>Todos</option>
                <option value='Created>'>Creados</option>
                <option value='Api'>Existentes</option>
            </select>
            {
        allDogs?.map((el) => {
            return (
                <div>
                    <Link to={'/home/' + el.id}>
                        <Card name={el.name} image={el.image} weightMax={el.weightMax} key={el.id}/>
                    </Link>
                </div>
            );
        })
    }
        </div>   
            </div>
    )
}