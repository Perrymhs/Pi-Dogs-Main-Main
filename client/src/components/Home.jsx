import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector}  from "react-redux";
import {getDogs} from "../actions";
import Card from "./Card";
import {Link} from 'react-router-dom';
import {Paginado} from './Paginado';

export default function Home (){

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8); //cantidad de cartas por pagina va a mostrar
    const indexOfLastDog = currentPage * dogsPerPage; //8 cartas por pagina
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; //0
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);


    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }


    /* const allTemp = useSelector((state) => state.temp) */

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    function handleClick(e){
        console.log(allDogs)
        console.log(dogsPerPage)
        e.preventDefault()

        dispatch(getDogs())
    }


    return (
        <div>
         <Link to = '/dogs'>Crea Tu Mascota</Link>   
         <h1>Un monton de perros</h1>
         <div>
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
           <Paginado
           dogsPerPage = {dogsPerPage}
           allDogs = {allDogs.length}
           paginado = {paginado}/>
          
        </div>
            {
        currentDogs?.map((el) => {
            return (
                <div  key={el.id}>
                    <Link to={'/home/' + el.id}>
                        <Card name={el.name} image={el.image} weightMax={el.weightMax}  temperament={el.temperament} weightMin={el.weightMin}/>
                    </Link>
                </div>
            );
        })
    }
        </div>   
            </div>
    )
}