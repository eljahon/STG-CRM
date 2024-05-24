// src/YandexMap.tsx
import React, { useState } from "react";
import { YMaps, Map, Placemark } from "@pbe/react-yandex-maps";

interface YandexMapProps {
  onLocationSelect: (coords: number[]) => void;
  value?: any;
  disable?: boolean;
  height?: any;
}

const YandexMap: React.FC<YandexMapProps> = ({
  onLocationSelect,
  value,
  disable,
  height
}) => {
  const [coords, setCoords] = useState<number[]>(value || [41.2995, 69.2401]); // Default to Tashkent, Uzbekistan

  const handleMapClick = (e: any) => {
    const newCoords = e.get("coords") as number[];
    setCoords(newCoords);
    onLocationSelect(newCoords);
  };

  // const handleSearchResultSelect = (e: any) => {
  //   const results = e.get("target").getResultsArray();
  //   if (results.length) {
  //     const firstResultCoords = results[0].geometry.getCoordinates();
  //     setCoords(firstResultCoords);
  //     onLocationSelect(firstResultCoords);
  //   }
  // };

  return (
    <YMaps>
      <Map
        defaultState={{ center: coords, zoom: 13 }}
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
};

export default YandexMap;
