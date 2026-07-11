// import React from "react";


// function Courses() {









//     return (
//     <section className="page">
//       <div className="container">
//         <div className="page-head">
//           <div>
//             <div className="label">Explore</div>
//             <h1>Choose your course</h1>
//             <p className="muted">Select a course to view its subjects and access curated question papers.</p>
//           </div>
//           <div className="search-box">
//             <Search size={18} />
//             <input className="input" type="text" placeholder="Search courses..." value={searchQuery} onChange={(event) => setSearchQuery(event.target.value)} />
//           </div>
//         </div>

//         {filteredCourses.length > 0 ? (
//           <div className="grid">
//             {filteredCourses.map((course) => (
//               <article className="card clickable" key={course.id} onClick={() => { onSelectCourse(course); navigate('subject'); }}>
//                 <IconTile name={course.icon} />
//                 <h3>{course.name}</h3>
//                 <p className="muted">{course.description}</p>
//                 <span className="card-link">View subjects <ArrowRight size={16} /></span>
//               </article>
//             ))}
//           </div>
//         ) : (
//           <div className="empty-state">
//             <Search size={46} />
//             <h2>No courses found</h2>
//             <p>Try adjusting your search terms.</p>
//           </div>
//         )}
//       </div>
//     </section>
//   );
// }

// export default Courses;



import React, { useEffect, useState } from "react";
import { Search, ArrowRight } from "lucide-react";
import { useNavigate } from "react-router-dom";

function Courses() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const navigate = useNavigate();

  const [courses, setCourses] = useState([]);
  const [filteredCourses, setFilteredCourses] = useState([]);
  const [searchQuery, setSearchQuery] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchCourses();
  }, []);

  useEffect(() => {
    const filtered = courses.filter((course) =>
      course.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    setFilteredCourses(filtered);
  }, [searchQuery, courses]);

  const fetchCourses = async () => {
    try {
      const response = await fetch(`${BASEURL}/api/courses/`);

      if (!response.ok) {
        throw new Error("Failed to fetch courses");
      }

      const data = await response.json();

      setCourses(data);
      setFilteredCourses(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

//   const handleCourseClick = (course) => {
//     navigate("/subjects", {
//       state: { course },
//     });
//   };

const handleCourseClick = (course) => {
  navigate(`/subjects/${course.id}`);
};

  if (loading) {
    return (
      <section className="page">
        <div className="container">
          <h2>Loading courses...</h2>
        </div>
      </section>
    );
  }

  return (
    <section className="page">
      <div className="container">
        <div className="page-head">
          <div>
            <div className="label">Explore</div>
            <h1>Choose your course</h1>
            <p className="muted">
              Select a course to view its subjects and access previous year
              papers.
            </p>
          </div>

          <div className="search-box">
            <Search size={18} />

            <input
              className="input"
              type="text"
              placeholder="Search courses..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>

        {filteredCourses.length > 0 ? (
          <div className="grid">
            {filteredCourses.map((course) => (
              <article
                key={course.id}
                className="card clickable"
                onClick={() => handleCourseClick(course)}
              >
                <div className="icon-tile">
                  📚
                </div>

                <h3>{course.name}</h3>

                <p className="muted">
                  {course.description}
                </p>

                <span className="card-link">
                  View Subjects <ArrowRight size={16} />
                </span>
              </article>
            ))}
          </div>
        ) : (
          <div className="empty-state">
            <Search size={46} />
            <h2>No courses found</h2>
            <p>Try adjusting your search terms.</p>
          </div>
        )}
      </div>
    </section>
  );
}

export default Courses;
