import React, {useState, useEffect} from "react";
import { Link} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDogs, getTemperaments } from "../actions";

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
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        }) 
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
    }, []);
    return (
        <div>
            <Link to = '/home'><button>Volver</button></Link>
            <h1>Crea Tu Propia Raza!</h1>
            <form onSubmit= {(e)=> handleSubmit(e)}>
                <div>
                  <label>Nombre:</label>
                  <input
                  type="text"
                  value={input.name}
                  name = "name"
                    onChange={handleChange}
                  />  
                  {errors.name && (
                      <p className="error">{errors.name}</p>
                  )}

                </div>
                <div>
                    <label>Altura Maxima:</label>
                    <input
                    type="number"
                    value={input.heightMax}
                    name = "heightMax"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Altura Minima:</label>
                    <input
                    type="number"
                    value={input.heightMin}
                    name = "heightMin"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Peso Maximo:</label>
                    <input
                    type="number"
                    value={input.weightMax}
                    name = "weightMax"
                    onChange={handleChange}
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
                <ul><li>{input.temperament.map(e => e +",")}</li></ul>
                <button type="submit">Crear Raza</button>
            </form>
            {input.temperament.map(e=>
                <div className="divTemp">
                    <p>{e}</p>
                    <button className="botonX" onClick={()=> handleDeleted(e)}>X</button>
                </div>
                )}        



        </div>
    )
}
        
        
