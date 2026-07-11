import { useState } from "react";
import {
  Download,
  Eye,
  Edit2,
  Trash2,
  FileText,
  Image as ImageIcon,
} from "lucide-react";

import PreviewModal from "../preview/PreviewModal";

export default function Papar({
  paper,
  onEdit,
  onDelete,
}) {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [previewOpen, setPreviewOpen] = useState(false);

  const fileUrl = `${BASEURL}${paper.file}`;

  const extension = paper.file
    .split(".")
    .pop()
    .toLowerCase();

  const isPdf = extension === "pdf";

  return (
    <>
      <article className="admin-card">

        <div className="admin-card-row">

          <span className="badge gold">
            {paper.year}
          </span>

          <div>

            <h3>{paper.title}</h3>

            <p className="muted">
              {paper.exam_type}
            </p>

          </div>

        </div>

        <div className="actions">

          <button
            className="button subtle"
            onClick={() => setPreviewOpen(true)}
          >
            <Eye size={16} />
            Preview
          </button>

          <a
            href={fileUrl}
            download
            className="button primary"
          >
            <Download size={16} />
            Download
          </a>

          <button
            className="button subtle"
            onClick={onEdit}
          >
            <Edit2 size={16} />
          </button>

          <button
            className="button danger"
            onClick={onDelete}
          >
            <Trash2 size={16} />
          </button>

        </div>

      </article>

      <PreviewModal
        open={previewOpen}
        onClose={() => setPreviewOpen(false)}
        file={fileUrl}
        isPdf={isPdf}
        title={paper.title}
      />
    </>
  );
}