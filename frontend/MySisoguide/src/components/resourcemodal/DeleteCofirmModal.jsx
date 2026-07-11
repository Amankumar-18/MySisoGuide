import { AlertTriangle } from "lucide-react";


export default function DeleteConfirmModal({ isOpen,title="Delete Item",message="Are you sure you want to deletethis item?",onCancel,onConfirm,}) {

if(!isOpen) return null;

return(
    <div className="modal-overlay">
        <div className="delete-modal">
            <div className="delete-icon">
                <AlertTriangle size={40} />

            </div>
            <h2>{title}</h2>
            <p>{message}</p>
            <div className="delete-actions">
                <button className="button secondary" onClick={onCancel}>Cancel</button>
                <button className="button danger" onClick={onConfirm}>Delete</button>

                
            </div>

        </div>

    </div>
);


}
