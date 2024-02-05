import { Button } from "@mui/material";
import "./style.css";
import { RootState } from "../../state/store";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

export default function Navbar() {
  const user = useSelector((state: RootState) => state.user);
  const navigate = useNavigate();

  const navBarButtonsTop = [
    {
      label: "Home",
      path: "/",
      show: true,
    },
    {
      label: "Admin",
      path: "/admin",
      show: user.loggedIn && user.isAdmin,
    },
  ];

  const cityDetailsBasePath = "/city-details";

  const favoriteCities = [{ label: "New York", path: "/new-york", show: true }];

  const navBarButtonsBottom = [
    {
      label: "Login",
      path: "/login",
      show: !user.loggedIn,
    },
    {
      label: "Signup",
      path: "/signup",
      show: !user.loggedIn,
    },
    {
      label: "Logout",
      path: "/logout",
      show: user.loggedIn,
    },
  ];

  const handleClick = (path: string) => {
    navigate(path);
  };

  return (
    <div className="navbar actual" style={{ zIndex: 1000 }}>
      <div className="buttons-wrapper">
        {navBarButtonsTop.map((button, index) => {
          if (button.show)
            return (
              <Button
                key={index}
                variant="text"
                className="navbar-item"
                onClick={() => handleClick(button.path)}
              >
                {button.label}
              </Button>
            );
          return null;
        })}
      </div>
      {user.loggedIn ? (
        <div className="buttons-wrapper">
          <span style={{ fontWeight: "bold", color: "white" }}>
            Favorite Cities
          </span>
          {favoriteCities.map((button, index) => {
            if (button.show)
              return (
                <Button
                  key={index}
                  variant="text"
                  className="navbar-item"
                  onClick={() => handleClick(button.path)}
                >
                  {button.label}
                </Button>
              );
            return null;
          })}
        </div>
      ) : null}
      <div className="buttons-wrapper">
        {user.loggedIn ? (
          <p
            className="default-text-color"
            style={{ textAlign: "center", fontWeight: "bold" }}
          >
            {user.username}
          </p>
        ) : null}
        {navBarButtonsBottom.map((button, index) => {
          if (button.show)
            return (
              <Button
                key={index}
                variant="text"
                className="navbar-item"
                onClick={() => handleClick(button.path)}
              >
                {button.label}
              </Button>
            );
          return null;
        })}
      </div>
    </div>
  );
}
