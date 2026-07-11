import { getAccessToken } from "../utils/auth";

const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

const authHeader = () => ({
  Authorization: `Bearer ${getAccessToken()}`,
});

export async function getPapers(subjectId = "") {
  const url = subjectId
    ? `${BASEURL}/api/papers/?subject=${subjectId}`
    : `${BASEURL}/api/papers/`;

  const res = await fetch(url);

  return await res.json();
}

export async function uploadPaper(formData) {
  const res = await fetch(`${BASEURL}/api/papers/create/`, {
    method: "POST",
    headers: authHeader(),
    body: formData,
  });

  return await res.json();
}

export async function updatePaper(id, formData) {
  const res = await fetch(`${BASEURL}/api/papers/${id}/update/`, {
    method: "PUT",
    headers: authHeader(),
    body: formData,
  });

  return await res.json();
}

export async function deletePaper(id) {
  const res = await fetch(`${BASEURL}/api/papers/${id}/delete/`, {
    method: "DELETE",
    headers: authHeader(),
  });

  return res.ok;
}