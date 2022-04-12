import {createStore, applyMiddleware } from 'redux';//
import {composeWithDevTools} from 'redux-devtools-extension'; // es un midleware que nos permite escribir mas simple el reducer
import thunk from 'redux-thunk';
import rootReducer from '../reducer';

// es donde se almacena todos los estados globales de nuestra aplicación para ser renderizados
export const store = createStore(rootReducer, composeWithDevTools(applyMiddleware(thunk)));