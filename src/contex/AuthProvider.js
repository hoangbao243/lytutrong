"use client";

import { AuthContext } from "./AuthContext";

export default function AuthProvider({ user, children }) {
  return (
    <AuthContext.Provider value={{ user }}>
      {children}
    </AuthContext.Provider>
  );
}