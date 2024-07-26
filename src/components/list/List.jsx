import UserInfo from "./userInfo/userInfo";
import ChatList from "./chatList/chatList";

export default function List() {
  return (
    <div className="list flex flex-col">
      <UserInfo />
      <ChatList />
    </div>
  );
}
