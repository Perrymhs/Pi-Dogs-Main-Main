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

    const paginado = (pageNumber) => { //funcion que me permite cambiar de pagina
        setCurrentPage(pageNumber)// y que me muestre las cartas correspondientes a la pagina que seleccione el usuario 
    }

    
   

    useEffect(() => { //cuando se cargue la pagina se ejecuta el dispatch para traer los datos de la api y guardarlos en el store 
        dispatch(getDogs())
    }, [dispatch])

    function handleClick(e){
        e.preventDefault()
        dispatch(getDogs())
        setCurrentPage(1)

    }

    function handleFilterTemperament(e){//filtra por temperamento
        e.preventDefault()
        dispatch(filterDogsbyTemperament(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    function handleFilterWeight(e){ //filtra por peso
        e.preventDefault()
        dispatch(filterDogsbyWeight(e.target.value))
        setCurrentPage(1)
        setOrder(e.target.value)
    }

    function handleFilterCreatedOrApi(e){ //filtro por si fue creado o por api 
        e.preventDefault()//preventDefault para que no se recargue la pagina al hacer click en el boton 
        dispatch(filterCreatedOrApi(e.target.value))//e.target.value para que me muestre los datos de la api o los creados por el usuario
        setCurrentPage(1)//para que no se quede en la pagina anterior
        setOrder(e.target.value) //setOrder es para que no se repita el filtro
    }
    
    function handleFilterForName(e){  //esta funcion filtra por nombre
        dispatch(filterDogsbyName(e.target.value))//e.target.value para que me muestre los datos de la api o los creados por el usuario
        setCurrentPage(1)
        setOrder(e.target.value)
    }
  



    return (
        <div className={style.stripes}>
        <nav >
            {/* <button  className={style.boton} ></button> */}<Link to = '/dogs'  >Crea Tu Mascota🐾</Link>
            <div>
                <SearchBar/>
                </div>
            <button className={style.boton} onClick={e => {handleClick(e)}}>Home🏠</button>
        </nav>
         <div>
            <select value= "disabled" className={style.select} onChange={e => handleFilterForName(e)}>
            <option value= "">Nombre</option>
                <option value='asc'>Ascendente</option>
                <option value='desc'>Descendente</option>
            </select>
            <select  value= "disabled" className={style.select} onChange={e=> handleFilterWeight(e)}>
                <option value= "weightMax">Peso</option>
                <option value='weightMax'>Peso Maximo</option>
                <option value='weightMin'>Peso Minimo</option>
            </select>
            <select  value= "disabled" className={style.select}  onChange={e => handleFilterTemperament(e)}>
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
                currentDogs?.map((dog) => {
                    return (
                <div key={dog.id}>
                    <Link to={'/home/' + dog.id}>
                        <Card 
                        name={dog.name} 
                        image={dog.img ? dog.img : dog.image } 
                        weightMax={dog.weightMax}  
                        temperament={dog.temperament} 
                        weightMin={dog.weightMin}
                        api={dog.Api}
                        />
                        
                    </Link>
    </div>
            );
        })
    }
    </div>
         
            </div>
    )
}
           
      
           
         
    
    
         
         
             
            
            
             
            
       
      
            