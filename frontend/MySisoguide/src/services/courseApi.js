import { getAccessToken } from "../utils/auth";

const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

const authHeader = () => ({
  Authorization: `Bearer ${getAccessToken()}`,
});

export async function getCourses() {
  const res = await fetch(`${BASEURL}/api/courses/`);
  return await res.json();
}

export async function createCourse(course) {
  const res = await fetch(`${BASEURL}/api/courses/create/`, {
    method: "POST",
    headers: {
      ...authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });

  return await res.json();
}

export async function updateCourse(id, course) {
  const res = await fetch(`${BASEURL}/api/courses/${id}/update/`, {
    method: "PUT",
    headers: {
      ...authHeader(),
      "Content-Type": "application/json",
    },
    body: JSON.stringify(course),
  });

  return await res.json();
}

export async function deleteCourse(id) {
  const res = await fetch(`${BASEURL}/api/courses/${id}/delete/`, {
    method: "DELETE",
    headers: authHeader(),
  });

  return res.ok;
}