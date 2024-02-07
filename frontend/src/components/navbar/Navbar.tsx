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
          <span className="text-xl font-extrabold text-white">
            Favorite Cities
          </span>
          <div className="h-fit max-h-96 overflow-x-scroll">
            {user.favoriteCities.map((city, index) => {
              return (
                <Button
                  key={index}
                  variant="text"
                  className="navbar-item"
                  onClick={() => navigate(`/weather/${city.id}`)}
                >
                  {city.name.length <= 14
                    ? city.name
                    : city.name.slice(0, 11) + "..."}
                </Button>
              );
            })}
            {user.favoriteCities.length === 0 ? (
              <p className="text-red-600">No favorite cities</p>
            ) : null}
          </div>
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
