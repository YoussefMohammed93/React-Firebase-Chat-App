import UserAvatar from "/avatar.png";
import PhoneIcon from "/phone.png";
import VideoIcon from "/video.png";
import InfoIcon from "/info.png";
import EmojiIcon from "/emoji.png";
import ImgIcon from "/img.png";
import CamIcon from "/camera.png";
import MicIcon from "/mic.png";

export default function Chat() {
  return (
    <div
      className="chat"
      style={{
        borderLeft: "1px solid #dddddd35",
        borderRight: "1px solid #dddddd35",
      }}
    >
      <div
        className="chat-top flex items-center justify-between p-3"
        style={{ borderBottom: "1px solid #dddddd25" }}
      >
        <div className="chat-user flex items-center">
          <img
            src={UserAvatar}
            alt="user-icon"
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="chat-texts ml-3">
            <span className="text-white text-lg font-semibold">
              Youssef Mohammed
            </span>
            <p className="text-[#d2d2d2] text-sm">
              Lorem ipsum dolor, sit amit.
            </p>
          </div>
        </div>
        <div className="chat-icons flex gap-5">
          <button>
            <img
              src={PhoneIcon}
              alt="phone-icon"
              className="w-[22px] h-[22px]"
            />
          </button>
          <button>
            <img
              src={VideoIcon}
              alt="video-icon"
              className="w-[22px] h-[22px]"
            />
          </button>
          <button>
            <img src={InfoIcon} alt="info-icon" className="w-[22px] h-[22px]" />
          </button>
        </div>
      </div>
      <div className="chat-center"></div>
      <div className="chat-bottom p-3 flex items-center justify-between">
        <div className="chat-icons flex items-center gap-4">
          <button>
            <img src={ImgIcon} alt="image-icon" className="w-5 h-5" />
          </button>
          <button>
            <img src={CamIcon} alt="camera-icon" className="w-5 h-5" />
          </button>
          <button>
            <img src={MicIcon} alt="mic-icon" className="w-5 h-5" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Type a message ..."
          className="typing-input bg-[#11192880] rounded-md px-3 py-[6px] focus:outline-none text-white mx-3"
          style={{ flex: "1" }}
        />
        <div className="emoji mr-3 mt-1">
          <button>
            <img src={EmojiIcon} alt="emoji-icon" className="w-5 h-5" />
          </button>
        </div>
        <button className="send-btn bg-blue-500 px-3 py-1 text-white rounded-md hover:bg-blue-600 transition-all duration-200">
          Send
        </button>
      </div>
    </div>
  );
}
