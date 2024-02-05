import React, { useEffect } from "react";
import "./App.css";
import Navbar from "./components/navbar/Navbar";
import { BrowserRouter, Route, Routes } from "react-router-dom";
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

function App() {
  const dispatch = useDispatch<AppDispatch>();

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
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/logout" element={<Logout />} />
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
