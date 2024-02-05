import { PayloadAction, createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import { apiDomainName } from "../../configConsts";
import { toast } from "sonner";
import { getUsernameFromToken, isUserAdmin } from "../../utils/userUtils";

interface UserState {
  loggedIn: boolean;
  isAdmin: boolean;
  username: string;
  token: string;
  favoriteCityIds: number[];
}

export interface LoginResponse {
  username: string;
  token: string;
}

const initialState: UserState = {
  loggedIn: false,
  username: "",
  token: "",
  favoriteCityIds: [],
  isAdmin: false,
};

//! TODO: Add fetch for user favorite cities somewhere
const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logout(state) {
      state.loggedIn = false;
      state.username = "";
      state.token = "";
      state.favoriteCityIds = [];
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
      }
    );
  },
});

export const login = createAsyncThunk(
  "user/login",
  async (payload: { username: string; password: string }) => {
    let returnValue = { username: "", token: "" };
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

export const { logout, refreshUserLoggedIn } = userSlice.actions;

export default userSlice.reducer;
