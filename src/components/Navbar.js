import { useState } from "react";
import Wrapper from "../assets/wrappers/Navbar";
import { FaAlignLeft, FaUserCircle, FaCaretDown } from "react-icons/fa";
import Logo from "./Logo";
import { useDispatch, useSelector } from "react-redux";
import { toggleSidebar, logoutUser } from "../features/user/userSlice";
import { clearStore } from "../features/user/userSlice";
const Navbar = () => {
  const { user } = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  return (
    <Wrapper>
      <div className="nav-center">
        <button
          className="toggle-btn"
          onClick={() => {
            dispatch(toggleSidebar());
          }}
        >
          <FaAlignLeft />
        </button>

        <div>
          <Logo />
          <h3 className="logo-text">dashboard</h3>
        </div>
        <div className="btn-container">
          <button
            className="btn"
            type="button"
            onClick={() => {
              setShowDropdown(!showDropdown);
            }}
          >
            <FaUserCircle />
            {user.name}
            <FaCaretDown />
          </button>
          <div
            className={`${
              showDropdown ? "dropdown show-dropdown" : "dropdown"
            }`}
          >
            <button
              className="dropdown-btn"
              onClick={() => {
                dispatch(clearStore("Logout Successful..."));
              }}
            >
              logout
            </button>
          </div>
        </div>
      </div>
    </Wrapper>
  );
};

export default Navbar;
