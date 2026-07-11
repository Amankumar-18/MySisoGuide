// // // import { X, Download, ExternalLink } from "lucide-react";

// // // export default function PreviewModal({
// // //   paper,
// // //   BASEURL,
// // //   onClose,
// // // }) {
// // //   if (!paper) return null;

// // //   const fileUrl = `${BASEURL}${paper.file}`;

// // //   // const extension = paper.file.split(".").pop().toLowerCase();
// // //   const extension = paper.file
// // //   .split("?")[0]
// // //   .split(".")
// // //   .pop()
// // //   .toLowerCase();

// // //   const isPDF = extension === "pdf";

// // //   return (
// // //     <div className="preview-overlay" onClick={onClose}>
// // //       <div
// // //         className="preview-modal"
// // //         onClick={(e) => e.stopPropagation()}
// // //       >
// // //         {/* Header */}
// // //         <div className="preview-header">
// // //           <div>
// // //             <h2>{paper.title}</h2>

// // //             <p>
// // //               {paper.year} • {paper.exam_type}
// // //             </p>
// // //           </div>

// // //           <button
// // //             className="close-btn"
// // //             onClick={onClose}
// // //           >
// // //             <X size={24}/>
// // //           </button>
// // //         </div>

// // //         {/* Preview */}

// // //         <div className="preview-body">

// // //           {isPDF ? (
// // //             <iframe
// // //               src={fileUrl}
// // //               title={paper.title}
// // //               width="100%"
// // //               height="650"
// // //             />
// // //           ) : (
// // //             <img
// // //               src={fileUrl}
// // //               alt={paper.title}
// // //               className="preview-image"
// // //             />
// // //           )}

// // //         </div>

// // //         {/* Footer */}

// // //         <div className="preview-footer">

// // //           <a
// // //             href={fileUrl}
// // //             download
// // //             className="download-btn"
// // //           >
// // //             <Download size={18}/>
// // //             Download
// // //           </a>

// // //           <a
// // //             href={fileUrl}
// // //             target="_blank"
// // //             rel="noopener noreferrer"
// // //             className="preview-btn"
// // //           >
// // //             <ExternalLink size={18}/>
// // //             Open New Tab
// // //           </a>

// // //         </div>
// // //       </div>
// // //     </div>
// // //   );
// // // }

// // import { useEffect } from "react";
// // import {
// //   X,
// //   Download,
// //   ExternalLink,
// // } from "lucide-react";

// // export default function PreviewModal({
// //   paper,
// //   BASEURL,
// //   onClose,
// // }) {
// //   useEffect(() => {
// //     document.body.style.overflow = "hidden";

// //     return () => {
// //       document.body.style.overflow = "auto";

// //     };
// //   }, []);

// //   if (!paper) return null;

// //   const fileUrl = `${BASEURL}${paper.file}`;
// //    console.log("paper.file:", paper.file);
// //   console.log("fileUrl:", fileUrl);
// //   const extension = paper.file
// //     .split("?")[0]
// //     .split(".")
// //     .pop()
// //     .toLowerCase();

// //   const isPDF = extension === "pdf";

// //   const isImage = [
// //     "jpg",
// //     "jpeg",
// //     "png",
// //     "gif",
// //     "webp",
// //   ].includes(extension);

// //   return (
// //     <div
// //       className="preview-overlay"
// //       onClick={onClose}
// //     >
// //       <div
// //         className="preview-modal"
// //         onClick={(e) => e.stopPropagation()}
// //       >
// //         {/* Header */}
// //         <div className="preview-header">
// //           <div>
// //             <h2>{paper.title}</h2>

// //             <p>
// //               {paper.year} • {paper.exam_type}
// //             </p>
// //           </div>

// //           <button
// //             className="close-btn"
// //             onClick={onClose}
// //           >
// //             <X size={22} />
// //           </button>
// //         </div>

// //         {/* Preview */}
// //         <div className="preview-body">

