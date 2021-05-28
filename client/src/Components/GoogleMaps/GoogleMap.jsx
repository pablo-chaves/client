import {
    withScriptjs,
    withGoogleMap,
    GoogleMap,
    Marker,
  } from "react-google-maps";
  
const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;

  const MapWithAMarker = withScriptjs(withGoogleMap(props =>
    <GoogleMap
      defaultZoom={8}
      defaultCenter={{ lat: props.lat, lng: props.lng }}
    >
      <Marker
        position={{ lat: props.lat, lng: props.lng }}
      />
    </GoogleMap>
  ));
  
  <MapWithAMarker
    googleMapURL={`https://maps.googleapis.com/maps/api/js?key=${apiKey}&v=3.exp&libraries=geometry,drawing,places`}
    loadingElement={<div style={{ height: `100%` }} />}
    containerElement={<div style={{ height: `400px` }} />}
    mapElement={<div style={{ height: `100%` }} />}
  />

export default MapWithAMarker;