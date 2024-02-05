import { useDispatch } from "react-redux";
import { AppDispatch } from "../../state/store";
import { useEffect } from "react";
import { logout } from "../../state/user/userSlice";
import { useNavigate } from "react-router-dom";

export default function Logout() {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(logout());
    navigate("/");
  });

  return null;
}
