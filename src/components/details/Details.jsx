import UserAvatar from "/avatar.png";
import ArrowUpIcon from "/arrowUp.png";
import ArrowDownIcon from "/arrowDown.png";
import PatternImg from "/pattern.svg";
import DownloadIcon from "/download.png";
import { auth } from "../../lib/firebase";

export default function Details() {
  return (
    <div className="details overflow-auto">
      <div
        className="user-details flex flex-col items-center gap-4 p-3"
        style={{ borderBottom: "1px solid #dddddd35" }}
      >
        <img
          src={UserAvatar}
          alt="user-icon"
          className="w-[100px] h-[100px] rounded-full object-cover"
        />
        <h2 className="text-xl text-white font-semibold">Youssef Mohamed</h2>
        <p className="text-[#d2d2d2]">Lorem ipsum dolor, sit amit.</p>
      </div>
      <div className="info-details flex flex-col gap-6 p-3">
        <div className="option">
          <div className="title flex items-center justify-between">
            <span className="text-white">Chat Settings</span>
            <button>
              <img
                src={ArrowUpIcon}
                alt="settings-icon"
                className="w-7 h-7 rounded-full p-[6px] bg-[#0a0f1880] hover:bg-[#0a0f18c8] transition-all duration-200"
              />
            </button>
          </div>
        </div>
        <div className="option">
          <div className="title flex items-center justify-between">
            <span className="text-white">Privacy & Help</span>
            <button>
              <img
                src={ArrowUpIcon}
                alt="settings-icon"
                className="w-7 h-7 rounded-full p-[6px] bg-[#11192880] hover:bg-[#0a0f18c8] transition-all duration-200"
              />
            </button>
          </div>
        </div>
        <div className="option">
          <div className="title flex items-center justify-between">
            <span className="text-white">Shared Phtos</span>
            <button>
              <img
                src={ArrowUpIcon}
                alt="settings-icon"
                className="w-7 h-7 rounded-full p-[6px] bg-[#11192880] hover:bg-[#0a0f18c8] transition-all duration-200"
              />
            </button>
          </div>
          <div className="photos flex flex-col gap-4">
            <div className="photo-item flex items-center justify-between my-1 mt-3">
              <div className="photo-detail flex items-center gap-3">
                <img
                  src={PatternImg}
                  alt="chat-photo"
                  className="w-10 h-10 rounded-md object-cover"
                />
                <span className="text-[#d2d2d2]">photo_2024.png</span>
              </div>
              <button>
                <img
                  src={DownloadIcon}
                  alt="download-icon"
                  className="w-7 h-7 rounded-full p-[6px] bg-[#11192880] hover:bg-[#0a0f18c8] transition-all duration-200"
                />
              </button>
            </div>
            <div className="photo-item flex items-center justify-between my-1">
              <div className="photo-detail flex items-center gap-3">
                <img
                  src={PatternImg}
                  alt="chat-photo"
                  className="w-10 h-10 rounded-md object-cover"
                />
                <span className="text-[#d2d2d2]">photo_2024.png</span>
              </div>
              <button>
                <img
                  src={DownloadIcon}
                  alt="download-icon"
                  className="w-7 h-7 rounded-full p-[6px] bg-[#11192880] hover:bg-[#0a0f18c8] transition-all duration-200"
                />
              </button>
            </div>
            <div className="photo-item flex items-center justify-between my-1">
              <div className="photo-detail flex items-center gap-3">
                <img
                  src={PatternImg}
                  alt="chat-photo"
                  className="w-10 h-10 rounded-md object-cover"
                />
                <span className="text-[#d2d2d2]">photo_2024.png</span>
              </div>
              <button>
                <img
                  src={DownloadIcon}
                  alt="download-icon"
                  className="w-7 h-7 rounded-full p-[6px] bg-[#11192880] hover:bg-[#0a0f18c8] transition-all duration-200"
                />
              </button>
            </div>
          </div>
        </div>
        <div className="option">
          <div className="title flex items-center justify-between">
            <span className="text-white">Shared Files</span>
            <button>
              <img
                src={ArrowDownIcon}
                alt="settings-icon"
                className="w-7 h-7 rounded-full p-[6px] bg-[#11192880] hover:bg-[#0a0f18c8] transition-all duration-200"
              />
            </button>
          </div>
        </div>
        <button className="bg-[#cb5555] text-white hover:bg-[#a93737] transition-all duration-200 p-2 rounded-md">
          Block User
        </button>
        <button
          onClick={() => auth.signOut()}
          className="bg-[#5185fee7] text-white hover:bg-[#3d64bee7] transition-all duration-200 p-2 rounded-md"
        >
          Log Out
        </button>
      </div>
    </div>
  );
}
