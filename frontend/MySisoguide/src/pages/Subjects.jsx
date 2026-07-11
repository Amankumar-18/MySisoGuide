// import React, { useEffect, useState } from "react";
// import {
//   ArrowLeft,
//   ChevronRight,
//   GraduationCap,
// } from "lucide-react";
// import { useLocation, useNavigate } from "react-router-dom";

// function Subjects() {
//   const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

//   const navigate = useNavigate();
//   const location = useLocation();

//   const course = location.state?.course;

//   const [subjects, setSubjects] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     if (!course) {
//       navigate("/courses");
//       return;
//     }

//     fetchSubjects();
//   }, []);

//   const fetchSubjects = async () => {
//     try {
//       const response = await fetch(
//         `${BASEURL}/api/subjects/?course=${course.id}`
//       );

//       if (!response.ok) {
//         throw new Error("Failed to fetch subjects");
//       }

//       const data = await response.json();
//       setSubjects(data);
//     } catch (error) {
//       console.error(error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   const groupedSubjects = subjects.reduce((acc, subject) => {
//     const semester = subject.semester || "Others";

//     if (!acc[semester]) {
//       acc[semester] = [];
//     }

//     acc[semester].push(subject);

//     return acc;
//   }, {});

//   if (loading) {
//     return (
//       <section className="page">
//         <div className="container">
//           <h2>Loading...</h2>
//         </div>
//       </section>
//     );
//   }

//   return (
//     <section className="page">
//       <div className="container narrow">
//         <button
//           className="back-link"
//           onClick={() => navigate("/courses")}
//         >
//           <ArrowLeft size={16} /> All Courses
//         </button>

//         <div className="course-title">
//           <span className="icon-tile">
//             <GraduationCap size={34} />
//           </span>

//           <div>
//             <div className="label">Course</div>

//             <h1>{course?.name}</h1>

//             <p className="muted">{course?.description}</p>
//           </div>
//         </div>

//         {Object.keys(groupedSubjects).length > 0 ? (
//           Object.entries(groupedSubjects).map(
//             ([semester, semesterSubjects]) => (
//               <div className="semester" key={semester}>
//                 <div className="label">
//                   Semester {semester}
//                 </div>

//                 <div className="subject-grid">
//                   {semesterSubjects.map((subject) => (
//                     <article
//                       key={subject.id}
//                       className="list-card clickable"
//                       onClick={() =>
//                         navigate("/papers", {
//                           state: {
//                             course,
//                             subject,
//                           },
//                         })
//                       }
//                     >
//                       <div>
//                         <h4>{subject.name}</h4>

//                         <p className="muted">
//                           {subject.code}
//                         </p>
//                       </div>

//                       <ChevronRight size={20} />
//                     </article>
//                   ))}
//                 </div>
//               </div>
//             )
//           )
//         ) : (
//           <div className="empty-state">
//             No subjects have been added for this course yet.
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// export default Subjects;

import React, { useEffect, useState } from "react";
import {
  ArrowLeft,
  ChevronRight,
  GraduationCap,
} from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";

function Subjects() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const navigate = useNavigate();
  const { courseId } = useParams();

  const [subjects, setSubjects] = useState([]);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourse();
    fetchSubjects();
  }, [courseId]);

  const fetchCourse = async () => {
    try {
      const response = await fetch(
        `${BASEURL}/api/courses/${courseId}/`
      );

      if (!response.ok) return;

      const data = await response.json();
      setCourse(data);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchSubjects = async () => {
    try {
      const response = await fetch(
        `${BASEURL}/api/subjects/?course=${courseId}`
      );

      if (!response.ok) {
        throw new Error("Failed to fetch subjects");
      }

      const data = await response.json();
      setSubjects(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const groupedSubjects = subjects.reduce((acc, subject) => {
    const semester = subject.semester || "Others";

    if (!acc[semester]) {
      acc[semester] = [];
    }

    acc[semester].push(subject);

    return acc;
  }, {});

  if (loading) {
    return (
      <section className="page">
        <div className="container">
          <h2>Loading...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="container narrow">

        <button
          className="back-link"
          onClick={() => navigate("/courses")}
        >
          <ArrowLeft size={16} />
          All Courses
        </button>

        <div className="course-title">
          <span className="icon-tile">
            <GraduationCap size={34} />
          </span>

          <div>
            <div className="label">Course</div>

            <h1>{course?.name || "Course"}</h1>

            <p className="muted">
              {course?.description || ""}
            </p>
          </div>
        </div>

        {Object.keys(groupedSubjects).length > 0 ? (
          Object.entries(groupedSubjects).map(
            ([semester, semesterSubjects]) => (
              <div
                className="semester"
                key={semester}
              >
                <div className="label">
                  Semester {semester}
                </div>

                <div className="subject-grid">
                  {semesterSubjects.map((subject) => (
                    <article
                      key={subject.id}
                      className="list-card clickable"
                      onClick={() =>
                        navigate(`/papers/${subject.id}`)
                      }
                    >
                      <div>
                        <h4>{subject.name}</h4>

                        <p className="muted">
                          {subject.code}
                        </p>
                      </div>

                      <ChevronRight size={20} />
                    </article>
                  ))}
                </div>
              </div>
            )
          )
        ) : (
          <div className="empty-state">
            No subjects found for this course.
          </div>
        )}

      </div>
    </section>
  );
}

export default Subjects;