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
<<<<<<< HEAD
    <div className="min-h-full h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8 overflow-y-auto">
      <div className="max-w-md w-full space-y-8">
        <BrowserRouter>
          <Routes>
            <Route path="/" element={<LoginPage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path='/dashboard' element = {<Dashboard/>} />
          </Routes>
        </BrowserRouter>
      </div>
    </div>
=======
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
>>>>>>> b548467e7c3f2bb474ab93afbb4606a0ed2c60cc
  );
};

export default App;