// //           {isPDF ? (
// //             <iframe
// //               src={fileUrl}
// //               title={paper.title}
// //               width="100%"
// //               height="650"
// //               allowFullScreen
// //             />
// //           ) : isImage ? (
// //             <img
// //               src={fileUrl}
// //               alt={paper.title}
// //               className="preview-image"
// //             />
// //           ) : (
// //             <div className="empty-state">
// //               Preview not available for this file type.
// //             </div>
// //           )}

// //         </div>

// //         {/* Footer */}
// //         <div className="preview-footer">

// //           <a
// //             href={fileUrl}
// //             download
// //             className="download-btn"
// //           >
// //             <Download size={18} />
// //             Download
// //           </a>

// //           <a
// //             href={fileUrl}
// //             target="_blank"
// //             rel="noopener noreferrer"
// //             className="preview-btn"
// //           >
// //             <ExternalLink size={18} />
// //             Open in New Tab
// //           </a>
           
// //           <button
// //             className="button subtle"
// //             onClick={onClose}
// //           >
// //             Close
// //           </button>

// //         </div>
// //       </div>
// //     </div>
// //   );
// // }


// import { useEffect } from "react";
// import {
//   X,
//   Download,
//   ExternalLink,
// } from "lucide-react";

// export default function PreviewModal({
//   paper,
//   BASEURL,
//   onClose,
// }) {
//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   if (!paper) return null;

//   const fileUrl = `${BASEURL}${paper.file}`;

//   console.log("paper.file:", paper.file);
//   console.log("fileUrl:", fileUrl);

//   const extension = paper.file
//     .split("?")[0]
//     .split(".")
//     .pop()
//     .toLowerCase();

//   const isPDF = extension === "pdf";

//   const isImage = [
//     "jpg",
//     "jpeg",
//     "png",
//     "gif",
//     "webp",
//   ].includes(extension);

//   // const handleDownload = () => {
//   //   const link = document.createElement("a");
//   //   link.href = fileUrl;
//   //   link.download = paper.title || "paper";
//   //   document.body.appendChild(link);
//   //   link.click();
//   //   document.body.removeChild(link);
//   // };
//   const handleDownload = async () => {
//     try {
//       const response = await fetch(fileUrl);
//       const blob = await response.blob();

//       const url = window.URL.createObjectURL(blob);

//       const link = document.createElement("a");
//       link.href = url;
//       link.download = paper.title;

//       document.body.appendChild(link);
//       link.click();

//       link.remove();
//       window.URL.revokeObjectURL(url);
//     } catch (err) {
//       console.error(err);
//     }
//   };


//   return (
//     <div
//       className="preview-overlay"
//       onClick={onClose}
//     >
//       <div
//         className="preview-modal"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* Header */}
//         <div className="preview-header">
//           <div>
//             <h2>{paper.title}</h2>
//             <p>
//               {paper.year} • {paper.exam_type}
//             </p>
//           </div>

//           <button
//             className="close-btn"
//             onClick={onClose}
//           >
//             <X size={22} />
//           </button>
//         </div>

//         {/* Preview */}
//         <div className="preview-body">
//           {isPDF ? (
//             <object
//               data={fileUrl}
//               type="application/pdf"
//               width="100%"
//               height="650"
//             >
//               <p>
//                 PDF preview is not supported in your browser.
//                 <br />
//                 <a
//                   href={fileUrl}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Open PDF
//                 </a>
//               </p>
//             </object>
//           ) : isImage ? (
//             <img
//               src={fileUrl}
//               alt={paper.title}
//               className="preview-image"
//             />
//           ) : (
//             <div className="empty-state">
//               Preview not available for this file type.
//             </div>
//           )}
//         </div>

//         {/* Footer */}
//         <div className="preview-footer">
//           <button
//             onClick={handleDownload}
//             className="download-btn"
//           >
//             <Download size={18} />
//             Download
//           </button>

//           <a
//             href={fileUrl}
//             target="_blank"
//             rel="noopener noreferrer"
//             className="preview-btn"
//           >
//             <ExternalLink size={18} />
//             Open in New Tab
//           </a>

//           <button
//             className="button subtle"
//             onClick={onClose}
//           >
//             Close
//           </button>
//         </div>
//       </div>
//     </div>
//   );
// }





