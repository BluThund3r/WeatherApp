export function fetchWithToken(url: string, options: RequestInit = {}) {
  const token = localStorage.getItem("token");
  if (!token) throw new Error("No token found");

  const headers = {
    ...options.headers,
    Authorization: token,
  };
  options = { ...options, headers };

  return fetch(url, options);
}

export function decodeJWTToken(token: string) {
  const payload = token.split(".")[1];
  const payloadDecoded = JSON.parse(atob(payload));
  return payloadDecoded;
}

export function isUserAdmin(token: string): boolean {
  const payloadDecoded = decodeJWTToken(token);
  return payloadDecoded["isAdmin"] as boolean;
}

export function getUsernameFromToken(token: string): string {
  const payloadDecoded = decodeJWTToken(token);
  return payloadDecoded["sub"] as string;
}
