import { schemaRegisterType, schemaLoginType } from "@/features/auth/schemes";

const baseUrl = "http://localhost:3001";

export async function registerUserService(userData: schemaRegisterType) {
  const url = new URL("/auth/register", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error("Registration Service Error:", error);
    throw error;
  }
}

export async function loginUserService(userData: schemaLoginType) {
  const url = new URL("/auth/login", baseUrl);

  try {
    const response = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
      body: JSON.stringify({ ...userData }),
    });

    return response.json();
  } catch (error) {
    console.error("Login Service Error:", error);
    throw error;
  }
}
