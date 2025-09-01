import { useEffect, useRef, useState } from "react";
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import {
  getDatabase,
  ref,
  push,
  onChildAdded,
  DataSnapshot
} from "firebase/database";
import { getAuth, signInAnonymously } from "firebase/auth";
import { Button } from "@/components/ui/button";
import { MessageSquare, X } from "lucide-react";

// 🔹 Replace with your Firebase config
const firebaseConfig = {
  apiKey: "AIzaSyB3YVUjhyHQJaCJ7Mcd4m5ClszLOodAZxw",
  authDomain: "bpesa-landing.firebaseapp.com",
  databaseUrl: "https://bpesa-landing-default-rtdb.firebaseio.com",
  projectId: "bpesa-landing",
  storageBucket: "bpesa-landing.firebasestorage.app",
  messagingSenderId: "328450226297",
  appId: "1:328450226297:web:d587b51167060e6cc1bca8",
  measurementId: "G-E05LVVKZBG"
};
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getDatabase(app);
const auth = getAuth(app);

type Message = {
  text: string;
  uid: string;
  timestamp: number;
};

export default function ChatSidebar() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [userId, setUserId] = useState<string | null>(null);
  const [newMsg, setNewMsg] = useState("");
  const [open, setOpen] = useState(true);
  const chatBoxRef = useRef<HTMLDivElement>(null);

  // 🔹 Auth
  useEffect(() => {
    signInAnonymously(auth).then(() => {
      setUserId(auth.currentUser?.uid || null);
    });
  }, []);

  // 🔹 Load messages
  useEffect(() => {
    const messagesRef = ref(db, "messages");
    onChildAdded(messagesRef, (snapshot: DataSnapshot) => {
      const data = snapshot.val();
      setMessages((prev) => [...prev, data]);
    });
  }, []);

  // 🔹 Auto-scroll
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scrollTop = chatBoxRef.current.scrollHeight;
    }
  }, [messages]);

  // 🔹 Send
  const sendMessage = () => {
    if (newMsg.trim() && userId) {
      push(ref(db, "messages"), {
        text: newMsg,
        uid: userId,
        timestamp: Date.now(),
      });
      setNewMsg("");
    }
  };

  return (
    <>
      {/* Toggle Button */}
      {!open && (
        <Button
          onClick={() => setOpen(true)}
          className="fixed top-1/3 right-2 z-50 shadow-lg rounded-full"
        >
          <MessageSquare className="w-5 h-5" />
        </Button>
      )}

      {/* Sidebar */}
      {open && (
        <div className="fixed top-0 right-0 h-full w-80 bg-white shadow-xl z-50 flex flex-col">
          <div className="flex items-center justify-between p-3 border-b">
            <h2 className="font-semibold">Bpesa Transaction Fee Discussion</h2>
            <Button size="sm" variant="ghost" onClick={() => setOpen(false)}>
              <X className="w-4 h-4" />
            </Button>
          </div>

        <div className="bg-blue-50 border-b border-blue-200 p-3">
            <p className="text-sm text-blue-800">
                💬 Welcome! Share your thoughts on the proposed fees, payment challenges, and ideas.  
                Your feedback helps us build Bpesa better 🚀
            </p>
        </div>

          {/* Messages */}
          <div
            ref={chatBoxRef}
            className="flex-1 overflow-y-auto p-3 space-y-2 bg-gray-50"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`p-2 rounded-lg max-w-[70%] ${
                  msg.uid === userId
                    ? "ml-auto bg-green-100"
                    : "mr-auto bg-gray-200"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="flex p-3 border-t">
            <input
              value={newMsg}
              onChange={(e) => setNewMsg(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
              placeholder="Type a message..."
              className="flex-1 border rounded-lg px-3 py-2 text-sm"
            />
            <Button size="sm" className="ml-2" onClick={sendMessage}>
              Send
            </Button>
          </div>
        </div>
      )}
    </>
  );
}
