"use client";

import { createContext, useContext } from "react";

type Session = any | null; // Define your session type based on your auth provider

const SessionContext = createContext<Session>(null);
export const useSession = () => useContext(SessionContext);

export default function SessionProviderClient({
  children,
  session,
}: {
  children: React.ReactNode;
  session: Session;
}) {
  return (
    <SessionContext.Provider value={session}>
      {children}
    </SessionContext.Provider>
  );
}
