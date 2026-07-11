import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getAccessToken } from "../../utils/auth";

export default function SubjectModal({
  isOpen,
  onClose,
  subject,
  courses,
}) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const token = getAccessToken();

  const [form, setForm] = useState({
    course: "",
    name: "",
    code: "",
    semester: "",
  });

  useEffect(() => {
    if (subject) {
      setForm({
        course: subject.course,
        name: subject.name,
        code: subject.code,
        semester: subject.semester || "",
      });
    } else {
      setForm({
        course: "",
        name: "",
        code: "",
        semester: "",
      });
    }
  }, [subject]);

  if (!isOpen) return null;

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const url = subject
      ? `${BASEURL}/api/subjects/${subject.id}/update/`
      : `${BASEURL}/api/subjects/create/`;

    const method = subject ? "PUT" : "POST";

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
        const err = await response.json();
        alert(JSON.stringify(err));
      }
    } catch (err) {
      console.log(err);
      alert("Something went wrong.");
    }
  };

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>
            {subject ? "Edit Subject" : "Add Subject"}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form
          className="form"
          onSubmit={handleSubmit}
        >

          <label>

            Course

            <select
              className="select"
              name="course"
              value={form.course}
              onChange={handleChange}
              required
            >

              <option value="">
                Select Course
              </option>

              {courses.map((course) => (
                <option
                  key={course.id}
                  value={course.id}
                >
                  {course.name}
                </option>
              ))}

            </select>

          </label>

          <label>

            Subject Name

            <input
              className="input"
              name="name"
              value={form.name}
              onChange={handleChange}
              required
            />

          </label>

          <label>

            Subject Code

            <input
              className="input"
              name="code"
              value={form.code}
              onChange={handleChange}
              required
            />

          </label>

          <label>

            Semester

            <input
              className="input"
              name="semester"
              placeholder="Optional for Class 11 & 12"
              value={form.semester}
              onChange={handleChange}
            />

          </label>

          <button
            className="button primary"
            type="submit"
          >
            {subject ? "Update Subject" : "Create Subject"}
          </button>

        </form>

      </div>

    </div>
  );
}