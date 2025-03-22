"use client";

import { createContext, useContext } from "react";

type Session = any | null;

const SessionContext = createContext<Session>(null);

export const useSession = () => useContext(SessionContext);

export default SessionContext;
