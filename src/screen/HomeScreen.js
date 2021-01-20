import React from 'react';
import CarParkDetails from '../components/CarParkDetails';
import CarParkList from '../components/CarParkList';
import CarParkMap from '../components/CarParkMap';
import FilterPanel from '../components/FilterPanel';

function HomeScreen(props) {


    return <div>

        <div className="container-fluid">
            <div className="row">

                <div className="col-xs-12 col-sm-4 col-md-3 col-lg-3">
                    <FilterPanel></FilterPanel>
                </div>
                <div className="col-xs-12 col-sm-8 col-md-9 col-lg-9">
                    <CarParkMap></CarParkMap>
                    <div className="row">
                        <div className="carParkList col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <CarParkList/>
                        </div>
                        <div className="carParkDetails col-xs-12 col-sm-6 col-md-6 col-lg-6">
                            <CarParkDetails/>
                        </div>
                    </div>
                </div>
            </div>
        </div>

    </div>
}

export default HomeScreen;
