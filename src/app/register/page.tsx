"use client";

import { useState } from "react";
import { supabase } from "@/lib/supabase";

export default function RegisterPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleRegister = async (e: React.SubmitEvent<HTMLFormElement>) => {
    e.preventDefault();

    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    });

    if (error) {
      console.error("Error during registration:", error);
    } else {
      console.log("Registration data:", data);
    }
  };

  return (
    <>
      <h1>Register</h1>

      <form onSubmit={handleRegister}>
        <label htmlFor="email">Email</label>
        <input id="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <label htmlFor="password">Password</label>
        <input id="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />

        <button type="submit">Register</button>
      </form>
    </>
  );
}
