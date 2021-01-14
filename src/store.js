import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { carParkInfoReducer, carParkVacancyReducer } from './reducers/carparkReducer';


const initialState = {};
const reducer = combineReducers({
    carParkInfo: carParkInfoReducer,
    carParkVacancy: carParkVacancyReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =  createStore (reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;   