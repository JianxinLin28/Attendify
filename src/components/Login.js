import { useState } from "react";
import { loginFields } from "../constants/formFields";
import FormAction from "./FormAction";
import FormExtra from "./FormExtra";
import Input from "./Input";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fields = loginFields;
let fieldsState = {};
fields.forEach((field) => (fieldsState[field.id] = ""));

const Login = () => {
  const [loginState, setLoginState] = useState(fieldsState);

  const handleChange = (e) => {
    setLoginState({ ...loginState, [e.target.id]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
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
      console.log(response.status);
      if (response.status === 200) {
        toast.success("Login successful");
        // Redirect user to dashboard.
      } else if (response.status === 400) {
        toast.success("Password does not match");
        // Display error message to user.
      } else if (response.status === 404) {
        toast.error("Email not found");
      } else {
        toast.error("Login Failed");
      }
    } catch (error) {
      console.error("An error occurred while logging in:", error);
      toast.error("An error occurred while logging in");
      // Handle error or display error message.
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
