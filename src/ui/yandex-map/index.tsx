// src/YandexMap.tsx
import React, { useEffect, useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

interface YandexMapProps {
  onLocationSelect: (coords: number[]) => void;
  value?: any;
  disable?: boolean;
  height?: any;
}

const YandexMap: React.FC<YandexMapProps> = React.memo(
  ({ onLocationSelect, value, disable, height }) => {
    const [coords, setCoords] = useState<number[]>(value || [41.2995, 69.2401]); // Default to Tashkent, Uzbekistan
    const [mapState, setMapState] = useState({ center: coords, zoom: 13 });

    const handleMapClick = (e: any) => {
      const newCoords = e.get("coords") as number[];
      setCoords(newCoords);
      onLocationSelect(newCoords);
    };

    useEffect(() => {
      setCoords(value);
      setMapState((prevState) => ({ ...prevState, center: value }));
    }, [value]);

    return (
      <YMaps>
        <Map
          state={mapState}
          width="100%"
          height={height || "500px"}
          onClick={!disable && handleMapClick}
        >
          <Placemark geometry={coords} />
          {/* <SearchControl
          options={{ float: "right" }}
          onResultShow={handleSearchResultSelect}
        /> */}
        </Map>
      </YMaps>
    );
  }
);

export default YandexMap;
