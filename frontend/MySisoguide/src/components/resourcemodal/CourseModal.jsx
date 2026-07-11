import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getAccessToken } from "../../utils/auth";

export default function CourseModal({
  isOpen,
  onClose,
  course,
}) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const token = getAccessToken();

  const [form, setForm] = useState({
    name: "",
    description: "",
    icon: "BookOpen",
  });

  useEffect(() => {
    if (course) {
      setForm({
        name: course.name,
        description: course.description,
        icon: course.icon,
      });
    } else {
      setForm({
        name: "",
        description: "",
        icon: "BookOpen",
      });
    }
  }, [course]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = course
      ? `${BASEURL}/api/courses/${course.id}/update/`
      : `${BASEURL}/api/courses/create/`;

    const method = course ? "PUT" : "POST";

    try {
      const response = await fetch(url, {
        method,
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(form),
      });

      if (response.ok) {
        onClose();
      } else {
        alert("Something went wrong.");
      }
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>
            {course ? "Edit Course" : "Add Course"}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form onSubmit={handleSubmit} className="form">

          <label>
            Course Name

            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

          </label>

          <label>
            Description

            <textarea
              className="input"
              rows="4"
              name="description"
              value={form.description}
              onChange={handleChange}
            />

          </label>

          <label>
            Icon

            <input
              className="input"
              name="icon"
              value={form.icon}
              onChange={handleChange}
            />

          </label>

          <button
            className="button primary"
            type="submit"
          >
            {course ? "Update Course" : "Create Course"}
          </button>

        </form>

      </div>

    </div>
  );
}