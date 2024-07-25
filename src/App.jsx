import Details from "./components/details/Details";
import List from "./components/list/List";
import Chat from "./components/chat/Chat";

export default function App() {
  return (
    <main className="chat-container w-[90vw] h-[90vh] bg-[#111928bf] border-2 border-[#ffffff20] rounded-lg">
      <List />
      <Chat />
      <Details />
    </main>
  );
}
