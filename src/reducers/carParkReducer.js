import { INFO_FAIL, INFO_REQUEST, INFO_SUCCESS, VACANCY_FAIL, VACANCY_REQUEST, VACANCY_SUCCESS } from "../constants/carparkConstant";

function carParkInfoReducer(state = {
    info : [], 
}, action) {

    switch (action.type){
        case INFO_REQUEST:
            return {loading:true, info: []};
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
            return {loading:true, vacancy: {}};
        case VACANCY_SUCCESS:
            return {loading:false, vacancy: action.payload};
        case VACANCY_FAIL:
            return {loading:false, error: action.payload};
        default:
            return state;
    }
    
}
export {carParkInfoReducer, carParkVacancyReducer};