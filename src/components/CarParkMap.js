import React, {useState, useEffect, useRef, useMemo} from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMapEvents, useMap, Rectangle} from 'react-leaflet'
import L, { map, marker } from 'leaflet'
import { useSelector, useDispatch } from 'react-redux';

function CarParkMap(props) { 

    const apikey = "584b2fa686f14ba283874318b3b8d6b0"
    const basemapUrl = "https://api.hkmapservice.gov.hk/osm/xyz/basemap/WGS84/tile/{z}/{x}/{y}.png?key=" + apikey
    const labelUrl = "https://api.hkmapservice.gov.hk/osm/xyz/label-tc/WGS84/tile/{z}/{x}/{y}.png?key=" + apikey
    const carParkInfo = useSelector(state => state.carParkInfo);
    const {info, loading, error} = carParkInfo;


    //const [zoom, setZoom] = useState(11);
    //const [center, setCenter] = useState([22.35430337, 114.138480235]);
    const [selected, setSelected] = useState(null);
    const zoom = 11;
    const center = [22.35430337, 114.138480235];
    const maxZoom = 18;
    const minZoom = 11;
    const maxBounds=[[22.150, 113.7900],[22.6000, 114.4800]];

  
      function LocationMarker() {
        const [position, setPosition] = useState(null)
        const map = useMapEvents({
          click() {
            map.locate()
          },
          locationfound(e) {
            setPosition(e.latlng)
            map.flyTo(e.latlng, 18)
          },
        })
      
        return position === null ? null : (
          <Marker position={position}>
            <Popup>You are here</Popup>
          </Marker>
        )
      }

      const List = ({ onListItemClick }) => (
        <div>
          <ul className="list-group">
            {
            info.map(i =>
                <li className="list-group-item" key={i.park_Id} onClick={e => {
                    onListItemClick(i.park_Id);
                  }}>{i.name}</li>
            )}
            </ul>
        </div>
      );

      function GenerateMarkers() {
        const map = useMap();


        const markerHandlers = useMemo(
            () => ({
              click(e) {
                //setBounds(innerBounds)
                //map.setView(e.latlng, 18);
                map.flyTo(e.latlng, maxZoom);
              },
            }),
            [map],
          )
        return info.map(i =>
            <Marker 
                key={i.park_Id} 
                position={[i.latitude, i.longitude]} 
                eventHandlers={markerHandlers}
            >
                <Popup>
                  {i.name}<br /> {i.displayAddress}
                </Popup>
            </Marker>
            )
      }

    useEffect(() => {
          return() => {
              //
          };
      }, [info])
  
      const handleItemClick = index => {
        setSelected(index);
        console.log("show Marker for", index);
        /*this.setState({
          markerIndex: index
        });*/
      };

      function MarkersLayer(props) {
        const { selectedIndex } = props;

        const map = useMap();


        const markerHandlers = useMemo(
            () => ({
              click(e) {
                map.flyTo(e.latlng, maxZoom);
              },
            }),
            [map],
          )
        return info.map(i => (
          <CreateMarker
            key={i.park_Id}
            carParkName={i.name}
            carParkAddress={i.displayAddress}
            position={[i.latitude, i.longitude]}
            openPopup={selectedIndex === i.park_Id}
            markerHandlers={markerHandlers}
          />
        ));
      }

      function CreateMarker(props) {
        const map = useMap();
        const markerRef = useRef(null);
        const { position, carParkName, carParkAddress, openPopup, markerHandlers } = props;
        useEffect(() => {
          if (openPopup) {markerRef.current.openPopup();
            map.flyTo(markerRef.current._latlng, maxZoom);
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
        <MarkersLayer selectedIndex={selected}/>
        </MapContainer>
        <List onListItemClick={handleItemClick} />
        
    </div>
}

export default CarParkMap;
