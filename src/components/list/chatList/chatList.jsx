import { useEffect, useState } from "react";
import SearchIcon from "/search.png";
import PlusIcon from "/plus.png";
import MinusIcon from "/minus.png";
import UserAvatar from "/avatar.png";
import AddUser from "./addUser/AddUser";
import { useUserStore } from "../../../lib/userStore";
import { doc, getDoc, onSnapshot } from "firebase/firestore";
import { DB } from "../../../lib/firebase";

const ChatList = () => {
  const [chats, setChats] = useState([]);
  const [addMode, setAddMode] = useState(false);
  const { currentUser } = useUserStore();

  useEffect(() => {
    const unSub = onSnapshot(
      doc(DB, "userchats", currentUser.id),
      async (res) => {
        const data = res.data();
        if (!data) {
          setChats([]);
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
      }
    );

    return () => {
      unSub();
    };
  }, [currentUser.id]);

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
      <ul className="mt-[6px]">
        {chats.map((chat) => (
          <li className="chat-list-li" key={chat.chatId}>
            <button className="item w-full p-3 flex items-center gap-3 text-start hover:bg-[#1119284e] transition-all duration-200">
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
