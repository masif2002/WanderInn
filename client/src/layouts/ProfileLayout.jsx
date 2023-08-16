import React from "react";
import { useContext } from "react";
import { Navigate, NavLink, Outlet } from "react-router-dom";
import { UserContext } from "../context/UserContext";

import { FiUser, FiHome } from 'react-icons/fi'
import { BsBookmarkCheck } from 'react-icons/bs'

const ProfilePage = () => {
  const { user, fetchingUser } = useContext(UserContext);

  const regularStyle = "py-2 px-6 rounded-full flex items-center gap-2 bg-gray-200";
  const activeStyle = regularStyle + " bg-primary text-white";

  if (fetchingUser) {
    return <h1>Fetching user on profile page</h1>;
  }

  if (!user) {
    return <Navigate to={"/login"} />;
  }

  return (
    <section className="mt-10 mb-32">
      <nav className="flex justify-center gap-3">
        <NavLink
          to="/profile"
          end
          className={({ isActive }) => (isActive ? activeStyle : regularStyle)}
        >
          <FiUser className="h-5 w-5" />
          My Profile
        </NavLink>

        <NavLink
          to="/profile/bookings"
          className={({ isActive }) => (isActive ? activeStyle : regularStyle)}
        >
          <BsBookmarkCheck className="h-5 w-5"/>
          My Bookings
        </NavLink>

        <NavLink
          to="/profile/accomodations"
          className={({ isActive }) => (isActive ? activeStyle : regularStyle)}
        >
          <FiHome className="h-5 w-5" />
          My Accomodations
        </NavLink>
      </nav>

      <Outlet />

    </section>
  );
};

export default ProfilePage;
