import MoreIcon from "/more.png";
import VideoIcon from "/video.png";
import EditIcon from "/edit.png";
import UserAvatar from "/avatar.png";

export default function UserInfo() {
  return (
    <div className="user-info flex items-center justify-between p-3">
      <div className="user flex items-center">
        <img
          src={UserAvatar}
          alt="user-icon"
          className="w-11 h-11 rounded-full"
        />
        <h2 className="text-lg font-semibold text-white ml-3">
          Youssef Mohammed
        </h2>
      </div>
      <div className="icons flex items-center gap-4">
        <button>
          <img src={MoreIcon} alt="more-icon" className="w-5 h-5" />
        </button>
        <button>
          <img src={VideoIcon} alt="video-icon" className="w-5 h-5" />
        </button>
        <button>
          <img src={EditIcon} alt="edit-icon" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
