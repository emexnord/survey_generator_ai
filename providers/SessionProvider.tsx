import { auth } from "@/auth"; // Fetch session data on the server
import SessionProviderClient from "./SessionProviderClient";

export default async function SessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const session = await auth(); // Fetch session on the server
  return (
    <SessionProviderClient session={session}>{children}</SessionProviderClient>
  );
}
