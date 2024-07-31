import { useState, useEffect, useRef } from "react";
import MoreIcon from "/more.png";
import UserAvatar from "/avatar.png";
import { useUserStore } from "../../../lib/userStore";
import { auth } from "../../../lib/firebase";

export default function UserInfo() {
  const { currentUser } = useUserStore();
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  const toggleMenu = () => {
    setIsOpen((prev) => !prev);
  };

  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      !event.target.closest(".user-info .icons button")
    ) {
      setIsOpen(false);
    }
  };

  useEffect(() => {
    if (isOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  return (
    <div className="user-info flex items-center justify-between p-3 relative md:flex-row">
      <div className="user flex items-center">
        <img
          src={currentUser.avatar || UserAvatar}
          alt="user-icon"
          className="w-11 h-11 rounded-full object-contain"
        />
        <h2 className="text-lg font-semibold text-white ml-3">
          {currentUser.Username} ( You )
        </h2>
      </div>
      <div className="icons flex items-center md:ml-auto mt-2 md:mt-0">
        <button
          onClick={toggleMenu}
          className="hover:bg-[#1119284e] transition-all duration-200 p-[9px] rounded-full"
        >
          <img src={MoreIcon} alt="more-icon" className="w-5 h-5" />
        </button>
        {isOpen && (
          <div
            ref={dropdownRef}
            className="dropdown-menu absolute right-3 top-[70px] md:top-6 md:right-16 w-48 bg-[#2c61dc] rounded shadow-lg z-20"
          >
            <button
              onClick={() => {
                auth.signOut();
                setIsOpen(false);
              }}
              className="block w-full text-left px-4 py-2 text-sm text-white hover:bg-[#355db9] rounded duration-200 transition-all"
            >
              Log Out
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
