import { useState, useEffect } from "react";

export default function AdminPanel() {
  const [messages, setMessages] = useState([]);
  const [reply, setReply] = useState("");
  const [selectedUser, setSelectedUser] = useState(null);
  const [editingMessage, setEditingMessage] = useState(null);
  const [editContent, setEditContent] = useState("");

  // گرفتن همه پیام‌ها از MockAPI
  const fetchMessages = async () => {
    const res = await fetch(
      "https://69358400fa8e704dafbe11e6.mockapi.io/Chat/chatapi"
    );
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
      chatId: `admin_${selectedUser}`,
      content: reply,
      timestamp: new Date().toISOString(),
      status: "sent",
      readBy: ["admin"],
      type: "text",
      replyTo: null,
      edited: false,
      attachments: [],
    };

    const res = await fetch(
      "https://69358400fa8e704dafbe11e6.mockapi.io/Chat/chatapi",
      {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(newMessage),
      }
    );

    await res.json();
    setReply("");
    fetchMessages();
  };

  // ویرایش پیام
  const updateMessage = async () => {
    if (!editingMessage) return;

    const updatedMessage = {
      ...editingMessage,
      content: editContent,
      edited: true,
    };

    await fetch(
      `https://69358400fa8e704dafbe11e6.mockapi.io/Chat/chatapi/${editingMessage.id}`,
      {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(updatedMessage),
      }
    );

    setEditingMessage(null);
    setEditContent("");
    fetchMessages();
  };

  // حذف یک پیام
  const deleteMessage = async (id) => {
    await fetch(
      `https://69358400fa8e704dafbe11e6.mockapi.io/Chat/chatapi/${id}`,
      {
        method: "DELETE",
      }
    );
    fetchMessages();
  };

  // پاک کردن کل چت کاربر انتخاب‌شده
  const clearChat = async () => {
    const userMessages = messages.filter(
      (msg) => msg.sender === selectedUser || msg.receiver === selectedUser
    );

    for (let msg of userMessages) {
      await fetch(
        `https://69358400fa8e704dafbe11e6.mockapi.io/Chat/chatapi/${msg.id}`,
        {
          method: "DELETE",
        }
      );
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

  const unreadCount = messages.filter(
    (msg) => msg.receiver === "admin" && msg.status !== "read"
  ).length;

  useEffect(() => {
    if (unreadCount > 0) {
      document.title = `(${unreadCount}) AdminPanel`;
    } else {
      document.title = "AdminPanel";
    }
  }, [unreadCount]);

  return (
    <div className="d-flex bg-light">
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
        {/* Chat messages area with fixed height */}
        <div className="overflow-auto p-2 chat-bg" style={{ height: "70vh" }}>
          {messages
            .filter(
              (msg) =>
                msg.sender === selectedUser || msg.receiver === selectedUser
            )
            .map((msg) => (
              <div
                key={msg.id}
                className={`d-flex ${
                  msg.sender === "admin"
                    ? "justify-content-end"
                    : "justify-content-start"
                }`}
                style={{ marginBottom: "4px" }}
              >
                <div
                  className={`p-2 rounded-3 shadow-sm ${
                    msg.sender === "admin"
                      ? "bg-primary text-white"
                      : "bg-light border"
                  }`}
                  style={{ maxWidth: "70%", borderRadius: "18px" }}
                >
                  <p className="mb-1">{msg.content}</p>
                  <small className="opacity-75 d-block text-end">
                    {formatTime(msg.timestamp)} •{" "}
                    {msg.edited
                      ? "ویرایش شده"
                      : msg.status === "read"
                      ? "خوانده شده"
                      : "ارسال شده"}
                  </small>
                  <div className="d-flex gap-2 mt-1">
                    <button
                      className="btn btn-sm btn-warning rounded-pill"
                      onClick={() => {
                        setEditingMessage(msg);
                        setEditContent(msg.content);
                      }}
                    >
                      ویرایش
                    </button>
                    <button
                      className="btn btn-sm btn-danger rounded-pill"
                      onClick={() => deleteMessage(msg.id)}
                    >
                      حذف
                    </button>
                  </div>
                </div>
              </div>
            ))}
        </div>

        {/* Reply / Edit bar */}
        {editingMessage ? (
          <div className="border-top p-2 d-flex align-items-center bg-white">
            <input
              type="text"
              className="form-control rounded-pill me-2"
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
            />
            <button
              onClick={updateMessage}
              className="btn btn-success rounded-pill me-2"
            >
              Save
            </button>
            <button
              onClick={() => {
                setEditingMessage(null);
                setEditContent("");
              }}
              className="btn btn-outline-secondary rounded-pill"
            >
              Cancel
            </button>
          </div>
        ) : (
          selectedUser && (
            <div className="border-top p-2 d-flex align-items-center bg-white">
              <input
                type="text"
                className="form-control rounded-pill me-2"
                placeholder="Type a reply..."
                value={reply}
                onChange={(e) => setReply(e.target.value)}
              />
              <button
                onClick={sendReply}
                className="btn btn-primary rounded-pill me-2"
              >
                Send
              </button>
              <button
                onClick={clearChat}
                className="btn btn-outline-danger rounded-pill"
              >
                پاک کردن کل چت
              </button>
            </div>
          )
        )}
      </div>
    </div>
  );
}
