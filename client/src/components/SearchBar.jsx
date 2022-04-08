import React from "react";
import { useState } from "react";
import { useDispatch } from "react-redux";
import {getNameDogs} from "../actions/index";
import style from './SearchBar.module.css';



export default function SearchBar(){
    const dispatch = useDispatch();
    const [ name, setName] =useState("");

    function handleInputChange(e){
        e.preventDefault();
        setName(e.target.value);
        
    }

    function handleSubmit(e){
        e.preventDefault();
        dispatch(getNameDogs(name));
       
    }

    return(
       
        <div className={style.search}>
            <input type= "text" className={style.searchTerm}
            placeholder="Buscar..."
            onChange={(e)=> handleInputChange(e)}
            />
            <button type="submit" className={style.searchButton} onClick={(e)=> handleSubmit(e)}>🔎</button>
            
       </div>
      
   ) 
       
          

            
    
}