import { useEffect, useState } from "react";
import { Shield, ShieldCheck, Search } from "lucide-react";
import { getAccessToken } from "../../utils/auth";

export default function AdminsTab() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const token = getAccessToken();

  const [admins, setAdmins] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchAdmins();
  }, []);

  const fetchAdmins = async () => {
    try {
      const response = await fetch(`${BASEURL}/api/auth/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      const onlyAdmins = data.filter(
        (user) =>
          user.role === "ADMIN" || user.role === "SUPERADMIN"
      );

      setAdmins(onlyAdmins);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const removeAdmin = async (id) => {
    try {
      await fetch(
        `${BASEURL}/api/auth/users/${id}/remove-admin/`,
        {
          method: "PATCH",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchAdmins();
    } catch (err) {
      console.log(err);
    }
  };

  const filteredAdmins = admins.filter((admin) =>
    `${admin.username} ${admin.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <h3>Loading admins...</h3>;
  }

  return (
    <>
      <div className="toolbar">

        <h2>Admins ({filteredAdmins.length})</h2>

        <div className="search-box">
          <Search size={18} />

          <input
            className="input"
            placeholder="Search admin..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

      </div>

      <div className="stack">

        {filteredAdmins.map((admin) => (

          <article
            key={admin.id}
            className="admin-card"
          >

            <div className="admin-card-row">

              <span className="avatar">
                {admin.username.charAt(0).toUpperCase()}
              </span>

              <div>

                <h3>
                  {admin.first_name} {admin.last_name}
                </h3>

                <p className="muted">
                  {admin.email}
                </p>

                <p className="muted">
                  @{admin.username}
                </p>

              </div>

            </div>

            <div className="actions">

              <span
                className={`badge ${
                  admin.role === "SUPERADMIN"
                    ? "gold"
                    : "blue"
                }`}
              >
                {admin.role}
              </span>

              {admin.role === "ADMIN" && (
                <button
                  className="button subtle"
                  onClick={() => removeAdmin(admin.id)}
                >
                  <Shield size={15} />
                  Remove Admin
                </button>
              )}

              {admin.role === "SUPERADMIN" && (
                <button
                  className="button gold"
                  disabled
                >
                  <ShieldCheck size={15} />
                  Super Admin
                </button>
              )}

            </div>

          </article>

        ))}

      </div>
    </>
  );
}