import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import UserAvatar from "/avatar.png";
import PhoneIcon from "/phone.png";
import VideoIcon from "/video.png";
import InfoIcon from "/info.png";
import EmojiIcon from "/emoji.png";
import ImgIcon from "/img.png";
import CamIcon from "/camera.png";
import MicIcon from "/mic.png";
import PatternImg from "/pattern.svg";
import { DB } from "../../lib/firebase";
import { doc, onSnapshot } from "firebase/firestore";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };
  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, []);

  useEffect(() => {
    const unSub = onSnapshot(
      doc(DB, "chats", "u3AenQTR6xT1ZrGb2YoH"),
      (res) => {
        setChat(res.data());
      }
    );

    return () => {
      unSub();
    };
  }, []);

  return (
    <div
      className="chat flex flex-col"
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
        <div className="chat-icons flex gap-1">
          <button className="hover:bg-[#1119284e] transition-all duration-200 p-2 rounded-full">
            <img src={PhoneIcon} alt="phone-icon" className="w-5 h-5" />
          </button>
          <button className="hover:bg-[#1119284e] transition-all duration-200 p-2 rounded-full">
            <img src={VideoIcon} alt="video-icon" className="w-5 h-5" />
          </button>
          <button className="hover:bg-[#1119284e] transition-all duration-200 p-2 rounded-full">
            <img src={InfoIcon} alt="info-icon" className="w-5 h-5" />
          </button>
        </div>
      </div>
      <div className="chat-center p-3 overflow-auto flex flex-col gap-4">
        <div className="message flex max-w-[75%] gap-5">
          <img
            src={UserAvatar}
            alt="user-icon"
            className="w-8 h-8 rounded-full"
          />
          <div className="texts flex flex-col gap-2">
            <span className="triangle"></span>
            <p className="text-white p-3 rounded-md rounded-tl-none mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur possimus animi sit fuga neque explicabo nisi ea, nemo
              adipisci officiis impedit, non quasi ut consequatur?
            </p>
            <span className="text-[#b4b4b4] text-sm">1 min ago</span>
          </div>
        </div>
        <div className="message own flex max-w-[75%] gap-5">
          <div className="texts flex flex-col gap-1">
            <p className="text-white p-3 rounded-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur possimus animi sit fuga neque explicabo nisi ea, nemo
              adipisci officiis impedit, non quasi ut consequatur?
            </p>
            <span className="text-[#d2d2d2] text-sm">1 min ago</span>
          </div>
        </div>
        <div className="message flex max-w-[75%] gap-5">
          <img
            src={UserAvatar}
            alt="user-icon"
            className="w-8 h-8 rounded-full"
          />
          <div className="texts flex flex-col gap-1">
            <span className="triangle"></span>
            <p className="text-white p-3 rounded-md rounded-tl-none mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur possimus animi sit fuga neque explicabo nisi ea, nemo
              adipisci officiis impedit, non quasi ut consequatur?
            </p>
            <span className="text-[#d2d2d2] text-sm">1 min ago</span>
          </div>
        </div>
        <div className="message own flex max-w-[75%] gap-5">
          <div className="texts flex flex-col gap-1">
            <p className="text-white p-3 rounded-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur possimus animi sit fuga neque explicabo nisi ea, nemo
              adipisci officiis impedit, non quasi ut consequatur?
            </p>
            <span className="text-[#d2d2d2] text-sm">1 min ago</span>
          </div>
        </div>
        <div className="message flex max-w-[75%] gap-5">
          <img
            src={UserAvatar}
            alt="user-icon"
            className="w-8 h-8 rounded-full"
          />
          <div className="texts flex flex-col gap-1">
            <span className="triangle"></span>
            <p className="text-white p-3 rounded-md rounded-tl-none mt-3">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur possimus animi sit fuga neque explicabo nisi ea, nemo
              adipisci officiis impedit, non quasi ut consequatur?
            </p>
            <span className="text-[#d2d2d2] text-sm">1 min ago</span>
          </div>
        </div>
        <div className="message own flex max-w-[75%] gap-4">
          <div className="texts flex flex-col gap-1">
            <img
              src={PatternImg}
              alt="message-image"
              className="w-full h-[300px] object-cover rounded-md"
            />
            <p className="text-white p-3 rounded-md">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Aspernatur possimus animi sit fuga neque explicabo nisi ea, nemo
              adipisci officiis impedit, non quasi ut consequatur?
            </p>
            <span className="text-[#d2d2d2] text-sm">1 min ago</span>
          </div>
        </div>
        <div ref={endRef}></div>
      </div>
      <div
        className="chat-bottom p-3 flex items-center justify-between mt-auto"
        style={{ borderTop: "1px solid #dddddd35" }}
      >
        <div className="chat-icons flex items-center gap-1">
          <button className="hover:bg-[#1119284e] transition-all duration-200 p-2 rounded-full">
            <img src={ImgIcon} alt="image-icon" className="w-5 h-5" />
          </button>
          <button className="hover:bg-[#1119284e] transition-all duration-200 p-2 rounded-full">
            <img src={CamIcon} alt="camera-icon" className="w-5 h-5" />
          </button>
          <button className="hover:bg-[#1119284e] transition-all duration-200 p-2 rounded-full">
            <img src={MicIcon} alt="mic-icon" className="w-5 h-5" />
          </button>
        </div>
        <input
          type="text"
          placeholder="Type a message ..."
          className="typing-input bg-[#11192880] rounded-md px-3 py-[6px] focus:outline-none text-white mx-3"
          style={{ flex: "1" }}
          onChange={(e) => setText(e.target.value)}
          value={text}
        />
        <div className="emoji relative flex items-center justify-center mr-3 mt-1 hover:bg-[#1119284e] transition-all duration-200 p-2 rounded-full">
          <button onClick={() => setOpen((prev) => !prev)}>
            <img src={EmojiIcon} alt="emoji-icon" className="w-5 h-5" />
          </button>
          <div className="picker absolute left-0 bottom-[50px]">
            <EmojiPicker open={open} onEmojiClick={handleEmoji} />
          </div>
        </div>
        <button className="send-btn bg-blue-500 px-3 py-1 text-white rounded-md hover:bg-blue-600 transition-all duration-200">
          Send
        </button>
      </div>
    </div>
  );
}
