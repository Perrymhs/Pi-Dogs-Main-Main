import React, {useState, useEffect} from "react";
import { Link, useNavigate} from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { postDogs, getTemperaments } from "../actions";

export default function DogsCreate(){
    const dispatch = useDispatch()
    const temperaments = useSelector((state) => state.temperaments)
    const navigate = useNavigate()

    const [input,setInput] = useState({
        name:"",
        HeightMax:"",
        HeightMin:"",
        WeightMax:"",
        WeightMin:"",
        life_span: "",
        temperament:[],//lo seteo en un array para poder guardar la cantidad de temperamentos que quiera.
    })

    function handleChange(e){
        setInput({
            ...input,
            [e.target.name] : e.target.value  //cada vez que la funcion se ejecute a mi estado input ademas de lo que tiene agregale el target value de lo que esta modificando
        })
        console.log(input)
    }
    
    function handeSelect(e){
        setInput({
            ...input,
            temperament: [...input.temperament, e.target.value]
        })
        

        
    }
    
    useEffect(()=>{
        dispatch(getTemperaments())
    }, []);
    return (
        <div>
            <Link to = '/home'><button>Volver</button></Link>
            <h1>Crea Tu Propia Raza!</h1>
            <form>
                <div>
                  <label>Nombre:</label>
                  <input
                  type="text"
                  value={input.name}
                  name = "name"
                    onChange={handleChange}
                  />  
                </div>
                <div>
                    <label>Altura Maxima:</label>
                    <input
                    type="text"
                    value={input.HeightMax}
                    name = "HeightMax"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Altura Minima:</label>
                    <input
                    type="text"
                    value={input.HeightMin}
                    name = "HeightMin"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Peso Maximo:</label>
                    <input
                    type="text"
                    value={input.WeightMax}
                    name = "WeightMax"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Peso Minimo:</label>
                    <input
                    type="text"
                    value={input.WeightMin}
                    name = "WeightMin"
                    onChange={handleChange}
                    />
                </div>
                <div>
                    <label>Vida:</label>
                    <input
                    type="text"
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
        </div>
    )
}
        
        
