import React, {useEffect, useRef, useState} from "react";
import GoogleMapReact from 'google-map-react';
import CarIcon from '../../assets/Vector.png'
import Marker from '../../assets/map-marker.svg'
import CarText from '../../assets/T1.png'
import {IGOOGLEEVENT, IGOOGLEMAP} from "../../types/interfaces.ts";
import {retry} from "@reduxjs/toolkit/query";

let  defaultProps = {
    center: {
        lat: 	41.372428080002145,
        lng: 	69.28931383105471
    },
    zoom: 11
}


export const GoogleMaps:React.FC<IGOOGLEMAP> =({isMarkerAdd=true, onMarkerChange,markers, width=100, height=100}) => {
    const markerRef = useRef<any>(null)
    const [marker, setMarker] = useState([{lat: defaultProps.center.lat, lng: defaultProps.center.lng}])

    const [googleMaps, setGoogleMaps] = useState<{map:any, maps: any}>()

    const handleNewMarkerAndUpdateMarker =({lat, lng}) => {
        setMarker([{lat, lng}])
        if(googleMaps!.map&&googleMaps!.maps&&isMarkerAdd) {

            const {map, maps} = googleMaps;

            if(markerRef.current) markerRef.current.setPosition({lat, lng})

            else markerRef.current = new maps.Marker({
                    position:{lat, lng},
                    map: map,
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

    const setUpGoogleMaps =({map, maps}) => {
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

    return <>
        <div style={{ height: height+'vh', width: width+'%' }}>
            <GoogleMapReact
                bootstrapURLKeys={{ key: import.meta.env.VITE_KEY_GOOGLE_MAP }}
                defaultCenter={defaultProps.center}
                defaultZoom={defaultProps.zoom}
                yesIWantToUseGoogleMapApiInternals
                onClick={handelGoogleClick}
                onGoogleApiLoaded={setUpGoogleMaps}
            >
                {markers&&markers.map(({lat, lng}, index) => {
                    return <div lat={lat} lng={lng} key={index}>
                        <img width={40} height={40} src={Marker} alt=""/>
                    </div>
                })}
            </GoogleMapReact>
        </div>
    </>
}