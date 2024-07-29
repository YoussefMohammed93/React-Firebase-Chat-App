import Details from "./components/details/Details";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";
import Notifications from "./components/notifications/Notifications";
import { useEffect } from "react";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "./lib/firebase";
import { useUserStore } from "./lib/userStore";
import { useChatStore } from "./lib/chatStore";

export default function App() {
  const { currentUser, isLoading, fetchUserInfo } = useUserStore();
  const { chatId } = useChatStore();

  useEffect(() => {
    const unSub = onAuthStateChanged(auth, (user) => {
      fetchUserInfo(user?.uid);
    });

    return () => {
      unSub();
    };
  }, [fetchUserInfo]);

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
    <main className="chat-container w-[95vw] h-[90vh] bg-[#111928bf] border border-[#ffffff20] rounded-lg">
      {currentUser ? (
        <>
          <List />
          {chatId && <Chat />}
          {/* {chatId && <Details />} */}
        </>
      ) : (
        <Login />
      )}
      <Notifications />
    </main>
  );
}
