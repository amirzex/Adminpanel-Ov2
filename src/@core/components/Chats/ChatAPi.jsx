import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);

  // گرفتن همه پیام‌ها از MockAPI
  const fetchMessages = async () => {
    const res = await fetch("https://69358400fa8e704dafbe11e6.mockapi.io/Chat/chatapi");
    const data = await res.json();
    setMessages(data);
  };

  useEffect(() => {
    fetchMessages();
  }, []);

  // ارسال پاسخ
  const sendReply = async () => {
    if (!reply.trim() || !selectedUser) return;

    const newMessage = {
      sender: "admin",
      receiver: selectedUser,
      content: reply,
      timestamp: new Date().toISOString(),
      status: "sent",
    };

    const res = await fetch("https://69358400fa8e704dafbe11e6.mockapi.io/Chat/chatapi", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(newMessage),
    });

    await res.json(); // جواب رو می‌گیریم تا id درست ذخیره بشه
    setReply("");
    fetchMessages(); // دوباره همه پیام‌ها رو می‌گیریم
  };

  // حذف یک پیام
  const deleteMessage = async (id) => {
    await fetch(`https://69358400fa8e704dafbe11e6.mockapi.io/Chat/chatapi/${id}`, {
      method: "DELETE",
    });
    fetchMessages();
  };

  // پاک کردن کل چت کاربر انتخاب‌شده
  const clearChat = async () => {
    const userMessages = messages.filter(
      (msg) => msg.sender === selectedUser || msg.receiver === selectedUser
    );

    for (let msg of userMessages) {
      await fetch(`https://69358400fa8e704dafbe11e6.mockapi.io/Chat/chatapi/${msg.id}`, {
        method: "DELETE",
      });
    }

    fetchMessages();
  };

  // لیست کاربران
  const users = [
    ...new Set(
      messages.map((msg) => (msg.sender === "user" ? msg.sender : msg.receiver))
    ),
  ];

  const formatTime = (isoString) => {
    const date = new Date(isoString);
    return date.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" });
  };

  return (
    <div className="d-flex vh-100 bg-light">
      {/* Sidebar */}
      <div className="col-3 border-end bg-white p-3">
        <h5 className="fw-bold mb-3">Users</h5>
        <ul className="list-group">
          {users.map((user, idx) => (
            <li
              key={idx}
              className={`list-group-item list-group-item-action ${
                selectedUser === user ? "active" : ""
              }`}
              onClick={() => setSelectedUser(user)}
              style={{ cursor: "pointer" }}
            >
              {user}
            </li>
          ))}
        </ul>
      </div>

      {/* Chat Area */}
      <div className="col d-flex flex-column">
        <div className="flex-grow-1 overflow-auto p-3">
          {messages
            .filter(
              (msg) =>
                msg.sender === selectedUser || msg.receiver === selectedUser
            )
            .map((msg) => (
              <div
                key={msg.id}
                className={`d-flex mb-2 ${
                  msg.sender === "admin"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
              >
                <div
                  className={`p-2 rounded ${
                    msg.sender === "admin"
                      ? "bg-primary text-white"
                      : "bg-secondary text-white"
                  }`}
                  style={{ maxWidth: "60%" }}
                >
                  <p className="mb-1">{msg.content}</p>
                  <small className="opacity-75 d-block">
                    {formatTime(msg.timestamp)} •{" "}
                    {msg.status === "read" ? "خوانده شده" : "ارسال شده"}
                  </small>
                  <button
                    className="btn btn-sm btn-danger mt-1"
                    onClick={() => deleteMessage(msg.id)}
                  >
                    حذف پیام
                  </button>
                </div>
              </div>
            ))}
        </div>

        {/* Reply + Clear Chat */}
        {selectedUser && (
          <div className="border-top p-3 d-flex align-items-center">
            <input
              type="text"
              className="form-control me-2"
              placeholder="Type a reply..."
              value={reply}
              onChange={(e) => setReply(e.target.value)}
            />
            <button onClick={sendReply} className="btn btn-primary me-2">
              Send
            </button>
            <button onClick={clearChat} className="btn btn-outline-danger">
              پاک کردن کل چت
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
