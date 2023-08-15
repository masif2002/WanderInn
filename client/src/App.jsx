import { Route, Routes } from "react-router-dom";
import "./App.css";
import { MainLayout, ProfileLayout } from "./layouts";
import {
  HomePage,
  LoginPage,
  RegisterPage,
  ProfilePage,
  BookingsPage,
  AccomodationsPage,
  AddAccomodationPage,
  AccomodationDetails,
  BookingDetails,
} from "./pages";

import axios from "axios";
import { UserContextProvider } from "./context/UserContext";

// Try creating a config file and importing it in app.jsx
axios.defaults.baseURL = "http://localhost:5000";
axios.defaults.withCredentials = true; // Sends cookies automatically

function App() {
  return (
    <UserContextProvider>
      <Routes>
        <Route path="/" element={<MainLayout />}>
          <Route index element={<HomePage />} />
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="place/:id" element={<AccomodationDetails />}/>
          <Route path="profile" element={<ProfileLayout />}>
            <Route index element={<ProfilePage/>}/>
            <Route path="bookings" element={<BookingsPage />} />
            <Route path="bookings/:id" element={<BookingDetails />}/>
            <Route path="accomodations" element={<AccomodationsPage />} />
            <Route path="accomodations/new" element={<AddAccomodationPage />} />
            <Route path="accomodations/:id" element={<AddAccomodationPage />} />
          </Route>
        </Route>
      </Routes>
    </UserContextProvider>
  );
}

export default App;
