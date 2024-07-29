import { useState, useEffect } from "react";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import Notifications from "./components/notifications/Notifications";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

export default function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId, setChatId } = useChatStore();
  const [showChatList, setShowChatList] = useState(true);

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

  useEffect(() => {
    if (chatId) {
      setShowChatList(false);
    } else {
      setShowChatList(true);
    }
  }, [chatId]);

  const handleBack = () => {
    setShowChatList(true);
    setChatId(null);
  };

  if (isLoading)
    return (
      <div className="lds-ring">
        <div></div>
        <div></div>
        <div></div>
        <div></div>
      </div>
    );

  return (
    <div className="app-container h-screen w-screen flex flex-col">
      <main className="chat-container flex flex-col md:flex-row h-full w-full bg-[#111928bf]">
        {currentUser ? (
          <>
            {showChatList ? (
              <List setShowChatList={setShowChatList} />
            ) : (
              <div className="flex-1 flex flex-col">
                <div className="flex-1 overflow-auto">
                  <Chat setShowChatList={handleBack} />
                </div>
              </div>
            )}
          </>
        ) : (
          <Login />
        )}
        <Notifications />
      </main>
    </div>
  );
}
