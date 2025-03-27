import jwt from "jsonwebtoken";

const ACCESS_TOKEN_SECRET =
  process.env.JWT_ACCESS_SECRET || "your-access-secret";
const REFRESH_TOKEN_SECRET =
  process.env.JWT_REFRESH_SECRET || "your-refresh-secret";
const ACCESS_TOKEN_EXPIRY = "15m"; // 15 minutes
const REFRESH_TOKEN_EXPIRY = "7d"; // 7 days

export function generateTokens(userId: string | number, email: string) {
  const accessToken = jwt.sign({ id: userId, email }, ACCESS_TOKEN_SECRET, {
    expiresIn: ACCESS_TOKEN_EXPIRY,
  });
  const refreshToken = jwt.sign({ id: userId, email }, REFRESH_TOKEN_SECRET, {
    expiresIn: REFRESH_TOKEN_EXPIRY,
  });
  return { accessToken, refreshToken };
}

export function verifyToken(token: string, isRefresh: boolean = false) {
  const secret = isRefresh ? REFRESH_TOKEN_SECRET : ACCESS_TOKEN_SECRET;
  return jwt.verify(token, secret) as { id: string; email: string };
}
