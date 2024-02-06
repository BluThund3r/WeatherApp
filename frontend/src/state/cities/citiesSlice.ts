import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import CityInfo from "../../interfaces/CityInfo";

const initialState: CityInfo = {
  id: 0,
  name: "",
  country: "",
  state: "",
  coord: {
    lat: -1,
    lon: -1,
  },
};

const citiesSlice = createSlice({
  name: "cities",
  initialState,
  reducers: {
    setCity(state, action: PayloadAction<CityInfo>) {
      state.id = action.payload.id;
      state.name = action.payload.name;
      state.country = action.payload.country;
      state.state = action.payload.state;
      state.coord = action.payload.coord;
    },
  },
});

export const { setCity } = citiesSlice.actions;
export default citiesSlice.reducer;
