import React, {useState, useEffect, useRef, useMemo} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, Rectangle} from 'react-leaflet'
import { useSelector, useDispatch } from 'react-redux';
import { listCarParkVacancy, selectCarPark } from '../actions/carParkAction';

function CarParkMap(props) { 

    const apikey = "584b2fa686f14ba283874318b3b8d6b0"
    const basemapUrl = "https://api.hkmapservice.gov.hk/osm/xyz/basemap/WGS84/tile/{z}/{x}/{y}.png?key=" + apikey
    const labelUrl = "https://api.hkmapservice.gov.hk/osm/xyz/label-tc/WGS84/tile/{z}/{x}/{y}.png?key=" + apikey
    const carParkInfo = useSelector(state => state.carParkInfo);
    const carParkSelection = useSelector(state => state.carParkSelection);
    const {info, loading, error} = carParkInfo;
    const {selectedCarPark} = carParkSelection;
    const dispatch = useDispatch();
     

    const zoom = 11;
    const center = [22.35430337, 114.138480235];
    const maxZoom = 18;
    const minZoom = 11;
    const maxBounds=[[22.150, 113.7900],[22.6000, 114.4800]];


      function MarkersLayer() {
        const map = useMap();


        const markerHandlers = (carParkId) => useMemo(
            () => ({
              click(e) {
                dispatch(selectCarPark(info.find(x => x.park_Id === carParkId)));
                map.setView(e.latlng, maxZoom-5);
              },
            }),
            [map],
          )
        return info?info.map(i => (
          <CreateMarker
            key={i.park_Id}
            carParkName={i.name}
            carParkAddress={i.displayAddress}
            position={[i.latitude, i.longitude]}
            openPopup={selectedCarPark.park_Id === i.park_Id}
            markerHandlers={markerHandlers(i.park_Id)}
          />
        )):null;
      }

      function CreateMarker(props) {
        const map = useMap();
        const markerRef = useRef(null);
        const { position, carParkName, carParkAddress, openPopup, markerHandlers } = props;
        useEffect(() => {
          if (openPopup) {markerRef.current.openPopup();
            map.setView(markerRef.current._latlng, maxZoom);
        }
        }, [openPopup]);
      
        return (
          <Marker ref={markerRef} position={position} eventHandlers={markerHandlers}>
            <Popup>{carParkName}<br/>{carParkAddress}</Popup>
          </Marker>
        );
      }


    return <div>
        
        <MapContainer center={center} zoom={zoom} scrollWheelZoom={true} maxZoom={maxZoom} minZoom={minZoom} 
        maxBounds={maxBounds}>
        
        <TileLayer
            attribution='&copy; <a href="https://api.portal.hkmapservice.gov.hk/disclaimer">Map from Lands Department</a>'
            url= {basemapUrl}
        />
        <TileLayer
            url= {labelUrl}
        />
        <MarkersLayer/>
        </MapContainer>
  
    </div>
}

export default CarParkMap;
