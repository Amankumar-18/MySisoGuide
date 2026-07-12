import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { getAccessToken } from "../../utils/auth";

export default function PaperModal({
  isOpen,
  onClose,
  editPaper = null,
  onSuccess,
}) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const token = getAccessToken();

  const [courses, setCourses] = useState([]);
  const [subjects, setSubjects] = useState([]);
  const [filteredSubjects, setFilteredSubjects] = useState([]);

  const [form, setForm] = useState({
    course: "",
    subject: "",
    title: "",
    year: "",
    exam_type: "END",
    file: null,
  });

  useEffect(() => {
    if (!isOpen) return;

    fetchCourses();

    if (editPaper) {
      setForm({
        course: editPaper.course || "",
        subject: editPaper.subject,
        title: editPaper.title,
        year: editPaper.year,
        exam_type: editPaper.exam_type,
        file: null,
      });
    } else {
      setForm({
        course: "",
        subject: "",
        title: "",
        year: "",
        exam_type: "END",
        file: null,
      });
    }
  }, [isOpen, editPaper]);

  useEffect(() => {
    if (form.course) {
      fetchSubjects(form.course);
    }
  }, [form.course]);

  const fetchCourses = async () => {
    const res = await fetch(`${BASEURL}/api/courses/`);
    const data = await res.json();
    setCourses(data);
  };

  const fetchSubjects = async (courseId) => {
    const res = await fetch(
      `${BASEURL}/api/subjects/?course=${courseId}`
    );

    const data = await res.json();

    setSubjects(data);
    setFilteredSubjects(data);
  };

  const handleChange = (e) => {
    const { name, value, files } = e.target;

    if (name === "file") {
      setForm({ ...form, file: files[0] });
    } else {
      setForm({ ...form, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const body = new FormData();

    body.append("subject", form.subject);
    body.append("title", form.title);
    body.append("year", form.year);
    body.append("exam_type", form.exam_type);

    if (form.file) {
      body.append("file", form.file);
    }

    const url = editPaper
      ? `${BASEURL}/api/papers/${editPaper.id}/update/`
      : `${BASEURL}/api/papers/create/`;

    const method = editPaper ? "PUT" : "POST";

    const res = await fetch(url, {
      method,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      body,
    });

    if (!res.ok) {
    const error = await res.text();
    console.log(error);
    alert("Unable to save paper");
    return;
}

onSuccess();
onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="modal-overlay">
      <div className="modal">

        <div className="modal-header">
          <h2>
            {editPaper ? "Edit Paper" : "Upload Paper"}
          </h2>

          <button onClick={onClose}>
            <X />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="form">

          <label>
            Course
            <select
              className="input"
              name="course"
              value={form.course}
              onChange={handleChange}
              required
            >
              <option value="">Choose Course</option>

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
            Subject
            <select
              className="input"
              name="subject"
              value={form.subject}
              onChange={handleChange}
              required
            >
              <option value="">Choose Subject</option>

              {filteredSubjects.map((subject) => (
                <option
                  key={subject.id}
                  value={subject.id}
                >
                  {subject.name}
                </option>
              ))}
            </select>
          </label>

          <label>
            Title
            <input
              className="input"
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Year
            <input
              
              className="input"
              type="number"
              name="year"
              value={form.year}
              onChange={handleChange}
              required
            />
          </label>

          <label>
            Exam Type
            <select
              className="input"
              name="exam_type"
              value={form.exam_type}
              onChange={handleChange}
            >
              <option value="MID">Mid Semester</option>
              <option value="END">End Semester</option>
              <option value="SUPP">Supplementary</option>
              <option value="OTHER">Other</option>
            </select>
          </label>

          <label>
            PDF / Image
            <input
              className="input"
              type="file"
              name="file"
              accept=".pdf,.jpg,.jpeg,.png,.webp"
              onChange={handleChange}
              required={!editPaper}
            />
          </label>

          <button
            className="button primary"
            type="submit"
          >
            {editPaper ? "Update Paper" : "Upload Paper"}
          </button>

        </form>
      </div>
    </div>
  );
}