import { useEffect, useState } from "react";
import SearchIcon from "/search.png";
import PlusIcon from "/plus.png";
import MinusIcon from "/minus.png";
import UserAvatar from "/avatar.png";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { useChatStore } from "../../../lib/chatStore";
import { doc, getDoc, onSnapshot, updateDoc } from "firebase/firestore";
import { DB } from "../../../lib/firebase";
import Spinner from "../../Load/Spinner";

const ChatList = ({ setShowChatList }) => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const { currentUser } = useUserStore();
  const { changeChat, chatId } = useChatStore();
  const [input, setInput] = useState("");

  useEffect(() => {
    const unSub = onSnapshot(
      doc(DB, "userchats", currentUser.id),
      async (res) => {
        const data = res.data();
        if (!data) {
          setChats([]);
          setIsLoading(false);
          return;
        }

        const items = data.chats;
        const promises = items.map(async (item) => {
          const userDocRef = doc(DB, "users", item.receiverId);
          const userDocSnap = await getDoc(userDocRef);
          const user = userDocSnap.data();

          return { ...item, user };
        });

        const chatData = await Promise.all(promises);
        setChats(chatData.sort((a, b) => b.updatedAt - a.updatedAt));
        setIsLoading(false);
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

  const handleSelect = async (chat) => {
    const userChats = chats.map((item) => {
      const { user, ...rest } = item;
      return rest;
    });

    const chatIndex = userChats.findIndex(
      (item) => item.chatId === chat.chatId
    );

    userChats[chatIndex].isSeen = true;
    const userChatsRef = doc(DB, "userchats", currentUser.id);

    try {
      await updateDoc(userChatsRef, {
        chats: userChats,
      });
      changeChat(chat.chatId, chat.user);
      setShowChatList(false);
    } catch (err) {
      console.log(err);
    }
  };

  if (isLoading) {
    return (
      <div className="w-full h-screen flex items-center justify-center">
        <Spinner />
      </div>
    );
  }

  const filterdChats = chats.filter((c) =>
    c.user.Username.toLowerCase().includes(input.toLowerCase())
  );

  return (
    <div className="chat-list overflow-y-auto">
      <div className="search flex items-center justify-between gap-4 px-3">
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
            onChange={(e) => setInput(e.target.value)}
          />
        </div>
        <button
          className="bg-[#11192880] p-[9px] rounded-md"
          onClick={() => setAddMode((prev) => !prev)}
        >
          <img
            src={addMode ? MinusIcon : PlusIcon}
            alt="plus-icon"
            className="w-[17.5px] h-[17.5px]"
          />
        </button>
      </div>
      {chats.length === 0 && !addMode && (
        <p className="text-center text-white mt-4">
          Add Users And Start Chat With Them
        </p>
      )}
      <ul className="mt-[6px]">
        {filterdChats.map((chat) => (
          <li
            className="chat-list-li"
            key={chat.chatId}
            onClick={() => handleSelect(chat)}
            style={{
              background: chat?.isSeen ? "transparent" : "#5185fe52",
            }}
          >
            <button
              className="item w-full p-3 flex items-center gap-3 text-start hover:bg-[#1119284e] transition-all duration-200"
              onClick={() => handleSelect(chat)}
            >
              <img
                src={chat.user.avatar || UserAvatar}
                alt="user-icon"
                className="w-11 h-11 rounded-full"
              />
              <div className="texts">
                <span className="font-semibold text-white">
                  {chat.user.Username || "Unknown User"}
                </span>
                <p className="text-sm text-[#d2d2d2]">{chat.lastMessage}</p>
              </div>
            </button>
          </li>
        ))}
      </ul>
      {addMode && <AddUser />}
    </div>
  );
};

export default ChatList;
