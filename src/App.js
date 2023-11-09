import { BrowserRouter, Routes, Route } from "react-router-dom";
import SignupPage from "./pages/Signup";
import LoginPage from "./pages/Login";

import Dashboard from "./pages/Dashboard";

const CommonWrapper = ({ children }) => (
  <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
    <div className="max-w-md w-full space-y-8">{children}</div>
  </div>
);

const App = () => {
  return (
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
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </div>
  );
};

export default App;
