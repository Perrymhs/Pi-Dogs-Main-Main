import './App.css';
import {BrowserRouter, Route, Routes} from 'react-router-dom'; // es un componente que nos permite conectar el store con el componente
import Home from '../src/components/Home';
import LandingPage from '../src/components/LandingPage';



//Siempre envolver el div con el browser router porque si no no funciona porque no se encuentra el componente y no se puede renderizar
function App() {
  return (
    <BrowserRouter> 
    <Routes>
    <Route path='/' element={<LandingPage />} />
    <Route path='/home' element={<Home />} />   
    </Routes>
  </BrowserRouter>
  );
}

export default App;
