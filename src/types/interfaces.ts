import React from "react";

export interface IMARKER{
    lat: number,
    lng: number,
    text: string
}
type latlgn = {lat: number, lng: number}
export interface IGOOGLEMAP {
    isMarkerAdd?: boolean,
    onMarkerChange?: (lat:number, lng: number) => void,
    markers?: latlgn[],
    isRoute?: boolean,
    width?: number,
    height?: number
}
export  interface IGOOGLEEVENT{x:number, y:number, lat:number, lng: number, event:React.ChangeEvent<HTMLInputElement>}