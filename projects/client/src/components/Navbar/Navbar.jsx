import React, { useState } from "react";
import { useSelector } from "react-redux";
import UserDropdown from "./UserDropDown";
import AuthButtons from "./AuthButtons";
import { BiHomeAlt2 } from "react-icons/bi";
import SearchInputUser from "../utils/SearchInputUser";
import { useLocation } from "react-router-dom";
const Navbar = () => {
  const location = useLocation();
  const userToken = localStorage.getItem("user_token");
  const [isMenuOpen, setMenuOpen] = useState(false);
  const user = useSelector((state) => state.users.user);
  const routesToHideSearchInput = [
    "/register",
    "/login",
    "/verification",
    "/forget-password",
    "/reset-password",
  ];
  const shouldHideSearchInput = routesToHideSearchInput.includes(
    location.pathname
  );

  const handleMenuToggle = () => {
    setMenuOpen(!isMenuOpen);
  };

  return (
    <div className="navbar bg-white/80 shadow-md fixed top-0 z-50 w-screen lg:w-full justify-end lg:justify-between">
      <div className="absolute md:hidden left-5">
        <a className="text-black/80 text-2xl md:hidden" href="/">
          <BiHomeAlt2 />
        </a>
      </div>
      <div className="hidden md:flex">
        <a
          href="/"
          className="btn btn-ghost normal-case text-2xl lg:text-4xl text-black/70 italic lg:fixed lg:left-5"
        >
          Shopify
        </a>
      </div>

      <div className="flex flex-row gap-2">
        {!shouldHideSearchInput && <SearchInputUser />}
        {userToken ? (
          <UserDropdown key={user.id_user} user={user} />
        ) : (
          <div className="text-primary">
            <AuthButtons
              isMenuOpen={isMenuOpen}
              handleMenuToggle={handleMenuToggle}
              showButtons={true}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
