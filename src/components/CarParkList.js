import React, {useState, useEffect} from 'react';
import {useSelector, useDispatch} from 'react-redux';
import { selectCarPark } from '../actions/carParkAction';

function CarParkList(props) {
    const carParkInfo = useSelector(state => state.carParkInfo);
    const {info, loading, error} = carParkInfo;
    const dispatch = useDispatch();


    return <ul className="list-group">
      {
      info && info.map(i =>
          <li className="list-group-item" key={i.park_Id} onClick={e => {
            dispatch(selectCarPark(info.find(x => x.park_Id === i.park_Id)));
            }}>{i.name}</li>
      )}
      </ul>

}

export default CarParkList;
