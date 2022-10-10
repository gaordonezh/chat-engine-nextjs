import React, { useState, useEffect, useContext } from "react";
import { Context } from "../context";
import { useRouter } from "next/router";
import dynamic from "next/dynamic";

const ChatEngine = dynamic(() =>
  import("react-chat-engine").then((module) => module.ChatEngine)
);
const MessageFormSocial = dynamic(() =>
  import("react-chat-engine").then((module) => module.MessageFormSocial)
);

export default function Chats() {
  const router = useRouter();

  const { username, secret } = useContext(Context);
  const [showChat, setShowChat] = useState(false);

  useEffect(() => {
    if (typeof document !== null) setShowChat(true);
  });

  useEffect(() => {
    if (!username || !secret) router.push("./");
  }, []);

  if (!showChat) return <div />;

  return (
    <div className="background">
      <div className="shadow">
        <ChatEngine
          height="calc(100vh - 200px)"
          projectID={process.env.NEXT_PUBLIC_CHAT_ENGINE_PUBLIC_KEY}
          userName={username}
          userSecret={secret}
          renderNewMessageForm={() => <MessageFormSocial />}
        />
      </div>
    </div>
  );
}
