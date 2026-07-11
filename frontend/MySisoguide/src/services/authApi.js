import { getAccessToken } from "../utils/auth";

const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

export async function login(data) {
  const res = await fetch(`${BASEURL}/api/auth/login/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function register(data) {
  const res = await fetch(`${BASEURL}/api/auth/register/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}

export async function getProfile() {
  const token = getAccessToken();

  const res = await fetch(`${BASEURL}/api/auth/me/`, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });

  return await res.json();
}

export async function changePassword(data) {
  const token = getAccessToken();

  const res = await fetch(`${BASEURL}/api/auth/change-password/`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    },
    body: JSON.stringify(data),
  });

  return await res.json();
}