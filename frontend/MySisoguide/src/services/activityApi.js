const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

export async function getActivities() {
  const res = await fetch(`${BASEURL}/api/activities/`);

  return await res.json();
}