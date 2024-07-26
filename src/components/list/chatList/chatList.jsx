import { useState } from "react";
import SearchIcon from "/search.png";
import PlusIcon from "/plus.png";
import MinusIcon from "/minus.png";
import UserAvatar from "/avatar.png";

export default function ChatList() {
  const [addMode, setAddMode] = useState(false);

  return (
    <div className="chat-list overflow-y-auto">
      <div className="search flex items-center justify-between gap-4 p-3">
        <div className="search-bar relative">
          <img
            src={SearchIcon}
            alt="search-icon"
            className="w-5 h-5 absolute top-2 left-3"
          />
          <input
            type="text"
            placeholder="Search"
            className="search-input w-full bg-[#11192880] rounded-md pl-[55px] pr-1 py-[6px] focus:outline-none text-white"
          />
        </div>
        <button
          className="bg-[#11192880] p-[9px] rounded-md"
          onClick={() => setAddMode((prev) => !prev)}
        >
          <img
            src={addMode ? MinusIcon : PlusIcon}
            alt="plus-icon"
            className="w-[17.px] h-[17.5px]"
          />
        </button>
      </div>
      <ul>
        <li className="chat-list-li">
          <button className="item w-full p-3 flex items-center gap-3 text-start hover:bg-[#1119284e] transition-all duration-200">
            <img
              src={UserAvatar}
              alt="user-icon"
              className="w-11 h-11 rounded-full"
            />
            <div className="texts">
              <span className="font-semibold text-white">Youssef Mohammed</span>
              <p className="text-sm text-[#d2d2d2]">Hello!</p>
            </div>
          </button>
        </li>
        <li className="chat-list-li">
          <button className="item w-full p-3 flex items-center gap-3 text-start hover:bg-[#1119284e] transition-all duration-200">
            <img
              src={UserAvatar}
              alt="user-icon"
              className="w-11 h-11 rounded-full"
            />
            <div className="texts">
              <span className="font-semibold text-white">Youssef Mohammed</span>
              <p className="text-sm text-[#d2d2d2]">Hello!</p>
            </div>
          </button>
        </li>
        <li className="chat-list-li">
          <button className="item w-full p-3 flex items-center gap-3 text-start hover:bg-[#1119284e] transition-all duration-200">
            <img
              src={UserAvatar}
              alt="user-icon"
              className="w-11 h-11 rounded-full"
            />
            <div className="texts">
              <span className="font-semibold text-white">Youssef Mohammed</span>
              <p className="text-sm text-[#d2d2d2]">Hello!</p>
            </div>
          </button>
        </li>
        <li className="chat-list-li">
          <button className="item w-full p-3 flex items-center gap-3 text-start hover:bg-[#1119284e] transition-all duration-200">
            <img
              src={UserAvatar}
              alt="user-icon"
              className="w-11 h-11 rounded-full"
            />
            <div className="texts">
              <span className="font-semibold text-white">Youssef Mohammed</span>
              <p className="text-sm text-[#d2d2d2]">Hello!</p>
            </div>
          </button>
        </li>
        <li className="chat-list-li">
          <button className="item w-full p-3 flex items-center gap-3 text-start hover:bg-[#1119284e] transition-all duration-200">
            <img
              src={UserAvatar}
              alt="user-icon"
              className="w-11 h-11 rounded-full"
            />
            <div className="texts">
              <span className="font-semibold text-white">Youssef Mohammed</span>
              <p className="text-sm text-[#d2d2d2]">Hello!</p>
            </div>
          </button>
        </li>
        <li className="chat-list-li">
          <button className="item w-full p-3 flex items-center gap-3 text-start hover:bg-[#1119284e] transition-all duration-200">
            <img
              src={UserAvatar}
              alt="user-icon"
              className="w-11 h-11 rounded-full"
            />
            <div className="texts">
              <span className="font-semibold text-white">Youssef Mohammed</span>
              <p className="text-sm text-[#d2d2d2]">Hello!</p>
            </div>
          </button>
        </li>
        <li className="chat-list-li">
          <button className="item w-full p-3 flex items-center gap-3 text-start hover:bg-[#1119284e] transition-all duration-200">
            <img
              src={UserAvatar}
              alt="user-icon"
              className="w-11 h-11 rounded-full"
            />
            <div className="texts">
              <span className="font-semibold text-white">Youssef Mohammed</span>
              <p className="text-sm text-[#d2d2d2]">Hello!</p>
            </div>
          </button>
        </li>
        <li className="chat-list-li">
          <button className="item w-full p-3 flex items-center gap-3 text-start hover:bg-[#1119284e] transition-all duration-200">
            <img
              src={UserAvatar}
              alt="user-icon"
              className="w-11 h-11 rounded-full"
            />
            <div className="texts">
              <span className="font-semibold text-white">Youssef Mohammed</span>
              <p className="text-sm text-[#d2d2d2]">Hello!</p>
            </div>
          </button>
        </li>
        <li className="chat-list-li">
          <button className="item w-full p-3 flex items-center gap-3 text-start hover:bg-[#1119284e] transition-all duration-200">
            <img
              src={UserAvatar}
              alt="user-icon"
              className="w-11 h-11 rounded-full"
            />
            <div className="texts">
              <span className="font-semibold text-white">Youssef Mohammed</span>
              <p className="text-sm text-[#d2d2d2]">Hello!</p>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
}
