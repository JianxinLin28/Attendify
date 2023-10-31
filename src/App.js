import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const CommonWrapper = ({ children }) => (
  <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
    <div className="max-w-md w-full space-y-8">{children}</div>
  </div>
);

const App = () => {
  return (
    <div>
      <BrowserRouter>
        <Routes>
          <Route
            path="/"
            element={
              <CommonWrapper>
                <LoginPage />
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
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
