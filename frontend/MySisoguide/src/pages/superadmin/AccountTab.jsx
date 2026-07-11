import { useState } from "react";
import { Key, Save } from "lucide-react";
import { getAccessToken, clearTokens } from "../../utils/auth";
import { useNavigate } from "react-router-dom";

export default function AccountTab() {
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

        clearTokens();

        setTimeout(() => {
          navigate("/login");
        }, 1500);
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

  return (
    <div className="auth-card">

      <h2>
        <Key size={24} />
        Change Password
      </h2>

      <p className="muted">
        Update your account password.
      </p>

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
  );
}