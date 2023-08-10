import React from "react";
import { useContext } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

const ProfilePage = () => {
  const { user, fetchingUser } = useContext(UserContext);

  const regularStyle = "py-2 px-4 rounded-full";
  const activeStyle = regularStyle + " bg-primary text-white";

  if (fetchingUser) {
    return <h1>Fetching user on profile page</h1>;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="mt-10">
      <nav className="flex justify-center">
        <NavLink
          to="/profile"
          end
          className={({ isActive }) => (isActive ? activeStyle : regularStyle)}
        >
          My Profile
        </NavLink>

        <NavLink
          to="/profile/bookings"
          className={({ isActive }) => (isActive ? activeStyle : regularStyle)}
        >
          My Bookings
        </NavLink>

        <NavLink
          to="/profile/accomodations"
          className={({ isActive }) => (isActive ? activeStyle : regularStyle)}
        >
          My Accomodations
        </NavLink>
      </nav>

      <Outlet />

    </section>
  );
};

export default ProfilePage;
