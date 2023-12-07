import React from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import Dashboard from "./pages/Dashboard";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import CreateCourse from "./pages/course";

const CommonWrapper = ({ children }) => (
  <div
    className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto bg-ebebeb"
    style={{ backgroundColor: "#ebebeb" }}
  >
    <div className="max-w-md w-full space-y-8">{children}</div>
  </div>
);

const App = () => {
  const jwt = localStorage.getItem("jwt");

  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <CommonWrapper>
                {jwt ? <Navigate to={`/dashboard/${jwt}`} /> : <LoginPage />}
              </CommonWrapper>
            }
          />
          <Route
            path="/signup"
            element={
              <CommonWrapper>
                <SignupPage />
              </CommonWrapper>
            }
          />
          <Route path="/dashboard/:jwt" element={<Dashboard />} />
          <Route path="/createCourse" element={<CreateCourse />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
