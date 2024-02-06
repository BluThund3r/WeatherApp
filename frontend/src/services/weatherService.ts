import {
  anotherApiKey,
  apiDomainName,
  weatherApiKey,
  weatherApiPath25,
  weatherApiPathDaily,
} from "../configConsts";
import CityInfo from "../interfaces/CityInfo";

export type UnitType = "metric" | "imperial" | "standard";

export function getWeatherByCityId(cityId: number, units: UnitType = "metric") {
  return fetch(
    `${weatherApiPath25}?id=${cityId}&appid=${weatherApiKey}&units=${units}`
  ).then((response) => response.json());
}

export function getWeatherByCoords(
  lat: number,
  long: number,
  units: UnitType = "metric"
) {
  return fetch(
    `http://api.openweathermap.org/geo/1.0/reverse?lat=${lat}&lon=${long}&limit=1&appid=${weatherApiKey}`
  )
    .then((response) => response.json())
    .then((data) => {
      return fetch(
        `${apiDomainName}/cities/getByCoordinates?lat=${data[0].lat}&long=${data[0].lon}`
      )
        .then((response) => response.json())
        .then((city) => {
          return getWeatherByCityId(city.id, units);
        });
    });
}

export function getForecastByCoords(
  lat: number,
  long: number,
  units: UnitType = "metric"
) {
  return fetch(
    `${weatherApiPathDaily}?lat=${lat}&lon=${long}&exclude=current,minutely,hourly,alerts&appid=${anotherApiKey}&units=${units}`
  ).then((response) => response.json());
}

export function getWeatherByCurrentLocation(units: UnitType = "metric") {
  navigator.geolocation.getCurrentPosition((position) => {
    return getWeatherByCoords(
      position.coords.latitude,
      position.coords.longitude,
      units
    );
  });
}

export function getCityByCurrentLocation(): Promise<CityInfo | any> {
  return new Promise((resolve, reject) => {
    navigator.geolocation.getCurrentPosition((position) => {
      console.log(
        "Got position",
        position.coords.latitude,
        position.coords.longitude
      );
      fetch(
        `${apiDomainName}/cities/getCityByCoordinates/${position.coords.latitude}/${position.coords.longitude}`
      )
        .then((response) => {
          console.log("Fetched successfully");
          return response.json();
        })
        .then((data) => {
          resolve(data);
        })
        .catch((error) => {
          reject(error);
        });
    });
  });
}

export function getLocalTime(timezoneOffsetInSeconds: number) {
  let date = new Date();
  let utcDate = Date.UTC(
    date.getUTCFullYear(),
    date.getUTCMonth(),
    date.getUTCDate(),
    date.getUTCHours(),
    date.getUTCMinutes(),
    date.getUTCSeconds()
  );

  return new Date(utcDate + timezoneOffsetInSeconds);
}