// import { useEffect, useState } from "react";
// import {
//   X,
//   Download,
//   ExternalLink,
//   ZoomIn,
//   ZoomOut,
//   ChevronLeft,
//   ChevronRight,
// } from "lucide-react";

// import { Document, Page, pdfjs } from "react-pdf";

// import "react-pdf/dist/Page/AnnotationLayer.css";
// import "react-pdf/dist/Page/TextLayer.css";

// pdfjs.GlobalWorkerOptions.workerSrc = new URL(
//   "pdfjs-dist/build/pdf.worker.min.mjs",
//   import.meta.url
// ).toString();

// export default function PreviewModal({
//   paper,
//   BASEURL,
//   onClose,
// }) {
//   const [numPages, setNumPages] = useState(0);
//   const [pageNumber, setPageNumber] = useState(1);
//   const [scale, setScale] = useState(1.2);

//   useEffect(() => {
//     document.body.style.overflow = "hidden";

//     return () => {
//       document.body.style.overflow = "auto";
//     };
//   }, []);

//   if (!paper) return null;

//   const fileUrl = `${BASEURL}${paper.file}`;

//   const extension = paper.file
//     .split("?")[0]
//     .split(".")
//     .pop()
//     .toLowerCase();

//   const isPDF = extension === "pdf";

//   const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(extension);

//   const handleDownload = async () => {
//     const res = await fetch(fileUrl);

//     const blob = await res.blob();

//     const url = URL.createObjectURL(blob);

//     const a = document.createElement("a");

//     a.href = url;

//     a.download = paper.title;

//     a.click();

//     URL.revokeObjectURL(url);
//   };

//   return (
//     <div className="preview-overlay" onClick={onClose}>
//       <div
//         className="preview-modal"
//         onClick={(e) => e.stopPropagation()}
//       >
//         {/* HEADER */}

//         <div className="preview-header">
//           <div>
//             <h2>{paper.title}</h2>

//             <p>
//               {paper.year} • {paper.exam_type}
//             </p>
//           </div>

//           <button
//             className="close-btn"
//             onClick={onClose}
//           >
//             <X size={22} />
//           </button>
//         </div>

//         {/* PDF TOOLBAR */}

//         {isPDF && (
//           <div className="pdf-toolbar">

//             <button
//               onClick={() =>
//                 setPageNumber((p) => Math.max(1, p - 1))
//               }
//             >
//               <ChevronLeft />
//             </button>

//             <span>
//               {pageNumber} / {numPages}
//             </span>

//             <button
//               onClick={() =>
//                 setPageNumber((p) =>
//                   Math.min(numPages, p + 1)
//                 )
//               }
//             >
//               <ChevronRight />
//             </button>

//             <button
//               onClick={() =>
//                 setScale((s) => Math.max(0.8, s - 0.2))
//               }
//             >
//               <ZoomOut />
//             </button>

//             <button
//               onClick={() =>
//                 setScale((s) => Math.min(3, s + 0.2))
//               }
//             >
//               <ZoomIn />
//             </button>

//           </div>
//         )}

//         {/* BODY */}

//         <div className="preview-body">

//           {isPDF ? (
//             <Document
//               file={fileUrl}
//               onLoadSuccess={({ numPages }) => {
//                 setNumPages(numPages);
//               }}
//             >
//               <Page
//                 pageNumber={pageNumber}
//                 scale={scale}
//               />
//             </Document>
//           ) : isImage ? (
//             <img
//               src={fileUrl}
//               alt={paper.title}
//               className="preview-image"
//             />
//           ) : (
//             <div className="empty-state">
//               Preview not available.
//             </div>
//           )}

//         </div>

//         {/* FOOTER */}

//         <div className="preview-footer">

//           <button
//             className="download-btn"
//             onClick={handleDownload}
//           >
//             <Download size={18} />
//             Download
//           </button>

//           <a
//             href={fileUrl}
//             target="_blank"
//             rel="noreferrer"
//             className="preview-btn"
//           >
//             <ExternalLink size={18} />
//             Open in New Tab
//           </a>

