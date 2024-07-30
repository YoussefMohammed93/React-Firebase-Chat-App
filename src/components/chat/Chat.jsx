import { useEffect, useRef, useState } from "react";
import EmojiPicker from "emoji-picker-react";
import UserAvatar from "/avatar.png";
import EmojiIcon from "/emoji.png";
import ImgIcon from "/img.png";
import BackIcon from "/back.png";
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
import upload from "../../lib/upload";
import { v4 as uuidv4 } from "uuid";

export default function Chat({ setShowChatList }) {
  const [open, setOpen] = useState(false);
  const [chat, setChat] = useState(null);
  const [text, setText] = useState("");
  const { currentUser } = useUserStore();
  const { chatId, user } = useChatStore();
  const fileInputRef = useRef(null);
  const endRef = useRef(null);

  const handleEmoji = (e) => {
    setText((prev) => prev + e.emoji);
    setOpen(false);
  };

  const handleImg = async (e) => {
    if (e.target.files[0]) {
      const imgFile = e.target.files[0];
      const imgUrl = await upload(imgFile);
      await sendMessage("", imgUrl);
    }
  };

  const sendMessage = async (messageText, imgUrl = null) => {
    if (messageText.trim() === "" && !imgUrl) return;

    try {
      const messageId = uuidv4();
      await updateDoc(doc(DB, "chats", chatId), {
        messages: arrayUnion({
          id: messageId,
          senderId: currentUser.id,
          text: messageText,
          createdAt: new Date(),
          ...(imgUrl && { img: imgUrl }),
        }),
      });

      const userIDs = [currentUser.id, user.id];
      await Promise.all(
        userIDs.map(async (id) => {
          const userChatsRef = doc(DB, "userchats", id);
          const userChatsSnapshot = await getDoc(userChatsRef);

          if (userChatsSnapshot.exists()) {
            const userChatsData = userChatsSnapshot.data();
            const chatIndex = userChatsData.chats.findIndex(
              (c) => c.chatId === chatId
            );

            if (chatIndex > -1) {
              userChatsData.chats[chatIndex].lastMessage = messageText;
              userChatsData.chats[chatIndex].isSeen =
                id === currentUser.id ? true : false;
              userChatsData.chats[chatIndex].updatedAt = Date.now();

              await updateDoc(userChatsRef, {
                chats: userChatsData.chats,
              });
            }
          }
        })
      );

      setText("");
    } catch (err) {
      console.error("Error sending message:", err);
    }
  };

  const handleSend = async () => {
    await sendMessage(text);
  };

  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [chat?.messages]);

  useEffect(() => {
    const unSub = onSnapshot(doc(DB, "chats", chatId), (res) => {
      setChat(res.data());
    });

    return () => {
      unSub();
    };
  }, [chatId]);

  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div
      className="chat flex flex-col h-screen max-h-screen overflow-hidden"
      style={{
        borderLeft: "1px solid #dddddd35",
        borderRight: "1px solid #dddddd35",
      }}
    >
      <div className="chat-top flex items-center justify-between p-3 border-b border-gray-500">
        <div className="chat-user flex items-center">
          <button
            className="back-button mr-3 flex items-center justify-center hover:bg-[#1119284e] transition-all duration-200 p-1 rounded-full"
            onClick={() => setShowChatList(true)}
          >
            <img src={BackIcon} alt="back" className="w-8 h-8" />
          </button>
          <img
            src={user?.avatar || UserAvatar}
            alt="user-icon"
            className="w-12 h-12 rounded-full"
          />
          <div className="chat-texts ml-3 text-sm">
            <p className="chat-name text-gray-200 font-medium">
              {user?.name || user?.email}
            </p>
            <span className="text-white font-semibold text-lg">
              {user?.Username || "Unknown User"}
            </span>
          </div>
        </div>
      </div>
      <div className="chat-messages flex-1 overflow-y-auto p-4">
        {chat?.messages?.map((message) => (
          <div
            className={`message flex gap-3 max-w-full ${
              message.senderId === currentUser.id ? "own justify-end" : ""
            }`}
            key={message.id || message.createdAt.seconds}
          >
            {message.senderId !== currentUser.id && (
              <img
                src={user?.avatar || UserAvatar}
                alt="user-icon"
                className="w-8 h-8 rounded-full"
              />
            )}
            <div className="texts flex flex-col gap-1 my-1">
              {message.img && (
                <img
                  src={message.img}
                  alt="message-image"
                  className="w-full max-w-[300px] sm:max-w-[500px] h-auto object-cover rounded-md"
                />
              )}
              {message.text && (
                <p
                  className={`text-white px-3 py-2 rounded-md ${
                    message.senderId === currentUser.id
                      ? "rounded-tr-none"
                      : "rounded-tl-none mt-3"
                  }`}
                >
                  {message.text}
                </p>
              )}
              <span className="text-[#d2d2d2] text-xs">
                {formatDistanceToNow(
                  new Date(message.createdAt.seconds * 1000)
                )}{" "}
                ago
              </span>
            </div>
          </div>
        ))}
        <div ref={endRef} />
      </div>
      <div className="chat-input flex items-center p-4 border-t border-gray-500">
        <input
          type="text"
          className="flex-1 p-2 rounded-md bg-[#1119284e] text-white border-none outline-none focus:ring-2 focus:ring-blue-500 duration-300 transition-all"
          placeholder="Type a message ..."
          value={text}
          onChange={(e) => setText(e.target.value)}
          onKeyDown={handleKeyDown}
        />
        <button
          className="ml-2 p-2 rounded-md text-white bg-blue-500 hover:bg-blue-600 transition-all duration-200"
          onClick={handleSend}
        >
          Send
        </button>
        <button
          className="ml-2 p-2 rounded-md text-white bg-[#11192880] hover:bg-[#0c0f15be] transition-all duration-200"
          onClick={() => setOpen(!open)}
        >
          <img src={EmojiIcon} alt="emoji" className="w-6 h-6 object-cover" />
        </button>
        <button
          className="ml-2 p-2 rounded-md text-white bg-[#11192880] hover:bg-[#0c0f15be] transition-all duration-200"
          onClick={() => fileInputRef.current.click()}
        >
          <img src={ImgIcon} alt="img" className="w-6 h-6" />
        </button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleImg}
        />
      </div>
      {open && (
        <div className="emoji-picker fixed bottom-20 right-10">
          <EmojiPicker onEmojiClick={handleEmoji} />
        </div>
      )}
    </div>
  );
}
