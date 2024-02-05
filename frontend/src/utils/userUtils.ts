import { decodeJWTToken } from "./jwtUtils";

export function isUserAdmin(token: string | null): boolean {
  if (token === null) return false;
  const payloadDecoded = decodeJWTToken(token);
  return payloadDecoded["isAdmin"] as boolean;
}

export function getUsernameFromToken(token: string): string {
  const payloadDecoded = decodeJWTToken(token);
  return payloadDecoded["sub"] as string;
}

export function isUserLoggedIn(): boolean {
  const token = localStorage.getItem("token");
  return token !== null && token !== "";
}