//           <button
//             className="button subtle"
//             onClick={onClose}
//           >
//             Close
//           </button>

//         </div>
//       </div>
//     </div>
//   );
// }



import { useEffect, useState } from "react";
import {
  X,
  Download,
  ExternalLink,
  ZoomIn,
  ZoomOut,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";

import { Document, Page, pdfjs } from "react-pdf";

import "react-pdf/dist/Page/AnnotationLayer.css";
import "react-pdf/dist/Page/TextLayer.css";

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  "pdfjs-dist/build/pdf.worker.min.mjs",
  import.meta.url
).toString();

export default function PreviewModal({
  paper,
  BASEURL,
  onClose,
}) {
  const [numPages, setNumPages] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [scale, setScale] = useState(1.2);

  // useEffect(() => {
  //   document.body.style.overflow = "hidden";
  //   return () => {
  //     document.body.style.overflow = "auto";
  //   };
  // }, []);

useEffect(() => {
  if (!paper) return;

  document.body.style.overflow = "hidden";

  return () => {
    document.body.style.overflow = "";
  };
}, [paper]);


  if (!paper) return null;

  // const fileUrl = `${BASEURL}${paper.file}`;
  const fileUrl = paper.file;

  const extension = paper.file
    .split("?")[0]
    .split(".")
    .pop()
    .toLowerCase();

  const isPDF = extension === "pdf";

  const isImage = ["jpg", "jpeg", "png", "gif", "webp"].includes(extension);

  const handleDownload = async () => {
    const res = await fetch(fileUrl);
    const blob = await res.blob();

    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = paper.title;
    a.click();

    URL.revokeObjectURL(url);
  };

  return (
    <div className="preview-overlay" onClick={onClose}>
      <div
        className="preview-modal"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}

        <div className="preview-header">
          <div>
            <h2>{paper.title}</h2>
            <p>
              {paper.year} • {paper.exam_type}
            </p>
          </div>

          <button className="close-btn" onClick={onClose}>
            <X size={22} />
          </button>
        </div>

        {/* Toolbar */}

        {isPDF && (
          <div className="pdf-toolbar">

            <button
              disabled={pageNumber === 1}
              onClick={() => setPageNumber((p) => p - 1)}
            >
              <ChevronLeft size={18} />
            </button>

            <span>
              {pageNumber} / {numPages || 1}
            </span>

            <button
              disabled={pageNumber === numPages}
              onClick={() => setPageNumber((p) => p + 1)}
            >
              <ChevronRight size={18} />
            </button>

            <button
              onClick={() =>
                setScale((s) => Math.max(0.6, s - 0.2))
              }
            >
              <ZoomOut size={18} />
            </button>

            <button
              onClick={() =>
                setScale((s) => Math.min(3, s + 0.2))
              }
            >
              <ZoomIn size={18} />
            </button>

          </div>
        )}

        {/* Preview */}

        <div className="preview-body ">

          {isPDF ? (
            <Document
              file={{
                url: fileUrl,
              }}
              loading={<h3>Loading PDF...</h3>}
              error={<h3>Failed to load PDF.</h3>}
              onLoadSuccess={({ numPages }) => {
                console.log("PDF Loaded");
                setNumPages(numPages);
                setPageNumber(1);
              }}
              onLoadError={(error) => {
                console.error("PDF ERROR:", error);
              }}
            >
              <Page
                pageNumber={pageNumber}
                scale={scale}
              />
            </Document>
          ) : isImage ? (
            <img
              src={fileUrl}
              alt={paper.title}
              className="preview-image"
            />
          ) : (
            <div className="empty-state">
              Preview not available.
            </div>
          )}

        </div>

        {/* Footer */}

        <div className="preview-footer">

          <button
            onClick={handleDownload}
            className="download-btn"
          >
            <Download size={18} />
            Download
          </button>

          <a
            href={fileUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="preview-btn"
          >
            <ExternalLink size={18} />
            Open in New Tab
          </a>

          <button
            className="button subtle"
            onClick={onClose}
          >
            Close
          </button>

        </div>
      </div>
    </div>
  );
}