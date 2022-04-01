import React from  'react';
import {Link} from 'react-router-dom'; // link sirve para hacer un enlace entre paginas

export default function LandingPage(){
    return (
        <div>
            <h1>Bievenidos!
            <Link to="/home">
            <button>Ingresar</button>
            </Link>
            </h1>
        </div>
    )
}

