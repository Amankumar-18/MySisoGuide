import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Search } from "lucide-react";

import CourseModal from "../../components/ResourceModal/CourseModal";
import { getAccessToken } from "../../utils/auth";
import DeleteConfirmModal from "../../components/resourcemodal/DeleteCofirmModal";

export default function CoursesTab() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const token = getAccessToken();

  const [courses, setCourses] = useState([]);
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingCourse, setEditingCourse] = useState(null);

  useEffect(() => {
    fetchCourses();
  }, []);

  async function fetchCourses() {
    try {
      const response = await fetch(`${BASEURL}/api/courses/`);

      const data = await response.json();

      setCourses(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
const [deleteCourseId,setDeleteCourseId]=useState(null)

  const handleDeleteCourse=async()=> {
    
    try{
    const res=await fetch(`${BASEURL}/api/courses/${deleteCourseId}/delete/`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    if(res.ok) await fetchCourses();
    setDeleteCourseId(null);
  }
  catch(err){
    console.log(err);
  }
  }

  const filteredCourses = courses.filter((course) =>
    course.name.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <h2>Loading...</h2>;

  return (
    <>
      <div className="toolbar">

        <h2>Courses ({filteredCourses.length})</h2>

        <div className="toolbar-actions">

          <div className="search-box">

            <Search size={18} />

            <input
              className="input"
              placeholder="Search course..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <button
            className="button primary"
            onClick={() => {
              setEditingCourse(null);
              setModalOpen(true);
            }}
          >
            <Plus size={16} />
            New Course
          </button>

        </div>

      </div>

      <div className="stack">

        {filteredCourses.map((course) => (

          <article
            className="admin-card"
            key={course.id}
          >

            <div>

              <h3>{course.name}</h3>

              <p className="muted">
                {course.description}
              </p>

            </div>

            <div className="actions">

              <button
                onClick={() => {
                  setEditingCourse(course);
                  setModalOpen(true);
                }}
              >
                <Edit2 size={18} />
              </button>

              <button
                onClick={() => setDeleteCourseId(course.id)}
              >
                <Trash2 size={18} />
              </button>

            </div>

          </article>

        ))}

      </div>

      <CourseModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          fetchCourses();
        }}
        course={editingCourse}
      />
      <DeleteConfirmModal
        isOpen={deleteCourseId !== null}
        title="Delete Course"
        message="This Course will be permanently deleted.This action cannot be undone."
        onCancel={()=>setDeleteCourseId(null)}
        onConfirm={handleDeleteCourse}
        />
    </>
  );
}