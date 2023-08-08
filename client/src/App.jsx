import { Route, Routes } from "react-router-dom";
import "./App.css";
import Layout from "./Layout";
import { HomePage, LoginPage, RegisterPage } from "./pages";

import axios from "axios";
import { UserContextProvider } from "./context/UserContext";

// Try creating a config file and importing it in app.jsx
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true; // Sends cookies automatically

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
