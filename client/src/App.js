import './App.css';
import {BrowserRouter, Route, Switch} from 'react-router-dom'; // es un componente que nos permite conectar el store con el componente


//Siempre envolver el div con el browser router porque si no no funciona porque no se encuentra el componente y no se puede renderizar
function App() {
  return (
    <BrowserRouter> 
    <div className="App">
      <h1>Henry Dogs</h1>
    </div>
  </BrowserRouter>
  );
}

export default App;
