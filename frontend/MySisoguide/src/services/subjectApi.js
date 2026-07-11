import { getAccessToken } from "../utils/auth";

const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

const authHeader = () => ({
  Authorization: `Bearer ${getAccessToken()}`,
});

export async function getSubjects(courseId = "") {
  const url = courseId
    ? `${BASEURL}/api/subjects/?course=${courseId}`
    : `${BASEURL}/api/subjects/`;

  const res = await fetch(url);

  return await res.json();
}

export async function createSubject(subject) {
  const res = await fetch(`${BASEURL}/api/subjects/create/`, {
    method: "POST",
    headers: {
      ...authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subject),
  });

  return await res.json();
}

export async function updateSubject(id, subject) {
  const res = await fetch(`${BASEURL}/api/subjects/${id}/update/`, {
    method: "PUT",
    headers: {
      ...authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(subject),
  });

  return await res.json();
}

export async function deleteSubject(id) {
  const res = await fetch(`${BASEURL}/api/subjects/${id}/delete/`, {
    method: "DELETE",
    headers: authHeader(),
  });

  return res.ok;
}