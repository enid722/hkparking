import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { listCarParkVacancy, selectCarPark } from '../actions/carParkAction';

function CarParkDetails(props) {

    const carParkVacancy = useSelector(state => state.carParkVacancy);
    const carParkSelection = useSelector(state => state.carParkSelection);
    const carParkFilter = useSelector(state => state.carParkFilter);
    const {vacancy: vacancy, loading: loadingVacancy, error: errorVacancy} = carParkVacancy;
    const {selectedCarPark} = carParkSelection;
    const {vehicleTypeFilter, districtFilter} = carParkFilter;
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listCarParkVacancy());    
        return () => {
            //
        };
    },[selectedCarPark])

    return <div>
        {selectedCarPark.park_Id &&
            <div className="card">
                {selectedCarPark.renditionUrls &&
            <img src={selectedCarPark.renditionUrls.carpark_photo} className="card-img-top" alt={selectedCarPark.renditionUrls.carpark_photo} />
            }
        <div className="card-body">
            <h5 className="card-title">{selectedCarPark.name}</h5>
            <p className="card-text">{selectedCarPark.displayAddress}</p>
            <p className="card-text">{selectedCarPark.contactNo}</p>
            <div className="card-text">Vacancy:  
                {loadingVacancy && <div className="spinner-border text-info loading spinner-border-sm" role="status"></div>}
                {errorVacancy && <div>{errorVacancy}</div>}
                {vacancy && vacancy.vacancy}</div>
            </div>
            <div className="card-footer">
            <small className="text-muted">Last updated: 
            {loadingVacancy && <div className="spinner-border text-info loading spinner-border-sm" role="status"></div>}
            {errorVacancy && <div>{errorVacancy}</div>}
            {vacancy && vacancy.lastupdate}
            
            </small>
            </div>
        </div>}
    </div>
}

export default CarParkDetails;
