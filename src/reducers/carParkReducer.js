import { FILTER_RESET, FILTER_UPDATE_VEHICLE_TYPE, FILTER_UPDATE_DISTRICT, INFO_FAIL, INFO_REQUEST, INFO_SUCCESS, VACANCY_FAIL, VACANCY_REQUEST, VACANCY_SUCCESS, SELECT_CAR_PARK } from "../constants/carparkConstant";

function carParkInfoReducer(state = {
    info : [], 
}, action) {

    switch (action.type){
        case INFO_REQUEST:
            return {loading:true};
        case INFO_SUCCESS:
            return {loading:false, info: action.payload};
        case INFO_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }   
}

function carParkVacancyReducer(state = {
    vacancy: {}, 
}, action) {

    switch (action.type){
        case VACANCY_REQUEST:
            return {loading:true};
        case VACANCY_SUCCESS:
            return {loading:false, vacancy: action.payload};
        case VACANCY_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
    
}

function carParkFilterReducer(state = {}, action) {

    switch (action.type){
        case FILTER_UPDATE_VEHICLE_TYPE:
            return {...state, vehicleTypeFilter: action.payload};
        case FILTER_UPDATE_DISTRICT:
            return {...state, districtFilter: action.payload};
        case FILTER_RESET:
            return {vehicleTypeFilter: {}, districtFilter: {}};
        default:
            return state;
    }
    
}

function carParkSelectionReducer(state = {
    selectedCarPark: {}, 
}, action) {

    switch (action.type){
        case SELECT_CAR_PARK:
            return {selectedCarPark: action.payload};
        default:
            return state;
    }
    
}
export {carParkInfoReducer, carParkVacancyReducer, carParkFilterReducer, carParkSelectionReducer};