import React from  'react';
import {Link} from 'react-router-dom'; // link sirve para hacer un enlace entre paginas
import style from './LandingPage.module.css';
export default function LandingPage(){
    return (
        <div className={style.landingpage}>
            <h1 className={style.textgradient}>Bienvenidos!
            <Link to="/home">
            <button className={style.btn}>Ingresar</button>
            </Link>
            </h1>
        </div>
    )
}

