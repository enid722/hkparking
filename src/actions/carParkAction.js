import axios from 'axios';
import { INFO_FAIL, INFO_REQUEST, INFO_SUCCESS } from '../constants/carparkConstant';

const listCarParkInfo = (search, vehicleType) => async (dispatch) => {

    try{
        dispatch({type: INFO_REQUEST});
        const api="https://api.data.gov.hk/v1/carpark-info-vacancy?data=info&lang=zh_TW";
        const type=vehicleType?"&vehicleTypes="+vehicleType:"";

        const {data} = await axios.get(api+type);
        dispatch({type: INFO_SUCCESS, payload: data.results});
    }
    catch(error){
        dispatch({type: INFO_FAIL, payload: error.message});
    }
}

export {listCarParkInfo};