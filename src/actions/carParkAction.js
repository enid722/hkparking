import axios from 'axios';
import {FILTER_UPDATE_DISTRICT, FILTER_UPDATE_VEHICLE_TYPE, INFO_FAIL, INFO_REQUEST, INFO_SUCCESS, SELECT_CAR_PARK, VACANCY_FAIL, VACANCY_REQUEST, VACANCY_SUCCESS } from '../constants/carparkConstant';

const listCarParkInfo = (vehicleType) => async (dispatch, getState) => {

    try{
        dispatch({type: INFO_REQUEST});
        const api="https://api.data.gov.hk/v1/carpark-info-vacancy?data=info&lang=zh_TW";
        const {carParkFilter:{vehicleTypeFilter}} = getState();
        console.log(vehicleTypeFilter);
        const type=vehicleTypeFilter?"&vehicleTypes="+vehicleTypeFilter:"";
        
        const {data} = await axios.get(api+type);
        dispatch({type: INFO_SUCCESS, payload: data.results});
    }
    catch(error){
        dispatch({type: INFO_FAIL, payload: error.message});
    }
}
const listCarParkVacancy = () => async (dispatch, getState) => {

    try{
        dispatch({type: VACANCY_REQUEST});
        const api="https://api.data.gov.hk/v1/carpark-info-vacancy?data=vacancy&lang=zh_TW";

        const {carParkFilter:{vehicleTypeFilter}} = getState();
        const {carParkSelection} = getState();
        const {selectedCarPark} = carParkSelection;
        const type=vehicleTypeFilter?"&vehicleTypes="+vehicleTypeFilter:"";
        const carParkId=selectedCarPark.park_Id?"&carparkIds="+selectedCarPark.park_Id:"";
        const {data} = await axios.get(api+type+carParkId);

        //console.log(data);
        //console.log(vehicleTypeFilter);
        switch (vehicleTypeFilter){
            case "privateCar":
                dispatch({type: VACANCY_SUCCESS, payload: data.results[0].privateCar[0]});
                break;
            case "LGV":
                dispatch({type: VACANCY_SUCCESS, payload: data.results[0].LGV[0]});
                break;
            case "HGV":
                 dispatch({type: VACANCY_SUCCESS, payload: data.results[0].HGV[0]});
                 break;
            case "CV":
                dispatch({type: VACANCY_SUCCESS, payload: data.results[0].CV[0]});
                break;
            case "coach":
                dispatch({type: VACANCY_SUCCESS, payload: data.results[0].coach[0]});
                break;
            case "motorCycle":
                dispatch({type: VACANCY_SUCCESS, payload: data.results[0].motorCycle[0]});
                break;
            default:
                dispatch({type: VACANCY_FAIL, payload: "No vacancy information"});
        }

        //dispatch({type: VACANCY_SUCCESS, payload: data.results[0]});
    }
    catch(error){
        dispatch({type: VACANCY_FAIL, payload: error.message});
    }
}


const updateVehicleTypeFilter = (vehicleType) => async (dispatch) => {
    dispatch({type: FILTER_UPDATE_VEHICLE_TYPE, payload: vehicleType});
}

const updateDistrictFilter = (district) => async (dispatch) => {
    dispatch({type: FILTER_UPDATE_DISTRICT, payload: district});
}

const selectCarPark = (carPark) => async (dispatch) => {
    dispatch({type: SELECT_CAR_PARK, payload: carPark});
}


export {listCarParkInfo, listCarParkVacancy, updateVehicleTypeFilter, updateDistrictFilter, selectCarPark};