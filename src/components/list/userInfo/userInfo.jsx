import MoreIcon from "/more.png";
import VideoIcon from "/video.png";
import EditIcon from "/edit.png";
import UserAvatar from "/avatar.png";
import { useUserStore } from "../../../lib/userStore";

export default function UserInfo() {
  const { currentUser } = useUserStore();

  return (
    <div className="user-info flex items-center justify-between p-3">
      <div className="user flex items-center">
        <img
          src={currentUser.avatar || UserAvatar}
          alt="user-icon"
          className="w-11 h-11 rounded-full"
        />
        <h2 className="text-lg font-semibold text-white ml-3">
          {currentUser.Username}
        </h2>
      </div>
      <div className="icons flex items-center">
        <button className="hover:bg-[#1119284e] transition-all duration-200 p-[6px] rounded-full">
          <img src={MoreIcon} alt="more-icon" className="w-5 h-5" />
        </button>
        <button className="hover:bg-[#1119284e] transition-all duration-200 p-2 rounded-full">
          <img src={VideoIcon} alt="video-icon" className="w-5 h-5" />
        </button>
        <button className="hover:bg-[#1119284e] transition-all duration-200 p-2 rounded-full">
          <img src={EditIcon} alt="edit-icon" className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}
