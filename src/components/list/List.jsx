import UserInfo from "./userInfo/userInfo";
import ChatList from "./chatList/chatList";

export default function List({ setShowChatList }) {
  return (
    <div className="list flex flex-col h-full md:w-1/3">
      <UserInfo />
      <ChatList setShowChatList={setShowChatList} />
    </div>
  );
}
