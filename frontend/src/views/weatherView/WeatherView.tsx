import React, { useEffect } from "react";
import CityInfo from "../../interfaces/CityInfo";

type Props = {
  cityInfo: CityInfo;
};

function WeatherView({cityInfo}: Props) {
  useEffect(() => {
    
  }, [])

  return <div>WeatherView for {cityInfo.name}</div>;
}

export default WeatherView;
