// src/components/Notification.jsx
"use client";
import { useState } from "react";

export default function Notification() {
  const [visible, setVisible] = useState(false);
  const [msg, setMsg] = useState("");

  const show = (text) => {
    setMsg(text);
    setVisible(true);
    setTimeout(() => setVisible(false), 3000);
  };

  if (!visible) return null;
  return <div className="save-notification">{msg}</div>;
}
