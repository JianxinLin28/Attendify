import { useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import axios from "axios";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";
import "react-toastify/dist/ReactToastify.css";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const Login = () => {
  const [loginState, setLoginState] = useState(fieldsState);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!loginState.email_address.includes("umass.edu")) {
      toast.error("umass email required for logging in");
    }
    authenticateUser();
  };

  //Handle Login API Integration here
  const authenticateUser = async () => {
    try {
      const userData = {
        email: loginState.email_address,
        password: loginState.password,
      };
      const response = await axios.post(
        "http://localhost:8080/login",
        userData
      );
      if (response.status === 200) {
        toast.success("Login successful");
        console.log(response.data);
        console.log("--------------------\n\n");

        // Store JWT in local storage
        localStorage.setItem("jwt", response.data.token);
        localStorage.setItem(
          "userState",
          JSON.stringify({
            first_name: response.data.first_name,
            last_name: response.data.last_name,
            email: response.data.email,
            spire_id: response.data.spire_id,
          })
        );

        // Redirect user to dashboard.
        navigate(`/dashboard/${response.data.token}`);
      } else if (response.status === 400) {
        toast.success("Password does not match");
      } else if (response.status === 404) {
        toast.error("Email not found");
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
      toast.error("An error occurred while logging in");
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="-space-y-px">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={loginState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
      </div>

      <FormExtra />
      <FormAction handleSubmit={handleSubmit} text="Login" />
    </form>
  );
};

export default Login;
