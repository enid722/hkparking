import React from 'react';
import CarParkMap from '../components/CarParkMap';
import FilterPanel from '../components/FilterPanel';

function HomeScreen(props) { 


    return <div>
    
        <div className="container-fluid">
            <div className="row">

            <div className="col-sm-4 col-md-3 col-lg-3">
                <FilterPanel></FilterPanel>
            </div>
            <div className="col-xs-12 col-sm-8 col-md-9 col-lg-9">
                <CarParkMap></CarParkMap>
            </div>
            </div>
        </div>
        
    </div>
}

export default HomeScreen;
