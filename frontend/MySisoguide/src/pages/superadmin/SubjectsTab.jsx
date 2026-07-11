// import { useEffect, useState } from "react";
// import { Edit2, Trash2, Plus } from "lucide-react";

// import {
//   getSubjects,
//   createSubject,
//   updateSubject,
//   deleteSubject,
// } from "../../services/subjectApi";

// import { getCourses } from "../../services/courseApi";

// import { SubjectModal } from "../../components/ResourceModal";

// export default function SubjectsTab() {
//   const [subjects, setSubjects] = useState([]);
//   const [courses, setCourses] = useState([]);

//   const [loading, setLoading] = useState(true);

//   const [selectedSubject, setSelectedSubject] = useState(null);

//   const [isModalOpen, setIsModalOpen] = useState(false);

//   useEffect(() => {
//     loadData();
//   }, []);

//   async function loadData() {
//     setLoading(true);

//     try {
//       const courseData = await getCourses();
//       const subjectData = await getSubjects();

//       setCourses(courseData);
//       setSubjects(subjectData);
//     } catch (err) {
//       console.log(err);
//     }

//     setLoading(false);
//   }

//   function courseName(id) {
//     return courses.find(c => c.id === id)?.name || "";
//   }

//   function handleCreate() {
//     setSelectedSubject(null);
//     setIsModalOpen(true);
//   }

//   function handleEdit(subject) {
//     setSelectedSubject(subject);
//     setIsModalOpen(true);
//   }

//   async function handleDelete(id) {
//     if (!window.confirm("Delete Subject?")) return;

//     await deleteSubject(id);

//     loadData();
//   }

//   async function handleSave(subject) {
//     if (selectedSubject) {
//       await updateSubject(selectedSubject.id, subject);
//     } else {
//       await createSubject(subject);
//     }

//     setIsModalOpen(false);

//     loadData();
//   }

//   if (loading)
//     return <h3>Loading Subjects...</h3>;

//   return (
//     <>
//       <div className="toolbar">
//         <h2>
//           Subjects ({subjects.length})
//         </h2>

//         <button
//           className="button primary"
//           onClick={handleCreate}
//         >
//           <Plus size={16}/>
//           New Subject
//         </button>
//       </div>

//       <div className="stack">

//         {subjects.map(subject => (

//           <article
//             className="admin-card"
//             key={subject.id}
//           >

//             <div>

//               <h3>
//                 {subject.name}
//               </h3>

//               <p className="muted">
//                 {subject.code}
//               </p>

//               <p className="muted">
//                 {courseName(subject.course)}
//               </p>

//               {subject.semester && (
//                 <p className="muted">
//                   {subject.semester}
//                 </p>
//               )}

//             </div>

//             <div className="actions">

//               <button
//                 onClick={() =>
//                   handleEdit(subject)
//                 }
//               >
//                 <Edit2 size={18}/>
//               </button>

//               <button
//                 onClick={() =>
//                   handleDelete(subject.id)
//                 }
//               >
//                 <Trash2 size={18}/>
//               </button>

//             </div>

//           </article>

//         ))}

//       </div>

//       <SubjectModal
//         isOpen={isModalOpen}
//         subject={selectedSubject}
//         courses={courses}
//         onClose={() =>
//           setIsModalOpen(false)
//         }
//         onSave={handleSave}
//       />
//     </>
//   );
// }

import { useEffect, useState } from "react";
import { Plus, Edit2, Trash2, Search } from "lucide-react";
import SubjectModal from "../../components/ResourceModal/SubjectModal";
import { getAccessToken } from "../../utils/auth";
import DeleteConfirmModal from "../../components/resourcemodal/DeleteCofirmModal";

export default function SubjectsTab() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const token = getAccessToken();

  const [subjects, setSubjects] = useState([]);
  const [courses, setCourses] = useState([]);

  const [selectedCourse, setSelectedCourse] = useState("");

  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [modalOpen, setModalOpen] = useState(false);

  const [editingSubject, setEditingSubject] = useState(null);

  useEffect(() => {
    fetchCourses();
    fetchSubjects();
  }, []);

  async function fetchCourses() {
    try {
      const res = await fetch(`${BASEURL}/api/courses/`);
      const data = await res.json();
      setCourses(data);
    } catch (err) {
      console.log(err);
    }
  }
  async function fetchSubjects() {
    try {
      const res = await fetch(`${BASEURL}/api/subjects/`);
      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }
const [deleteSubjectId,setDeleteSubjectId]=useState(null);

  const handleDeleteSubject=async()=> {
    

    try {
      const res =await fetch(`${BASEURL}/api/subjects/${deleteSubjectId}/delete/`, {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      if (res.ok){
      await fetchSubjects();
      }
      setDeleteSubjectId(null);
    } catch (err) {
      console.log(err);
    }
  }

  const filteredSubjects = subjects.filter((subject) => {
    const matchesSearch =
      subject.name.toLowerCase().includes(search.toLowerCase()) ||
      subject.code.toLowerCase().includes(search.toLowerCase());

    const matchesCourse =
      selectedCourse === "" ||
      Number(subject.course) === Number(selectedCourse);

    return matchesSearch && matchesCourse;
  });

  if (loading) {
    return <h2>Loading Subjects...</h2>;
  }

  return (
    <>
      <div className="toolbar">

        <h2>
          Subjects ({filteredSubjects.length})
        </h2>

        <div className="toolbar-actions">

          <select
            className="select"
            value={selectedCourse}
            onChange={(e) => setSelectedCourse(e.target.value)}
          >
            <option value="">All Courses</option>

            {courses.map((course) => (
              <option
                key={course.id}
                value={course.id}
              >
                {course.name}
              </option>
            ))}
          </select>

          <div className="search-box">

            <Search size={18} />

            <input
              className="input"
              placeholder="Search Subject..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />

          </div>

          <button
            className="button primary"
            onClick={() => {
              setEditingSubject(null);
              setModalOpen(true);
            }}
          >
            <Plus size={16} />
            New Subject
          </button>

        </div>

      </div>

      <div className="stack">

        {filteredSubjects.map((subject) => {

          const course = courses.find(
            (c) => c.id === subject.course
          );

          return (

            <article
              key={subject.id}
              className="admin-card"
            >

              <div>

                <h3>
                  {subject.name}
                </h3>

                <p className="muted">
                  {subject.code}
                </p>

                <p className="muted">

                  {course?.name}

                  {subject.semester &&
                    ` • ${subject.semester}`}

                </p>

              </div>

              <div className="actions">

                <button
                  onClick={() => {
                    setEditingSubject(subject);
                    setModalOpen(true);
                  }}
                >
                  <Edit2 size={18} />
                </button>

                <button
                  onClick={() =>
                    setDeleteSubjectId(subject.id)
                  }
                >
                  <Trash2 size={18} />
                </button>

              </div>

            </article>

          );
        })}

      </div>

      <SubjectModal
        isOpen={modalOpen}
        onClose={() => {
          setModalOpen(false);
          fetchSubjects();
        }}
        subject={editingSubject}
        courses={courses}
      />

      <DeleteConfirmModal
        isOpen={deleteSubjectId !== null}
        title="Delete Subject"
        message="This Subject will be permanently deleted. This action cannot be undone."
        onCancel={()=>setDeleteSubjectId(null)}
        onConfirm={handleDeleteSubject}
        />
    </>
  );
}