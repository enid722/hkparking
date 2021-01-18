import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { listCarParkInfo } from '../actions/carParkAction';

function FilterPanel(props) {

    const [search, setSearch] = useState('');
    const [vehicleType, setVehicleType] = useState('');
    const dispatch = useDispatch();
    const carParkInfo = useSelector(state => state.carParkInfo);
    const {info, loading, error} = carParkInfo;

    useEffect(() => {
        dispatch(listCarParkInfo());    
        return () => {
            //
        };
    },[])

    const submitHandler = (e) =>{
        e.preventDefault();
        dispatch(listCarParkInfo(search, vehicleType));
    }

    return <div className="filterPanel">
        
        <form onSubmit={submitHandler}>
            <div className="d-flex form-group">
                
                <input className="form-control me-2 search" type="text" placeholder="Search" aria-label="Search" id="search" onChange={(e) => setSearch(e.target.value)}></input>
                <button className="btn btn-outline-success" type="submit">Search</button>
                
            </div>
            {loading && <div className="spinner-border loading" role="status"></div>}
        {error && <div>{error}</div>}
        <label>Vehicle Type</label>
        <div className="form-group">
            <select className="form-select" onChange={(e) => setVehicleType(e.target.value)}>
                <option value="">All Vehicle Types</option>
                <option value="privateCar">Private Car</option>
                <option value="LGV">Light Goods Vehicle</option>
                <option value="HGV">Heavy Goods Vehicle</option>
                <option value="CV">Container Vehicle</option>
                <option value="coach">Coach</option>
                <option value="motorCycle"> Motor Cycle</option>
            </select>
        </div>
        </form>

    </div>
}

export default FilterPanel;
