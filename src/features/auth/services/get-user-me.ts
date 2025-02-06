import { getAuthToken } from "./get-token";

export async function getUserMe() {
  const baseUrl = "http://localhost:3001";

  const url = new URL("/user", baseUrl);

  const token = await getAuthToken();
  if (!token) return { ok: false, data: null, error: null };

  try {
    const response = await fetch(url.href, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `${token}`,
      },
    });
    const data = await response.json();
    if (data.error) return { ok: false, data: null, error: data.error };
    return { ok: true, data: data, error: null };
  } catch (error) {
    console.log(error);
    return { ok: false, data: null, error: error };
  }
}
