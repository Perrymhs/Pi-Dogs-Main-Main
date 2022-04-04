import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector}  from "react-redux";
import {getDogs, filterDogsbyName,filterDogsbyTemperament, filterDogsbyWeight} from "../actions";
import Card from "./Card";
import {Link} from 'react-router-dom';
import {Paginado} from './Paginado';

export default function Home (){

    const dispatch = useDispatch()
    const allDogs = useSelector((state) => state.dogs)
    const allTemperaments = useSelector((state)=> state.temperaments)
    const [currentPage, setCurrentPage] = useState(1);
    const [dogsPerPage, setDogsPerPage] = useState(8); //cantidad de cartas por pagina va a mostrar
    const indexOfLastDog = currentPage * dogsPerPage; //8 cartas por pagina
    const indexOfFirstDog = indexOfLastDog - dogsPerPage; //0
    const currentDogs = allDogs.slice(indexOfFirstDog, indexOfLastDog);
    const [order, setOrder] = useState("")

    const paginado = (pageNumber) => {
        setCurrentPage(pageNumber)
    }

    
   console.log(allTemperaments)

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getDogs())

    }

    function handleFilterName(e){
        e.preventDefault()
        dispatch(filterDogsbyName(e.target.value))
    }   

    function handleFilterTemperament(e){
        e.preventDefault()
        dispatch(filterDogsbyTemperament(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    function handleFilterWeight(e){
        e.preventDefault()
        dispatch(filterDogsbyWeight(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
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
            <select onChange={e => handleFilterName}>
                <option disabled>Nombre</option>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            <select onChange={e=> handleFilterWeight(e)}>
                <option value= "Peso">Peso</option>
                <option value='weightMax'>Peso Maximo</option>
                <option value='weightMin'>Peso Minimo</option>
            </select>
            <select onChange={e => handleFilterTemperament(e)}>
                <option value= 'temperament'>Temperamento</option>
                {allTemperaments.map((element)=> (
                    <option value={element.name}key={element.id}>
                        {element.name}
                    </option>
                ))}
            </select>
            <select>
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