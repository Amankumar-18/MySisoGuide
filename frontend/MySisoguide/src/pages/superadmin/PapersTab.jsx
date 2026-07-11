import { useEffect, useState } from "react";
import { Upload } from "lucide-react";

import PaperModal from "../../components/ResourceModal/PaperModal";
import { getAccessToken } from "../../utils/auth";
import SuperadminPapercard from "../../components/ResourceModal/SuperadminPapercard";
import PreviewModal from "../../components/PreviewModal";
import DeleteConfirmModal from "../../components/ResourceModal/DeleteConfirmModal";

export default function PapersTab() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const token = getAccessToken();
  const [selectedPaper, setSelectedPaper] = useState(null);
  

  const [papers, setPapers] = useState([]);
  const [subjects, setSubjects] = useState([]);

  const [selectedSubject, setSelectedSubject] = useState("");

  const [loading, setLoading] = useState(true);

  const [showModal, setShowModal] = useState(false);

  const [editPaper, setEditPaper] = useState(null);

  const [deletePaperId, setDeletePaperId] = useState(null);

  useEffect(() => {
    fetchSubjects();
    fetchPapers();
  }, []);

  const fetchSubjects = async () => {
    try {
      const res = await fetch(`${BASEURL}/api/subjects/`);
      const data = await res.json();
      setSubjects(data);
    } catch (err) {
      console.log(err);
    }
  };

  const fetchPapers = async () => {
    try {
      setLoading(true);

      let url = `${BASEURL}/api/papers/`;

      if (selectedSubject) {
        url += `?subject=${selectedSubject}`;
      }

      const res = await fetch(url);

      const data = await res.json();

      setPapers(data);

      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    fetchPapers();
  }, [selectedSubject]);

  const deletePaper = async () => {
   

    try {
      const res = await fetch(
        `${BASEURL}/api/papers/${deletePaperId}/delete/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        fetchPapers();
      }
      setDeletePaperId(null)
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <>

      <div className="toolbar">

        <h2>
          Papers ({papers.length})
        </h2>

        <div className="toolbar-actions">

          <select
            className="select"
            value={selectedSubject}
            onChange={(e) =>
              setSelectedSubject(e.target.value)
            }
          >
            <option value="">
              All Subjects
            </option>

            {subjects.map((subject) => (
              <option
                key={subject.id}
                value={subject.id}
              >
                {subject.name}
              </option>
            ))}
          </select>

          <button
            className="button primary"
            onClick={() => {
              setEditPaper(null);
              setShowModal(true);
            }}
          >
            <Upload size={16} />
            Upload Paper
          </button>

        </div>
      </div>

      {loading ? (
        <h3>Loading...</h3>
      ) : (

        <div className="stack">

          {papers.length === 0 ? (
            <div className="empty-state">
              No Papers Found
            </div>
          ) : (

            papers.map((paper) => (

              <SuperadminPapercard
                key={paper.id}
                paper={paper}
                BASEURL={BASEURL}
                onPreview={setSelectedPaper}
                onEdit={() => {
                  setEditPaper(paper);
                  setShowModal(true);
                }
              
                  }
                onDelete={() =>
                  setDeletePaperId(paper.id)
                }
              />

            ))

          )}

        </div>

      )}

      <PaperModal
        isOpen={showModal}
        editPaper={editPaper}
        onClose={() => {
          setShowModal(false);
          setEditPaper(null);
        }}
        onSuccess={fetchPapers}
      />
      <PreviewModal
    paper={selectedPaper}
    BASEURL={BASEURL}
    onClose={() => setSelectedPaper(null)}
/>

        <DeleteConfirmModal
          isOpen={deletePaperId !== null}
          title="Delete Paper"
          message="This paper will be permanently deleted. This action cannot be undone."
          onCancel={()=>setDeletePaperId(null)}
          onConfirm={deletePaper}
        />

    </>
  );
}