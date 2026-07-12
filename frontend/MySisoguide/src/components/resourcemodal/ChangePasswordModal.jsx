import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { X, Key, Save } from "lucide-react";
import { getAccessToken, clearTokens } from "../../utils/auth";

export default function ChangePasswordModal({
  isOpen,
  onClose,
  
}) {
 const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const token = getAccessToken();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    old_password: "",
    new_password: "",
    confirm_password: "",
  });

  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setMessage("");

    if (form.new_password !== form.confirm_password) {
      setMessage("New passwords do not match.");
      return;
    }

    try {
      setLoading(true);

      const response = await fetch(
        `${BASEURL}/api/auth/change-password/`,
        {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            old_password: form.old_password,
            new_password: form.new_password,
          }),
        }
      );

      const data = await response.json();

      if (response.ok) {
        setMessage("Password updated successfully.");

setTimeout(() => {
  clearTokens();
  onClose();
  navigate("/login", { replace: true });
}, 1000);
      } else {
        setMessage(data.detail || "Unable to update password.");
      }
    } catch (err) {
      console.log(err);
      setMessage("Something went wrong.");
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
  if (isOpen) {
    setForm({
      old_password: "",
      new_password: "",
      confirm_password: "",
    });
    setMessage("");
  }
}, [isOpen]);
if (!isOpen) return null;

  return (
    <div className="modal-overlay">

      <div className="modal">

        <div className="modal-header">

          <h2>
        <Key size={24} />
        Change Password
      </h2>

          <button onClick={onClose}>
            <X />
          </button>

        </div>

        <form
        className="form"
        onSubmit={handleSubmit}
      >

        <label>
          Current Password

          <input
            type="password"
            className="input"
            name="old_password"
            value={form.old_password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          New Password

          <input
            type="password"
            className="input"
            name="new_password"
            value={form.new_password}
            onChange={handleChange}
            required
          />
        </label>

        <label>
          Confirm New Password

          <input
            type="password"
            className="input"
            name="confirm_password"
            value={form.confirm_password}
            onChange={handleChange}
            required
          />
        </label>

        <button
          className="button primary"
          type="submit"
          disabled={loading}
        >
          <Save size={18} />

          {loading
            ? "Updating..."
            : "Update Password"}
        </button>

      </form>

      {message && (
        <p
          className="muted"
          style={{ marginTop: "15px" }}
        >
          {message}
        </p>
      )}


      </div>

    </div>
  );
}