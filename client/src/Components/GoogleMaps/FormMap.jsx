import React from 'react';
import { withGoogleMap, GoogleMap, withScriptjs, InfoWindow, Marker, Circle } from "react-google-maps";
import Geocode from "react-geocode";
import Autocomplete from 'react-google-autocomplete';
import { Descriptions } from 'antd';

const apiKey = process.env.REACT_APP_GOOGLE_MAP_API;
Geocode.setApiKey(apiKey);
Geocode.enableDebug();

class LocationSearchModal extends React.Component {

    state = {
        address: '',
        city: '',
        area: '',
        state: '',
        zoom: 15,
        height: 400,
        mapPosition: {
            lat: 0,
            lng: 0,
        },
        markerPosition: {
            lat: 0,
            lng: 0,
        },
        allowAddress: true,
        confirmed: false,
    }


    componentDidMount() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(position => {
                this.setState({
                    mapPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    },
                    markerPosition: {
                        lat: position.coords.latitude,
                        lng: position.coords.longitude,
                    }
                },
                    () => {
                        Geocode.fromLatLng(position.coords.latitude, position.coords.longitude).then(
                            response => {
                                console.log(response)
                                const address = response.results[0].formatted_address,
                                    addressArray = response.results[0].address_components,
                                    city = this.getCity(addressArray),
                                    area = this.getArea(addressArray),
                                    state = this.getState(addressArray);
                                console.log('city', city, area, state);
                                this.setState({
                                    address: (address) ? address : '',
                                    area: (area) ? area : '',
                                    city: (city) ? city : '',
                                    state: (state) ? state : '',
                                })
                            },
                            error => {
                                console.error(error);
                            }
                        );

                    })
            });
        } else {
            console.error("Geolocation is not supported by this browser!");
        }
    };

    displayAddress = (e) => {
        e.preventDefault();
        this.setState({ allowAddress: !this.state.allowAddress})
    }

    confirmAddress = (e) => {
        e.preventDefault();
        this.setState({ confirmed: true })
    }

    getCity = (addressArray) => {
        let city = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0] && 'administrative_area_level_2' === addressArray[i].types[0]) {
                city = addressArray[i].long_name;
                return city;
            }
        }
    };

    getArea = (addressArray) => {
        let area = '';
        for (let i = 0; i < addressArray.length; i++) {
            if (addressArray[i].types[0]) {
                for (let j = 0; j < addressArray[i].types.length; j++) {
                    if ('sublocality_level_1' === addressArray[i].types[j] || 'locality' === addressArray[i].types[j]) {
                        area = addressArray[i].long_name;
                        return area;
                    }
                }
            }
        }
    };

    getState = (addressArray) => {
        let state = '';
        for (let i = 0; i < addressArray.length; i++) {
            for (let i = 0; i < addressArray.length; i++) {
                if (addressArray[i].types[0] && 'administrative_area_level_1' === addressArray[i].types[0]) {
                    state = addressArray[i].long_name;
                    return state;
                }
            }
        }
    };

    onChange = (event) => {
        event.preventDefault();
        this.setState({ [event.target.name]: event.target.value });
    };

    onInfoWindowClose = (event) => { };

    onMarkerDragEnd = (event) => {
        let newLat = event.latLng.lat(),
            newLng = event.latLng.lng();

        Geocode.fromLatLng(newLat, newLng).then(
            response => {
                const address = response.results[0].formatted_address,
                    addressArray = response.results[0].address_components,
                    city = this.getCity(addressArray),
                    area = this.getArea(addressArray),
                    state = this.getState(addressArray);
                this.setState({
                    address: (address) ? address : '',
                    area: (area) ? area : '',
                    city: (city) ? city : '',
                    state: (state) ? state : '',
                    markerPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                    mapPosition: {
                        lat: newLat,
                        lng: newLng
                    },
                })
            },
            error => {
                console.error(error);
            }
        );
    };

    onPlaceSelected = (place) => {
        console.log('plc', place);
        const address = place.formatted_address,
            addressArray = place.address_components,
            city = this.getCity(addressArray),
            area = this.getArea(addressArray),
            state = this.getState(addressArray),
            latValue = place.geometry.location.lat(),
            lngValue = place.geometry.location.lng();

        console.log('latvalue', latValue)
        console.log('lngValue', lngValue)

        // Set these values in the state.
        this.setState({
            address: (address) ? address : '',
            area: (area) ? area : '',
            city: (city) ? city : '',
            state: (state) ? state : '',
            markerPosition: {
                lat: latValue,
                lng: lngValue
            },
            mapPosition: {
                lat: latValue,
                lng: lngValue
            },
        })
    };


    render() {
        const AsyncMap = /* withScriptjs( */
            withGoogleMap(
                props => (
                    <GoogleMap
                        defaultZoom={this.state.zoom}
                        defaultCenter={{ lat: this.state.mapPosition.lat, lng: this.state.mapPosition.lng }}
                    >

                         {/* For Auto complete Search Box */}
                         <Autocomplete
                            style={{
                                width: '100%',
                                height: '40px',
                                paddingLeft: '16px',
                                marginTop: '2px',
                                marginBottom: '2rem'
                            }}
                            onPlaceSelected={this.onPlaceSelected}
                            options={{
                                types: ["address"],
                                componentRestrictions: { country: "co" },
                            }}
                        />
                        {/* InfoWindow on top of marker */}
                        {/*Marker*/}
                        {this.state.allowAddress === true && 
                            <>
                            <Marker
                                google={this.props.google}
                                name={'Marker name'}
                                draggable={true}
                                onDragEnd={this.onMarkerDragEnd}
                                position={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                            />
                                <InfoWindow
                                    onClose={this.onInfoWindowClose}
                                    position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
                                >
                                    <div>
                                        <span style={{ padding: 0, margin: 0 }}>{this.state.address}</span>
                                        <button onClick={this.confirmAddress}>Confirmar ubicación</button>
                                    </div>
                                </InfoWindow>
                            <Marker />
                            </>
                        }

                        {/* Circle */}
                        {!this.state.allowAddress && 
                            <Circle
                                google={this.props.google}
                                name={'Circle name'}
                                draggable={true}
                                onDragEnd={this.onMarkerDragEnd}
                                radius={400}
                                center={{ lat: this.state.markerPosition.lat, lng: this.state.markerPosition.lng }}
                            >
                                {/* <InfoWindow
                                    onClose={this.onInfoWindowClose}
                                    position={{ lat: (this.state.markerPosition.lat + 0.0018), lng: this.state.markerPosition.lng }}
                                >
                                    <div style={{ padding: 0, margin: 0 }}>
                                        <button onClick={this.confirmAddress}>Confirmar ubicación</button>
                                    </div>
                                </InfoWindow>    */}
                            </Circle> 
                        }
                    </GoogleMap>
                )
              )
        /* ); */

        return (
            <div style={{ padding: '1rem', margin: '0 auto', maxWidth: 1000 }}>
                <Descriptions bordered>
                    {/* <Descriptions.Item label="Ciudad">{this.state.city}</Descriptions.Item> */}
                    <Descriptions.Item label="Ciudad">{this.state.area}</Descriptions.Item>
                    <Descriptions.Item label="Departamento">{this.state.state}</Descriptions.Item>
                    <Descriptions.Item label="Dirección">{this.state.address}</Descriptions.Item>
                </Descriptions>
                <label htmlFor="allowAddress">Prefiero ocultar mi ubicación</label>
                <input type="checkbox" name="allowAddress"
                    /* checked= {!this.state.allowAddress}*/
                    onClick={(e) => {
                        // e.preventDefault();
                        this.setState({ allowAddress: !this.state.allowAddress})
                    }} 
                />

                <AsyncMap                   
                   mapElement={
                       <div style={{ height: `100%` }} />
                   }
                    containerElement={
                        <div style={{ height: this.state.height }} />
                    }
                />
            </div>
        )
    }

}

export default LocationSearchModal;