import React from "react";
import {useState, useEffect} from "react";
import {useDispatch, useSelector}  from "react-redux";
import {getDogs, filterDogsbyName,filterDogsbyTemperament, filterDogsbyWeight, filterCreatedOrApi} from "../actions";
import Card from "./Card";
import {Link} from 'react-router-dom';
import {Paginado} from './Paginado';
import SearchBar from "./SearchBar";
import style from './Home.module.css';


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

    
   

    useEffect(() => {
        dispatch(getDogs())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getDogs())
        setCurrentPage(1)

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

    function handleFilterCreatedOrApi(e){
        e.preventDefault()
        dispatch(filterCreatedOrApi(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    function handleFilterForName(e){
        e.preventDefault()
        dispatch(filterDogsbyName(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }
   


    return (
        <div className={style.stripes}>
           
      
        <nav>
            <button><Link to = '/dogs'>Crea Tu Mascota</Link></button>
            <div>
                <SearchBar/>
                </div>
            <button onClick={e => {handleClick(e)}}>Recargar</button>
        </nav>
         
         
         <div>
             
            
            
             
            
       
      
            
            <select className={style.select} onChange={e => handleFilterForName(e)}>
            <option value= "all">Nombre</option>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            <select className={style.select} onChange={e=> handleFilterWeight(e)}>
                <option value= "weightMax">Peso</option>
                <option value='weightMax'>Peso Maximo</option>
                <option value='weightMin'>Peso Minimo</option>
            </select>
            <select className={style.select}  onChange={e => handleFilterTemperament(e)}>
                <option value= 'temperament'>Temperamentos</option>
                {allTemperaments.map((element)=> (
                    <option value={element.name}key={element.id}>
                        {element.name}
                    </option>
                ))}
            </select>
            <select className={style.select} onChange={e => handleFilterCreatedOrApi(e)}>
            <option value='all'>Origen</option>
                <option value='createdAt'>Creados</option>
                <option value='Api'>Existentes</option>
            </select>
           <div className={style.paginado}>
           <Paginado dogsPerPage = {dogsPerPage} allDogs = {allDogs.length}  paginado = {paginado}/>
           </div>
           
         
    
    
        </div>  
        <div className={style.container}> 
            {
                currentDogs?.map((el) => {
                    return (
                <div key={el.id}>
                    <Link to={'/home/' + el.id}>
                        <Card name={el.name} image={el.img ? el.img : el.image } weightMax={el.weightMax}  temperament={el.temperament} weightMin={el.weightMin}/>
                    </Link>
    </div>
            );
        })
    }
    </div>
         
            </div>
    )
}