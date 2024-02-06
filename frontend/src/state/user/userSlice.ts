import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiDomainName } from "../../configConsts";
import { toast } from "sonner";
import { getUsernameFromToken, isUserAdmin } from "../../utils/userUtils";
import { fetchWithToken } from "../../utils/jwtUtils";
import CityInfo from "../../interfaces/CityInfo";

interface UserState {
  loggedIn: boolean;
  isAdmin: boolean;
  username: string;
  token: string;
  favoriteCities: CityInfo[];
}

export interface LoginResponse {
  username: string;
  token: string;
  favoriteCities: CityInfo[];
}

const initialState: UserState = {
  loggedIn: false,
  username: "",
  token: "",
  favoriteCities: [],
  isAdmin: false,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.loggedIn = false;
      state.username = "";
      state.token = "";
      state.favoriteCities = [];
      localStorage.removeItem("token");
      toast.success("Logged out successfully");
    },
    refreshUserLoggedIn(state) {
      const token = localStorage.getItem("token");
      if (token !== null && token !== "") {
        state.loggedIn = true;
        state.token = token;
        state.isAdmin = isUserAdmin(token);
        state.username = getUsernameFromToken(token);
      }
    },
  },

  extraReducers: (builder) => {
    builder.addCase(
      login.fulfilled,
      (state, action: PayloadAction<LoginResponse>) => {
        if (action.payload.token === null || action.payload.token === "")
          return;

        localStorage.setItem("token", action.payload.token);
        state.loggedIn = true;
        state.username = action.payload.username;
        state.token = action.payload.token;
        state.isAdmin = isUserAdmin(action.payload.token);
        state.favoriteCities = action.payload.favoriteCities;
      }
    );
    builder.addCase(
      getUserFavoriteCities.fulfilled,
      (state, action: PayloadAction<CityInfo[]>) => {
        state.favoriteCities = action.payload;
      }
    );
    builder.addCase(
      addFavoriteCity.fulfilled,
      (state, action: PayloadAction<CityInfo>) => {
        state.favoriteCities.push(action.payload);
      }
    );
    builder.addCase(
      removeFavoriteCity.fulfilled,
      (state, action: PayloadAction<number>) => {
        state.favoriteCities = state.favoriteCities.filter(
          (city) => city.id !== action.payload
        );
      }
    );
  },
});

export const login = createAsyncThunk(
  "user/login",
  async (payload: { username: string; password: string }) => {
    let returnValue: LoginResponse = {
      username: "",
      token: "",
      favoriteCities: [],
    };
    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    };
    const response = await fetch(
      `${apiDomainName}/users/login`,
      requestOptions
    );
    const responseText = await response.text();
    if (response.ok) {
      returnValue.token = responseText;
      returnValue.username = payload.username;
      toast.success("Logged in successfully");
    } else toast.error(responseText);

    return returnValue;
  }
);

const fetchUserFavoriteCities = async (): Promise<CityInfo[]> => {
  if (localStorage.getItem("token") === null) return [];
  const response = await fetchWithToken(
    `${apiDomainName}/users/getMyFavoriteCities`
  );
  const data = await response.json();
  return data;
};

export const getUserFavoriteCities = createAsyncThunk(
  "user/getFavoriteCities",
  fetchUserFavoriteCities
);

export const addFavoriteCity = createAsyncThunk(
  "user/addFavoriteCity",
  async (cityId: number) => {
    const response = await fetchWithToken(
      `${apiDomainName}/users/addFavoriteCity/${cityId}`,
      { method: "PUT" }
    );
    const data = await response.json();
    return data;
  }
);

export const removeFavoriteCity = createAsyncThunk(
  "user/removeFavoriteCity",
  async (cityId: number) => {
    await fetchWithToken(
      `${apiDomainName}/users/removeFavoriteCity/${cityId}`,
      { method: "PUT" }
    );
    return cityId;
  }
);

export const { logout, refreshUserLoggedIn } = userSlice.actions;

export default userSlice.reducer;
