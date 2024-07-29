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
import { DB } from "../../lib/firebase";
import {
  arrayUnion,
  doc,
  getDoc,
  onSnapshot,
  updateDoc,
} from "firebase/firestore";
import { useChatStore } from "../../lib/chatStore";
import { useUserStore } from "../../lib/userStore";
import { formatDistanceToNow } from "date-fns";

export default function Chat() {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState();
  const [text, setText] = useState("");
  const { currentUser } = useUserStore();
  const { chatId, user } = useChatStore();

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleSend = async () => {
    if (text === "") return;

    try {
      await updateDoc(doc(DB, "chats", chatId), {
        messages: arrayUnion({
          senderId: currentUser.id,
          text,
          createdAt: new Date(),
        }),
      });

      const userIDs = [currentUser.id, user.id];
      userIDs.forEach(async (id) => {
        const userChatsRef = doc(DB, "userchats", id);
        const userChatsSnapshot = await getDoc(userChatsRef);

        if (userChatsSnapshot.exists()) {
          const userChatsData = userChatsSnapshot.data();
          const chatIndex = userChatsData.chats.findIndex(
            (c) => c.chatId === chatId
          );

          userChatsData.chats[chatIndex].lastMessage = text;
          userChatsData.chats[chatIndex].isSeen =
            id === currentUser.id ? true : false;
          userChatsData.chats[chatIndex].updatedAt = Date.now();

          await updateDoc(userChatsRef, {
            chats: userChatsData.chats,
          });
        }
      });
    } catch (err) {
      console.log(err);
    }
  };

  const endRef = useRef(null);

  useEffect(() => {
    endRef.current.scrollIntoView({ behavior: "smooth" });
  }, [chat]);

  useEffect(() => {
    const unSub = onSnapshot(doc(DB, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

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
            src={user?.avatar || UserAvatar}
            alt="user-icon"
            className="w-[50px] h-[50px] rounded-full"
          />
          <div className="chat-texts ml-3">
            <span className="text-white text-lg font-semibold">
              {user?.Username || "Unknown User"}
            </span>
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
        {chat?.messages?.map((message) => (
          <div
            className={`message flex max-w-[75%] gap-4 ${
              message.senderId === currentUser.id ? "own" : ""
            }`}
            key={message?.createdAt}
          >
            {message.senderId !== currentUser.id && (
              <img
                src={user?.avatar || UserAvatar}
                alt="user-icon"
                className="w-8 h-8 rounded-full"
              />
            )}
            <div className="texts flex flex-col gap-1">
              {message.img && (
                <img
                  src={message.img}
                  alt="message-image"
                  className="w-full h-[300px] object-cover rounded-md"
                />
              )}
              <p
                className={`text-white px-3 py-[10px] rounded-md ${
                  message.senderId === currentUser.id
                    ? " rounded-tr-none"
                    : "rounded-tl-none mt-3"
                }`}
              >
                {message.text}
              </p>
              <span className="text-[#d2d2d2] text-sm">
                {formatDistanceToNow(
                  new Date(message.createdAt.seconds * 1000)
                )}{" "}
                ago
              </span>
            </div>
          </div>
        ))}
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
        <button
          onClick={handleSend}
          className="send-btn bg-blue-500 px-3 py-1 text-white rounded-md hover:bg-blue-600 transition-all duration-200"
        >
          Send
        </button>
      </div>
    </div>
  );
}
