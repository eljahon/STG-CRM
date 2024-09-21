import {GoogleMaps} from "../../../components/GoogleMaps/Google-Maps.tsx";
import TheBreadcrumb from "../../../components/Breadcrumb/TheBreadcrumb.tsx";
import {useTranslation} from "react-i18next";

export const  Maps = ()=> {
  const {t} = useTranslation()
  const   onMarkerLatLng = (lat:number, lng:number) => {
    console.log(lat, lng)
  }
  return <>
    <TheBreadcrumb model={[{template: () => <span className='text-primary'>{t('maps')}</span>}]}/>
    <div className='card mt-2'>
      <GoogleMaps isRoute={false} onMarkerChange={onMarkerLatLng} isMarkerAdd={false} markers={[{
        lat: 41.372428080002145,
        lng: 69.28931383105471
      }, { lat: 40.3777, lng: 49.892 }, { lat: 41.2995, lng: 69.2401 }]}/>
    </div>
  </>
}