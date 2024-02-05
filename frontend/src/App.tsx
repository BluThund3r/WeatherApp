import React, { FC, useEffect, useState } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
  useLocation,
} from "react-router-dom";
import Home from "./views/home/Home";
import Login from "./views/login/Login";
import Signup from "./views/signup/Signup";
import NotFound from "./views/notfound/NotFound";
import Logout from "./views/logout/Logout";
import "./components/navbar/style.css";
import { Toaster } from "sonner";
import { AppDispatch } from "./state/store";
import { useDispatch } from "react-redux";
import { refreshUserLoggedIn } from "./state/user/userSlice";
import { isUserAdmin, isUserLoggedIn } from "./utils/userUtils";
import { AdminDashboard } from "./views/admin/AdminDashboard";
import * as Unicons from "@iconscout/react-unicons";
import SearchBar from "./components/searchBar/SearchBar";

interface PrivateRouteProps {
  children: React.ReactElement;
  condition: boolean;
  redirectPath: string;
}

const PrivateRoute: FC<PrivateRouteProps> = ({
  children,
  condition,
  redirectPath,
}) => {
  const location = useLocation();

  return condition ? children : <Navigate to={redirectPath} />;
};

function App() {
  const dispatch = useDispatch<AppDispatch>();
  const [isLoggedIn, setIsLoggedIn] = useState(isUserLoggedIn());
  const [isAdmin, setIsAdmin] = useState(
    isUserAdmin(localStorage.getItem("token"))
  );

  useEffect(() => {
    dispatch(refreshUserLoggedIn());
  }, [dispatch]);

  return (
    <>
      <BrowserRouter>
        <div className="two-column-view">
          <Navbar />
          <div className="navbar"></div>
          <div className="default-background">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/home" element={<Home />} />
              <Route
                path="/login"
                element={
                  <PrivateRoute condition={!isLoggedIn} redirectPath="/">
                    <Login
                      setIsLoggedIn={setIsLoggedIn}
                      setIsAdmin={setIsAdmin}
                    />
                  </PrivateRoute>
                }
              />
              <Route
                path="/signup"
                element={
                  <PrivateRoute condition={!isLoggedIn} redirectPath="/">
                    <Signup />
                  </PrivateRoute>
                }
              />
              <Route
                path="/logout"
                element={
                  <PrivateRoute condition={isLoggedIn} redirectPath="/">
                    <Logout setIsLoggedIn={setIsLoggedIn} />
                  </PrivateRoute>
                }
              />
              <Route
                path="/admin"
                element={
                  <PrivateRoute
                    condition={isLoggedIn && isAdmin}
                    redirectPath="/"
                  >
                    <AdminDashboard />
                  </PrivateRoute>
                }
              />
              <Route path="*" element={<NotFound />} />
            </Routes>
          </div>
        </div>
      </BrowserRouter>
      <Toaster richColors />
    </>
  );
}

export default App;
