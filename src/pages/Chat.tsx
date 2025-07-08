import { useEffect, useState } from 'react';
import { connectSocket, getSocket } from '../socket';
import { fetchHistory } from '../api';

interface Message {
  username: string;
  content: string;
  timestamp: string;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const username = localStorage.getItem('username') || '';

  useEffect(() => {
    const token = localStorage.getItem('token')!;
    const socket = connectSocket(token);

    socket.on('receive_message', (msg: Message) => {
      setMessages((prev) => [...prev, msg]);
    });

    fetchHistory().then(setMessages);

    return () => {
      socket.off('receive_message');
    };
  }, []);

  const handleSend = () => {
    const socket = getSocket();
    socket.emit('send_message', input);
    setInput('');
  };

  console.log({messages});

  return (
    <div className="min-h-screen bg-gray-50 p-4">
      <div className="max-w-2xl mx-auto bg-white p-4 rounded shadow">
        <h2 className="text-xl font-semibold mb-4">Logged in as: {username}</h2>

        <div className="space-y-2 mb-4 max-h-[300px] overflow-y-auto">
          {messages.map((msg, i) => (
            <div key={i} className="border-b pb-1">
              <b>{msg.username}</b>: {msg.content}{' '}
              <span className="text-xs text-gray-400">
                ({new Date(msg.timestamp).toLocaleTimeString()})
              </span>
            </div>
          ))}
        </div>

        <div className="flex gap-2">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 border p-2 rounded"
            placeholder="Type a message..."
          />
          <button
            onClick={handleSend}
            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
