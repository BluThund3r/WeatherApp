import React from "react";
import CityInfo from "../../interfaces/CityInfo";

type Props = {
  location: CityInfo;
  localTime: Date;
};

const days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

function TimeAndLocation({ location, localTime }: Props) {
  return (
    <div className="w-full grid place-items-center text-white">
      <h1 className="text-4xl font-bold">
        {location.name}
        {location.state !== "" ? `, ${location.state}` : ""}
        {location.country !== "" ? `, ${location.country}` : ""}
      </h1>
      <h2 className="text-2xl">
        {days[localTime.getDay()]}, {localTime.getDate()}{" "}
        {months[localTime.getMonth()]} {localTime.getFullYear()} | Local Time{" "}
        {localTime.getHours()}:{localTime.getMinutes() < 10 ? "0" : ""}
        {localTime.getMinutes()}
      </h2>
    </div>
  );
}

export default TimeAndLocation;
