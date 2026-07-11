import { getAccessToken } from "../utils/auth";

const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

const authHeader = () => ({
  Authorization: `Bearer ${getAccessToken()}`,
});

export async function getUsers() {
  const res = await fetch(`${BASEURL}/api/auth/users/`, {
    headers: authHeader(),
  });

  return await res.json();
}

export async function makeAdmin(id) {
  const res = await fetch(
    `${BASEURL}/api/auth/users/${id}/make-admin/`,
    {
      method: "PATCH",
      headers: authHeader(),
    }
  );

  return await res.json();
}

export async function removeAdmin(id) {
  const res = await fetch(
    `${BASEURL}/api/auth/users/${id}/remove-admin/`,
    {
      method: "PATCH",
      headers: authHeader(),
    }
  );

  return await res.json();
}

export async function activateUser(id) {
  const res = await fetch(
    `${BASEURL}/api/auth/users/${id}/activate/`,
    {
      method: "PATCH",
      headers: authHeader(),
    }
  );

  return await res.json();
}

export async function deactivateUser(id) {
  const res = await fetch(
    `${BASEURL}/api/auth/users/${id}/deactivate/`,
    {
      method: "PATCH",
      headers: authHeader(),
    }
  );

  return await res.json();
}