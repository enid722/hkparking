import React, {useState, useEffect} from 'react';
import { MapContainer, TileLayer, Marker, Popup, MapConsumer, useMap } from 'react-leaflet'
import L, { map } from 'leaflet'
import { useSelector, useDispatch } from 'react-redux';

function CarParkMap(props) { 

    const apikey = "584b2fa686f14ba283874318b3b8d6b0"
    const basemapUrl = "https://api.hkmapservice.gov.hk/osm/xyz/basemap/WGS84/tile/{z}/{x}/{y}.png?key=" + apikey
    const labelUrl = "https://api.hkmapservice.gov.hk/osm/xyz/label-tc/WGS84/tile/{z}/{x}/{y}.png?key=" + apikey
    const carParkInfo = useSelector(state => state.carParkInfo);
    const {info, loading, error} = carParkInfo;



    useEffect(() => {
  
          return() => {
              //
          };
      }, [info])

  
    return <div>
        
        <MapContainer center={[22.35430337, 114.138480235]} zoom={11} scrollWheelZoom={true} maxZoom={18} minZoom={11} 
        maxBounds={[[22.150, 113.7900],[22.6000, 114.4800]]}>

        <TileLayer
            attribution='&copy; <a href="https://api.portal.hkmapservice.gov.hk/disclaimer">Map from Lands Department</a>'
            url= {basemapUrl}
        />
        <TileLayer
            url= {labelUrl}
        />
        
        {
        info.map(i =>
        <Marker 
            key={i.park_Id} 
            position={[i.latitude, i.longitude]} 
            eventHandlers={{
                click: () => {
                    console.log("test");
            }}}
        >
            <Popup>
              {i.name}<br /> {i.displayAddress}
            </Popup>
        </Marker>
        )}
        </MapContainer>
        
        
    </div>
}

export default CarParkMap;
