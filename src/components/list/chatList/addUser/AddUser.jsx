import {
  arrayUnion,
  collection,
  doc,
  getDoc,
  getDocs,
  query,
  serverTimestamp,
  setDoc,
  updateDoc,
  where,
} from "firebase/firestore";
import UserAvatar from "/avatar.png";
import { DB } from "../../../../lib/firebase";
import { useState } from "react";
import { useUserStore } from "../../../../lib/userStore";

export default function AddUser() {
  const [user, setUser] = useState(null);
  const { currentUser } = useUserStore();

  const handleSearch = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const Username = formData.get("Username");

    try {
      const userRef = collection(DB, "users");

      const q = query(userRef, where("Username", "==", Username));
      const querySnapShot = await getDocs(q);

      if (!querySnapShot.empty) {
        setUser(querySnapShot.docs[0].data());
      }
    } catch (err) {
      console.log(err);
    }
  };

  const handleAdd = async () => {
    const chatRef = collection(DB, "chats");
    const userChatsRef = collection(DB, "userchats");

    try {
      const newChatRef = doc(chatRef);

      await setDoc(newChatRef, {
        createdAt: serverTimestamp(),
        messages: [],
      });

      const userChatDoc = doc(userChatsRef, user.id);
      const currentUserChatDoc = doc(userChatsRef, currentUser.id);

      const userChatDocSnap = await getDoc(userChatDoc);
      const currentUserChatDocSnap = await getDoc(currentUserChatDoc);

      if (!userChatDocSnap.exists()) {
        await setDoc(userChatDoc, {
          chats: [],
        });
      }

      if (!currentUserChatDocSnap.exists()) {
        await setDoc(currentUserChatDoc, {
          chats: [],
        });
      }

      await updateDoc(userChatDoc, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: currentUser.id,
          updatedAt: Date.now(),
        }),
      });

      await updateDoc(currentUserChatDoc, {
        chats: arrayUnion({
          chatId: newChatRef.id,
          lastMessage: "",
          receiverId: user.id,
          updatedAt: Date.now(),
        }),
      });
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="add-user w-max h-max p-6 bg-[#111928ef] absolute inset-0 m-auto rounded-lg z-10">
      <form onSubmit={handleSearch} className="flex gap-4">
        <input
          type="text"
          placeholder="Username"
          name="Username"
          className="pr-10 pl-5 py-0 rounded-lg border-none outline-none"
        />
        <button className="bg-[#5185fee7] text-white hover:bg-[#3d64bee7] transition-all duration-200 p-2 rounded-md">
          Search
        </button>
      </form>
      {user && (
        <div className="user flex items-center justify-between mt-12">
          <div className="detail flex items-center gap-4">
            <img
              src={user.avatar || UserAvatar}
              alt="user-icon"
              className="w-10 h-10 rounded-full object-cover"
            />
            <span className="text-white">{user.Username}</span>
          </div>
          <button
            onClick={handleAdd}
            className="bg-[#5185fee7] text-white hover:bg-[#3d64bee7] transition-all duration-200 px-2 py-1 rounded-md"
          >
            Add User
          </button>
        </div>
      )}
    </div>
  );
}
