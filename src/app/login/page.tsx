"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function LoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    if (!email || !password) {
      setErrorMsg("Vänligen fyll i både e-post och lösenord.");
      setLoading(false);
      return;
    }

    try {
      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        setErrorMsg(error.message);
      }
    } catch (error) {
      setErrorMsg("Ett fel uppstod vid inloggning.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      <h1>Login</h1>

      <form onSubmit={handleLogin}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {errorMsg && <p style={{ color: "red" }}>{errorMsg}</p>}
        {loading && <p>Loading...</p>}
        <button type="submit">Login</button>
      </form>
    </>
  );
}
