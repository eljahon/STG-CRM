import {GoogleMaps} from "../../../components/GoogleMaps/Google-Maps.tsx";
import TheBreadcrumb from "../../../components/Breadcrumb/TheBreadcrumb.tsx";
import {useTranslation} from "react-i18next";

export const  Maps = ()=> {
  const {t} = useTranslation()
  const   onMarkerLatLng = (lat, lng) => {
    console.log(lat, lng)
  }
  return <>
    <TheBreadcrumb model={[{template: () => <span className='text-primary'>{t('maps')}</span>}]}/>
    <div className='card mt-2'>
      <GoogleMaps onMarkerChange={onMarkerLatLng} isMarkerAdd={false} markers={[{
        lat: 41.372428080002145,
        lng: 69.28931383105471
      }]}/>
    </div>
  </>
}