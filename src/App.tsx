import { useEffect, useState } from "react";
import { login, fetchHistory } from "./api";
import { connectSocket, getSocket } from "./socket";

interface Message {
  username: string;
  content: string;
  timestamp: string;
}

function App() {
  const [username, setUsername] = useState("");
  const [token, setToken] = useState<string | null>(null);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<Message[]>([]);

  const handleLogin = async () => {
    const data = await login(username);
    setToken(data.access_token);
    localStorage.setItem("token", data.access_token);
    localStorage.setItem("username", data.user.username);

    const socket = connectSocket(data.access_token);
    socket.on("receive_message", (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    const history = await fetchHistory();
    setMessages(history);
  };

  const handleSend = () => {
    const socket = getSocket();
    socket.emit("send_message", input);
    setInput("");
  };

  useEffect(() => {
    const savedToken = localStorage.getItem("token");
    const savedUsername = localStorage.getItem("username");
    if (savedToken && savedUsername) {
      setUsername(savedUsername);
      setToken(savedToken);
      const socket = connectSocket(savedToken);
      socket.on("receive_message", (msg: Message) => {
        setMessages((prev) => [...prev, msg]);
      });

      fetchHistory().then(setMessages);
    }
  }, []);

  if (!token) {
    return (
      <div style={{ padding: 20 }}>
        <h2>Login</h2>
        <input
          placeholder="Enter username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
        />
        <button onClick={handleLogin}>Login</button>
      </div>
    );
  }

  return (
    <div style={{ padding: 20 }}>
      <h2>Chat Realtime as <b>{username}</b></h2>
      <div>
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Enter message"
        />
        <button onClick={handleSend}>Send</button>
      </div>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>
            <b>{msg.username}</b>: {msg.content}{" "}
            <small>({new Date(msg.timestamp).toLocaleTimeString()})</small>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;