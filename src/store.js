import {createStore, combineReducers, applyMiddleware, compose} from 'redux';
import thunk from 'redux-thunk';
import { carParkFilterReducer, carParkInfoReducer, carParkSelectionReducer, carParkVacancyReducer } from './reducers/carparkReducer';


//const initialState = {carParkFilter:{vehicleTypeFilter: "privateCar", districtFilter: ""}};
const initialState = {carParkFilter:{vehicleTypeFilter: "privateCar", districtFilter: {}}};

const reducer = combineReducers({
    carParkInfo: carParkInfoReducer,
    carParkVacancy: carParkVacancyReducer,
    carParkFilter: carParkFilterReducer, 
    carParkSelection:carParkSelectionReducer,
})

const composeEnhancer = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const store =  createStore (reducer, initialState, composeEnhancer(applyMiddleware(thunk)));
export default store;   