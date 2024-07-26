import Details from "./components/details/Details";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";
import Login from "./components/login/Login";

export default function App() {
  const user = false;

  return (
    <main className="chat-container w-[95vw] h-[90vh] bg-[#111928bf] border border-[#ffffff20] rounded-lg">
      {user ? (
        <>
          <List />
          <Chat />
          <Details />
        </>
      ) : (
        <Login />
      )}
    </main>
  );
}
