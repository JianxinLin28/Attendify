import { useState } from "react";
import { signupFields } from "../constants/formFields";
import FormAction from "./FormAction";
import Input from "./Input";
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const fields = signupFields;
let fieldsState = {};

fields.forEach((field) => (fieldsState[field.id] = ""));

const Signup = () => {
  const [signupState, setSignupState] = useState(fieldsState);

  const handleChange = (e) =>
    setSignupState({ ...signupState, [e.target.id]: e.target.value });

  const handleSubmit = (e) => {
    e.preventDefault();
    createAccount();
  };

  //handle Signup API Integration here
  const createAccount = async () => {
    try {
      const userData = {
        email: signupState.email_address,
        password: signupState.password,
        role: "Instructor",
        first_name: signupState.fname,
        last_name: signupState.lname,
        spire_id: signupState.sid,
      };
      const response = await axios.post(
        "http://localhost:8080/register",
        userData
      );
      if (response.status === 201) {
        toast.success("Signup successful");
        // Redirect user to dashboard.
      } else if (response.status === 500) {
        toast.error("Error creating user");
      } else if (response.status === 502) {
        toast.error("Error during password hashing");
      } else {
        toast.error("Error during query");
      }
    } catch (error) {
      console.error("An error occurred while signing up:", error);
      toast.error("An error occurred while signing up");
      // Handle error or display error message.
    }
  };

  return (
    <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
      <div className="">
        {fields.map((field) => (
          <Input
            key={field.id}
            handleChange={handleChange}
            value={signupState[field.id]}
            labelText={field.labelText}
            labelFor={field.labelFor}
            id={field.id}
            name={field.name}
            type={field.type}
            isRequired={field.isRequired}
            placeholder={field.placeholder}
          />
        ))}
        <FormAction handleSubmit={handleSubmit} text="Signup" />
      </div>
    </form>
  );
};

export default Signup;
