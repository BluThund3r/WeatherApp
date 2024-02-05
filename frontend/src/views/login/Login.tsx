import { Button, Card } from "@mui/material";
import React, { useState } from "react";
import Form from "../../components/customForm/Form";
import { toast } from "sonner";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../../state/store";
import { LoginResponse, login } from "../../state/user/userSlice";
import { PayloadAction } from "@reduxjs/toolkit";
import { isUserAdmin } from "../../utils/userUtils";

interface LoginProps {
  setIsLoggedIn: (arg0: boolean) => void;
  setIsAdmin: (arg0: boolean) => void;
}

export default function Login({ setIsLoggedIn, setIsAdmin }: LoginProps) {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const user = useSelector((state: RootState) => state.user);

  const dispatch = useDispatch<AppDispatch>();

  const navigate = useNavigate();

  const fields = [
    {
      value: formData.username,
      name: "username",
      label: "Username",
      type: "text",
      required: true,
      autoFocus: true,
      id: "username-signup",
      fullWidth: true,
      sm: 12,
    },
    {
      value: formData.password,
      name: "password",
      label: "Password",
      type: "password",
      required: true,
      autoFocus: false,
      id: "password-signup",
      fullWidth: true,
      sm: 12,
    },
  ];

  const handleSubmit = async () => {
    if (formData.username === "" || formData.password === "") {
      toast.info("Please fill in all fields");
      return;
    }

    dispatch(login(formData)).then((result: any) => {
      if (result.payload.token !== "") {
        setIsLoggedIn(true);
        setIsAdmin(isUserAdmin(result.payload.token));
        navigate("/");
      }
    });
  };

  return (
    <div
      className="centering-wrapper"
      style={{
        width: "100%",
        height: "100%",
      }}
    >
      <Card
        className="padded-fit-wrapper centering-wrapper"
        style={{ width: "30%" }}
      >
        <h1 className="text-4xl font-bold">Log In</h1>
        <Form fields={fields} setFormData={setFormData} />
        <Button
          variant="contained"
          className="basic-button"
          style={{ marginTop: "2em" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <p style={{ marginTop: "2em" }}>Don't have an account?</p>
        <Button onClick={() => navigate("/signup")}>Go to SignUp</Button>
      </Card>
    </div>
  );
}
