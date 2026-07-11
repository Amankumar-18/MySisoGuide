import { Eye,
  Download,
  FileText,
  Edit2,
  Trash2, } from "lucide-react";
import { useState } from "react";

export default function SuperadminPapercard({
    paper,
    BASEURL,
    onPreview,
    onEdit,
    onDelete,
}) {
  const fileUrl = paper.file;

  
   

  const handleDownload = async () => {
    try {
      const response = await fetch(fileUrl);
      const blob = await response.blob();

      const url = window.URL.createObjectURL(blob);

      const link = document.createElement("a");
      link.href = url;
      link.download = paper.title;

      document.body.appendChild(link);
      link.click();

      link.remove();
      window.URL.revokeObjectURL(url);
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
    <article className="paper-card">

      <div className="paper-left">

        <div className="paper-icon">
          <FileText size={30}/>
        </div>

        <div>

          <h3>{paper.title}</h3>

          {/* <p>
            {paper.year} • {paper.exam_type}
          </p> */}
          <p>
    📅 {paper.year}
    {" • "}
    📝 {paper.exam_type}
</p>

        </div>

      </div>
      <div className="actions">

              <button
                onClick={onEdit}
              >
                <Edit2 size={18} />
              </button>

              <button
                onClick={onDelete}
              >
                <Trash2 size={18} />
              </button>

            </div>

      <div className="paper-actions">

        <button
          className="preview-btn"
          onClick={() => onPreview(paper)}
        >
          <Eye size={18}/>
          Preview
        </button>

        <button
          className="download-btn"
          onClick={handleDownload}
        >
          <Download size={18}/>
          Download
        </button>

      </div>

    </article>
            
    
    </>
    
  );
}