import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { listCarParkInfo, updateVehicleTypeFilter } from '../actions/carParkAction';

function FilterPanel(props) {


    const dispatch = useDispatch();
    const carParkInfo = useSelector(state => state.carParkInfo);
    const {info, loading, error} = carParkInfo;

    const carParkFilter = useSelector(state => state.carParkFilter);
    const {vehicleTypeFilter, districtFilter} = carParkFilter;

    useEffect(() => {
        dispatch(listCarParkInfo());    
        return () => {
            //
        };
    },[vehicleTypeFilter])



    return <div className="filterPanel">
       
        {loading && <div className="spinner-border loading" role="status"></div>}
        {error && <div>{error}</div>}
        <label>Vehicle Type</label>
        <form>
        <div className="form-group">
            <select className="form-select" onChange={(e) => dispatch(updateVehicleTypeFilter((e.target.value)))}>
                <option value="privateCar">Private Car</option>
                <option value="LGV">Light Goods Vehicle</option>
                <option value="HGV">Heavy Goods Vehicle</option>
                <option value="CV">Container Vehicle</option>
                <option value="coach">Coach</option>
                <option value="motorCycle">Motor Cycle</option>
            </select>
        </div>
        </form>

    </div>
}

export default FilterPanel;
