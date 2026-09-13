"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error during registration:", error);
      setError("Lösenordet måste vara minst 6 tecken långt och innehålla minst en siffra.");
    } else {
      console.log("Registration data:", data);
      setError("Registrering lyckades! Kontrollera din e-post för att bekräfta ditt konto.");
    }

    setLoading(false);
  };

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        {error && <p style={{ color: "red" }}>{error}</p>}
        {loading && <p>Loading...</p>}
        <button type="submit">Register</button>
      </form>
    </>
  );
}
