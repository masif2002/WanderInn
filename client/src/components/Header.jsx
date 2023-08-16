import { MdOutlineHotelClass } from "react-icons/md";
import { GoSearch } from "react-icons/go";
import { RxHamburgerMenu } from "react-icons/rx";
import { BiSolidUserCircle } from "react-icons/bi";

import { Link } from "react-router-dom";
import { useContext } from "react";
import { UserContext } from '../context/UserContext'

export default function Header() {

  const { user } = useContext(UserContext)

  return (
    <header className="flex justify-between items-center py-4 px-8 shadow-lg z-20 relative">
      {/* Logo and Brand*/}
      <Link to='/' className="flex items-center gap-1">
        <MdOutlineHotelClass className="h-8 w-8 text-primary" />
        <h1 className="font-bold text-3xl header-text">
          Wander<span className="text-primary">Inn</span>
        </h1>
      </Link>

      {/* Search Bar */}
      <div className="hidden md:flex items-center gap-3 border border-gray-300 shadow-sm rounded-3xl px-4 py-2">
        <input type="text" placeholder="Your dream destination ..." className="outline-none"/>
        <button className="p-1.5 rounded-full text-white bg-primary flex items-center justify-center">
          <GoSearch className="h-4 w-4" />
        </button>
      </div>

      {/* User Profile */}
      <Link to={user ? '/profile' : '/login'} className="flex items-center gap-1 rounded-3xl px-4 py-2 border border-gray-300">
          <RxHamburgerMenu className="h-4 w-4" />
          <BiSolidUserCircle className="h-6 w-6 text-primary" />
          {user && <p className="text-sm">{user.name}</p>}
      </Link>
    </header>
  );
}
