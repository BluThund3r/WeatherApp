import React, { useEffect, useState } from "react";
import Form from "../../components/customForm/Form";
import { Button, Card } from "@mui/material";
import "../../index.css";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner";
import { apiDomainName } from "../../configConsts";

export default function Signup() {
  const [formData, setFormData] = useState({
    username: "",
    password: "",
    confirmPassword: "",
  });

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
    {
      value: formData.confirmPassword,
      name: "confirmPassword",
      label: "Confirm Password",
      type: "password",
      required: true,
      autoFocus: false,
      id: "confirm-password-signup",
      fullWidth: true,
      sm: 12,
    },
  ];

  const handleSubmit = async () => {
    if (
      formData.username === "" ||
      formData.password === "" ||
      formData.confirmPassword === ""
    ) {
      toast.info("Please fill in all fields");
      return;
    }

    if (formData.password !== formData.confirmPassword) {
      toast.info("Passwords do not match");
      return;
    }

    const requestOptions: RequestInit = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData),
    };
    try {
      const response = await fetch(
        `${apiDomainName}/users/register`,
        requestOptions
      );
      const responseText = await response.text();
      if (response.ok) {
        toast.success("Account created successfully");
        navigate("/login");
      } else {
        console.error("Eroare din try:", responseText);
        toast.error(responseText);
      }
    } catch (error) {
      toast.error("An error occurred");
      console.error("Eroare din catch:", error);
    }
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
        <h1>Sign Up</h1>
        <Form fields={fields} setFormData={setFormData} />
        <Button
          variant="contained"
          className="basic-button"
          style={{ marginTop: "2em" }}
          onClick={handleSubmit}
        >
          Submit
        </Button>
        <p style={{ marginTop: "2em" }}>Already have an account?</p>
        <Button onClick={() => navigate("/login")}>Go to Login</Button>
      </Card>
    </div>
  );
}
