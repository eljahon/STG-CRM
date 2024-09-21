import React, {useRef, useState} from "react";
import GoogleMapReact from 'google-map-react';

import Marker from '../../assets/map-marker.svg'

import {IGOOGLEEVENT, IGOOGLEMAP} from "../../types/interfaces.ts";
import {get} from "lodash";
interface ICENTER
{lat: number, lng: number}
interface IDEFAULT {
    center:ICENTER,
    zoom: number
}
const  defaultProps:IDEFAULT = {
    center: {
        lat: 	41.372428080002145,
        lng: 	69.28931383105471
    },
    zoom: 11
}


export const GoogleMaps:React.FC<IGOOGLEMAP> =(props) => {
    const {isMarkerAdd=true, onMarkerChange,markers, width=100, height=100} =props
    const markerRef = useRef<any>(null)
    // const [marker, setMarker] = useState<ICENTER[]>([{lat: defaultProps.center.lat, lng: defaultProps.center.lng}])

    const [googleMaps, setGoogleMaps] = useState<{map:any, maps: any}>()
    // const [directionsRenderer, setDirectionsRenderer] = useState(null);
    // const [directionsService, setDirectionsService] = useState(null);
    const handleNewMarkerAndUpdateMarker =({lat, lng}:ICENTER) => {
        // setMarker([{lat, lng}])
        if(googleMaps!.map&&googleMaps!.maps&&isMarkerAdd) {

            // const {map, maps} = googleMaps;

            if(markerRef.current) markerRef.current.setPosition({lat, lng})

            else markerRef.current = new googleMaps!.maps.Marker({
                    position:{lat, lng},
                    map: googleMaps!.map,
                    title: 'Yangi marker',
                    // icon: {
                    //     url: isMarkerAdd ? CarIcon : CarText, // Ikona tasviri yo'lini belgilang
                    //     scaledSize: new maps.Size(50, 50), // Tasvir o'lchami
                    // },
                })
            onMarkerChange&&onMarkerChange(lat, lng)

        }

    }

    const handelGoogleClick =(arg:IGOOGLEEVENT) => handleNewMarkerAndUpdateMarker({lat:arg.lat, lng:arg.lng})

    const onGoogleApiLoaded =({map, maps}:{map:any, maps:any}) => {
        // if(markerRef.current) markerRef.current.setPosition({lat:defaultProps.center.lat, lng:defaultProps.center.lng})
        //
        // else markerRef.current = new maps.Marker({
        //     position:{lat:defaultProps.center.lat, lng:defaultProps.center.lng},
        //     map: map,
        //     title: 'Yangi marker',
        //     icon: {
        //         url:  CarText, // Ikona tasviri yo'lini belgilang
        //         scaledSize: new maps.Size(50, 50), // Tasvir o'lchami
        //     },
        // })
        setGoogleMaps({maps, map})
    }
    // useEffect(() => {
    //     if (googleMaps?.map && googleMaps?.maps&& isRoute) {
    //         console.log('DirectionsRenderer ====>>>')
    //         // DirectionsRenderer-ni yaratish va uni map-ga qo'shish
    //         const renderer = new googleMaps.maps.DirectionsRenderer();
    //         renderer.setMap(googleMaps.map);
    //         setDirectionsRenderer(renderer);
    //
    //         // DirectionsService-ni yaratish
    //         const service = new googleMaps.maps.DirectionsService();
    //         setDirectionsService(service);
    //         console.log('service ====>>>')
    //
    //             if (directionsService && directionsRenderer) {
    //                 console.log('directionsService ====>>>')
    //
    //                 directionsService.route(
    //                     {
    //                         origin: { lat: 41.2995, lng: 69.2401 },  // Boshlanish nuqtasi (masalan, Toshkent)
    //                         destination: { lat: 40.3777, lng: 49.892 }, // Tashkentdan Baku-ga yo'nalish
    //                         travelMode:googleMaps.maps.TravelMode.DRIVING, // Safar turi
    //                     },
    //                     (result, status) => {
    //                         if (status === googleMaps.maps.DirectionsStatus.OK) {
    //                             directionsRenderer?.setDirections(result); // Yo'nalishni chizish
    //                         } else {
    //                             console.error(`Directions request failed due to ${status}`);
    //                         }
    //                     }
    //                 );
    //             }
    //     }
    // }, [googleMaps?.map, googleMaps?.maps]);
    const MarkerComponent:React.FC<{lat:number, lng:number}> = ({ lat, lng }) => (
        <div data-lat={lat} data-lng={lng}>
            <img width={40} height={40} src={Marker} alt=""/>
        </div>
    );

    return <>
        <div style={{ height: height+'vh', width: width+'%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_KEY_GOOGLE_MAP }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                onClick={handelGoogleClick}
                onGoogleApiLoaded={onGoogleApiLoaded}
            >
                {get(markers, '', []).map(({lat, lng}, index) => {
                    return <MarkerComponent lat={lat} lng={lng} key={index}/>
                })}
            </GoogleMapReact>
        </div>
    </>
}