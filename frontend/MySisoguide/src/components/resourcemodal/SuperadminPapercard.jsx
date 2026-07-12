import { Eye,
  Download,
  FileText,
  Edit2,
  Trash2, } from "lucide-react";
import { useState } from "react";

export default function SuperadminPapercard({
    paper,
    PDFBASEURL,
    onPreview,
    onEdit,
    onDelete,
}) {
  const fileUrl = `${PDFBASEURL}${paper.file}`;

  
   

  

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

        
      </div>

    </article>
            
    
    </>
    
  );
}