import React, { useContext, useState } from "react";
import { Context } from "../context";
import axios from "axios";
import { useRouter } from "next/router";

export default function Auth() {
  const { username, setUsername, secret, setSecret } = useContext(Context);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const onSubmit = (event) => {
    event.preventDefault();
    if (username.length === 0 || secret.length === 0) return;
    setLoading(true);
    axios
      .put(
        "https://api.chatengine.io/users/",
        { username, secret },
        {
          headers: {
            "Private-key": process.env.NEXT_PUBLIC_CHAT_ENGINE_PRIVATE_KEY,
          },
        }
      )
      .then((result) => {
        console.log("success");
        router.push("/chats");
      })
      .catch((error) => {
        console.log(error);
      })
      .finally(() => {
        setLoading(false);
      });
  };

  return (
    <div className="background">
      <div className="auth-container">
        <form className="auth-form" onSubmit={onSubmit}>
          <div className="auth-title">CHAT ENGINE</div>
          <div className="input-container">
            <input
              placeholder="Email"
              className="text-input"
              value={username}
              onChange={(event) => setUsername(event.target.value)}
              disabled={loading}
            />
          </div>
          <div className="input-container">
            <input
              placeholder="Password"
              type="password"
              className="text-input"
              value={secret}
              disabled={loading}
              onChange={(event) => setSecret(event.target.value)}
            />
          </div>
          <button type="submit" className="submit-button" disabled={loading}>
            {loading ? "Cargando..." : "Login / Sign up"}
          </button>
        </form>
      </div>
    </div>
  );
}
