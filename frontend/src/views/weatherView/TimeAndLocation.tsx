import React, { useState } from "react";
import CityInfo from "../../interfaces/CityInfo";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { UilHeart } from "@iconscout/react-unicons";
import {
  addFavoriteCity,
  removeFavoriteCity,
} from "../../state/user/userSlice";
import { toast } from "sonner";

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
  const user = useSelector((state: RootState) => state.user);
  const dispatch = useDispatch<AppDispatch>();
  const [addedToFavorites, setAddedToFavorites] = useState(
    user.loggedIn && user.favoriteCities.some((city) => city.id === location.id)
  );

  const removeFromFavorites = (city: CityInfo) => {
    if (!user.loggedIn) {
      toast.info("You must be logged in to remove a city from favorites");
      return;
    }
    setAddedToFavorites(false);
    dispatch(removeFavoriteCity(city.id));
  };

  const addToFavorites = (city: CityInfo) => {
    if (!user.loggedIn) {
      toast.info("You must be logged in to add a city to favorites");
      return;
    }
    setAddedToFavorites(true);
    dispatch(addFavoriteCity(city.id));
  };

  return (
    <div className="w-full grid place-items-center text-white">
      <h1 className="text-4xl font-bold">
        {location.name}
        {location.state !== "" ? `, ${location.state}` : ""}
        {location.country !== "" ? `, ${location.country}` : ""}
        {addedToFavorites ? (
          <UilHeart
            className="text-red-500 font-bold cursor-pointer transition ease-out hover:scale-125 inline-block ml-5 mb-2"
            size={30}
            onClick={() => {
              removeFromFavorites(location);
            }}
          />
        ) : (
          <UilHeart
            className="text-white cursor-pointer transition ease-out hover:scale-125 inline-block ml-5 mb-2"
            size={30}
            onClick={() => {
              addToFavorites(location);
            }}
          />
        )}
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
