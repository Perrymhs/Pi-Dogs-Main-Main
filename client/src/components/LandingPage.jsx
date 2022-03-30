import React from  'react';// es la libreria que permite crear componentes
import {Link} from 'react-router-dom'; // link sirve para hacer un enlace entre paginas

export default function LandingPage(){
    return (
        <div>
            <h1>Bievenidos!
            <Link to="/home">Home</Link>
            </h1>
        </div>
    )
}

