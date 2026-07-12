// import React, { useEffect, useState } from "react";
// import { useNavigate, useParams } from "react-router-dom";
// import { ArrowLeft, FileText } from "lucide-react";

// function SubjectPapers() {
//   const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

//   const navigate = useNavigate();
//   const { subjectId } = useParams();

//   const [subject, setSubject] = useState(null);
//   const [papers, setPapers] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     fetchSubject();
//     fetchPapers();
//   }, [subjectId]);

//   const fetchSubject = async () => {
//     try {
//       const res = await fetch(
//         `${BASEURL}/api/subjects/${subjectId}/`
//       );

//       const data = await res.json();

//       setSubject(data);
//     } catch (err) {
//       console.error(err);
//     }
//   };

//   const fetchPapers = async () => {
//     try {
//       const res = await fetch(
//         `${BASEURL}/api/papers/?subject=${subjectId}`
//       );

//       const data = await res.json();

//       setPapers(data);
//     } catch (err) {
//       console.error(err);
//     } finally {
//       setLoading(false);
//     }
//   };

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
//           onClick={() => navigate(-1)}
//         >
//           <ArrowLeft size={16} />
//           Back
//         </button>

//         <div className="page-head">
//           <div>
//             <div className="label">Subject</div>

//             <h1>{subject?.name}</h1>

//             <p className="muted">
//               {subject?.code}
//               {subject?.semester
//                 ? ` • Semester ${subject.semester}`
//                 : ""}
//             </p>
//           </div>
//         </div>

//         {papers.length > 0 ? (
//           <div className="stack">
//             {papers.map((paper) => (
//               <article
//                 className="list-card"
//                 key={paper.id}
//               >
//                 <div>
//                   <h3>{paper.title}</h3>

//                   <p className="muted">
//                     {paper.year} • {paper.exam_type}
//                   </p>
//                 </div>

//                 <a
//                   href={`${BASEURL}${paper.file}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <FileText size={24} />
//                 </a>
//               </article>
//             ))}
//           </div>
//         ) : (
//           <div className="empty-state">
//             <FileText size={48} />
//             <h3>No Papers Available</h3>
//             <p>
//               No papers have been uploaded for this subject.
//             </p>
//           </div>
//         )}

//       </div>
//     </section>
//   );
// }

// export default SubjectPapers;



import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft, FileText } from "lucide-react";

import PaperCard from "../components/PaperCard";
import PreviewModal from "../components/PreviewModal";

function Paperspdf() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;
  const IMAGEBASEURL = import.meta.env.VITE_CLOUDINARY_BASE_URL;

  const navigate = useNavigate();
  const { subjectId } = useParams();

  const [subject, setSubject] = useState(null);
  const [papers, setPapers] = useState([]);
  const [loading, setLoading] = useState(true);

  const [selectedPaper, setSelectedPaper] = useState(null);

  useEffect(() => {
    fetchSubject();
    fetchPapers();
  }, [subjectId]);

  const fetchSubject = async () => {
    try {
      const res = await fetch(
        `${BASEURL}/api/subjects/${subjectId}/`
      );

      const data = await res.json();

      setSubject(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPapers = async () => {
    try {
      const res = await fetch(
        `${BASEURL}/api/papers/?subject=${subjectId}`
      );

      const data = await res.json();

      setPapers(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  console.log("This is ImageURl ",IMAGEBASEURL, "This is ABseURl ", BASEURL)

  if (loading) {
    return (
      <section className="page">
        <div className="container">
          <h2>Loading papers...</h2>
        </div>
      </section>
    );
  }

  return (
    <>
      <section className="page">

        <div className="container narrow">

          <button
            className="back-link"
            onClick={() => navigate(-1)}
          >
            <ArrowLeft size={18} />
            Back
          </button>

          <div className="page-head">

            <div>

              <div className="label">
                Subject
              </div>

              <h1>
                {subject?.name}
              </h1>

              <p className="muted">
                {subject?.code}

                {subject?.semester
                  ? ` • Semester ${subject.semester}`
                  : ""}
              </p>

            </div>

          </div>

          {papers.length === 0 ? (

            <div className="empty-state">

              <FileText size={55} />

              <h3>No Papers Uploaded</h3>

              <p>
                This subject doesn't have any papers yet.
              </p>

            </div>

          ) : (

            <div className="papers-grid">

              {papers.map((paper) => (

                <PaperCard
                  key={paper.id}
                  paper={paper}
                  BASEURL={BASEURL}
                  onPreview={setSelectedPaper}
                />

              ))}

            </div>

          )}

        </div>

      </section>

      <PreviewModal
        paper={selectedPaper}
        IMAGEBASEURL={IMAGEBASEURL}
        onClose={() => setSelectedPaper(null)}
      />

    </>
  );
}

export default Paperspdf;