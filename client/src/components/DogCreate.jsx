import React, {useState, useEffect} from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDogs, getTemperaments } from "../actions";
import style from './DogCreate.module.css';

//input es mi estado local
function validate(input){
    let errors = {};
    if(!input.name){
        errors.name = "*El nombre es requerido";
    }
    if(!input.weightMax){
        errors.weightMax = "*El peso maximo es requerido";
    }
    if(!input.weightMin){
        errors.weightMin = "*El peso minimo es requerido";
    }
    
    return errors;

}

export default function DogsCreate(){
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)
    const [errors, setErrors] = useState({})

 
    const [input,setInput] = useState({
        name:"",
        heightMax:0,
        heightMin:0,
        weightMax:0,
        weightMin:0,
        life_span: 0,
        temperament:[]//lo seteo en un array para poder guardar la cantidad de temperamentos que quiera.
    })

    function handleChange(e){
        if(e.target.name === "heightMin"||e.target.name === "heightMax"|| e.target.name=== "weightMax"||e.target.name === "weightMin"||e.target.name === "life_span" ){
            if(e.target.value> 80){
                e.target.value = 80
                alert ("No puede ingresar ese valor")
            }
            if(e.target.value<0){
                e.target.value= 0
                alert ("No puede ingresar ese valor")
            }
           
        }
        
        setInput({
            ...input,
            [e.target.name] : e.target.value  //cada vez que la funcion se ejecute a mi estado input ademas de lo que tiene agregale el target value de lo que esta modificando
        })
        setErrors(validate({
            ...input,
            [e.target.name] : e.target.value
            

        }))
        console.log(input)
    }
    
    function handeSelect(e){
        if (input.temperament.length < 5) { //creo para que si tiene menos de 5 temperamentos los pueda ingresar
            setInput({
              ...input,
              temperament: [...input.temperament, e.target.value],
            });
            const newArray = input.temperament;
            const find = newArray.indexOf(e.target.value);
      
            if (find >= 0) {
              newArray.splice(find, 1); //si lo encuentra al temperamento, lo elimina y que borre solo 1
            } else {
              newArray.push(e.target.value);
            }
            setInput({
              ...input,
              temperament: newArray,
            });
       
          } else {
            alert("The created dog can only have 5 temperaments at max");
          }
        }
    function handleDeleted(e){
        setInput({
            ...input,
            temperament: input.temperament.filter(temp => temp !== e)
        })
    }

    function handleSubmit(e){
        e.preventDefault(e)
        console.log(input)
        dispatch(postDogs(input))
        alert ("¡Raza Creada!")
        setInput({
            name:"",
            heightMax:0,
            heightMin:0,
            weightMax:0,
            weightMin:0,
            life_span: 0,
            image:"",
            temperament:[],
        })
       
    }
    
    useEffect(()=>{
        dispatch(getTemperaments())
    }, [dispatch]);
    return (
        <div className={style.form}>
            <Link to = '/home'><button>Volver</button></Link>
            <h1>Crea Tu Propia Raza!</h1>
            <form  onSubmit= {(e)=> handleSubmit(e)}>
                <div>
                  <label>Nombre:</label>
                  <input
                  type="text"
                  value={input.name}
                  name = "name"
                    onChange={handleChange}
                    required
                  />  
                  {errors.name && (
                      <p className="error">{errors.name}</p>
                  )}

                </div>
                <div>
                    <label>Altura Maxima:</label>
                    <input
                    type="number"
                    min= "0"
                    max= "50"
                    value={input.heightMax}
                    name = "heightMax"
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label>Altura Minima:</label>
                    <input
                    type="number"
                    value={input.heightMin}
                    name = "heightMin"
                    onChange={handleChange}
                    required
                    />
                </div>
                <div>
                    <label>Peso Maximo:</label>
                    <input
                    type="number"
                    value={input.weightMax}
                    name = "weightMax"
                    onChange={handleChange}
                    required
                    />
                    {errors.weightMax && (
                        <p className="error">{errors.weightMax}</p>
                    )}

                </div>
                <div>
                    <label>Peso Minimo:</label>
                    <input
                    type="number"
                    value={input.weightMin}
                    name = "weightMin"
                    onChange={handleChange}
                    required
                    />
                    {errors.weightMin && (
                        <p className="error">{errors.weightMin}</p>
                    )}
                </div>
                <div>
                    <label>Años de Vida:</label>
                    <input
                    type="number"
                    value={input.life_span}
                    name = "life_span"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Imagen:</label>
                    <input
                    type="text"
                    value={input.image}
                    name="image"
                    onChange={handleChange}
                    />                
                </div>
                <select onChange={(e) => handeSelect(e)}>
                    {temperaments.map((temp)=>(
                        <option key={temp.id} value={temp.name}>{temp.name}</option>
                    ) )}
                    
                </select >
                <ul><li> Temperamentos:{input.temperament.map(e => e +",")}</li></ul>
                <button type="submit">Crear Raza</button>
            </form>
            <div className={style.deletedbtn}>{input.temperament.map(e=>
                <div className="divTemp">
                    
                    <p>{e}</p>
                    <button className="botonX" onClick={()=> handleDeleted(e)}>X</button>
                    
                </div>
                )}        
                </div>


        </div>
    )
}
        
        
