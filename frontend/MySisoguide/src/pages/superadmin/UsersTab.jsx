import { useEffect, useState } from "react";
import {
  ShieldCheck,
  Shield,
  User,
  UserX,
  Search,
  Trash2
} from "lucide-react";
import DeleteConfirmModal from "../../components/ResourceModal/DeleteConfirmModal";

import { getAccessToken } from "../../utils/auth";

export default function UsersTab() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const token = getAccessToken();

  const [users, setUsers] = useState([]);
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [deleteUserId,setDeleteUserId]=useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const response = await fetch(`${BASEURL}/api/auth/users/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await response.json();

      setUsers(data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  const makeAdmin = async (id) => {
    await fetch(`${BASEURL}/api/auth/users/${id}/make-admin/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchUsers();
  };

  const removeAdmin = async (id) => {
    await fetch(`${BASEURL}/api/auth/users/${id}/remove-admin/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchUsers();
  };


    const deleteUser = async () => {
   

    try {
      const res = await fetch(
        `${BASEURL}/api/auth/delete-user/${deleteUserId}/`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (res.ok) {
        await fetchUsers();
      }
      setDeleteUserId(null)
    } catch (err) {
      console.log(err);
    }
  };

  const activateUser = async (id) => {
    await fetch(`${BASEURL}/api/auth/users/${id}/activate/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchUsers();
  };

  const deactivateUser = async (id) => {
    await fetch(`${BASEURL}/api/auth/users/${id}/deactivate/`, {
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchUsers();
  };

  const filteredUsers = users.filter((user) =>
    `${user.username} ${user.email}`
      .toLowerCase()
      .includes(search.toLowerCase())
  );

  if (loading) {
    return <h3>Loading users...</h3>;
  }

  return (
    <>
      <div className="toolbar">
        <h2>Users ({filteredUsers.length})</h2>

        <div className="search-box">
          <Search size={18} />

          <input
            className="input"
            placeholder="Search user..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>
      </div>

      <div className="stack">

        {filteredUsers.map((user) => (

          <article
            key={user.id}
            className="admin-card"
          >

            <div className="admin-card-row">

              <span className="avatar">
                {user.username.charAt(0).toUpperCase()}
              </span>

              <div>

                <h3>
                  {user.first_name} {user.last_name}
                </h3>

                <p className="muted">
                  {user.email}
                </p>

                <p className="muted">
                  @{user.username}
                </p>

              </div>

            </div>

            <div className="actions">

              <button
                onClick={()=>setDeleteUserId(user.id)}
              >
                <Trash2 size={18} />
              </button>


              <span
                className={`badge ${
                  user.role === "SUPERADMIN"
                    ? "gold"
                    : user.role === "ADMIN"
                    ? "blue"
                    : "gray"
                }`}
              >
                {user.role}
              </span>

              {user.role === "USER" && (
                <button
                  className="button subtle"
                  onClick={() => makeAdmin(user.id)}
                >
                  <ShieldCheck size={15} />
                  Make Admin
                </button>
              )}

              {user.role === "ADMIN" && (
                <button
                  className="button subtle"
                  onClick={() => removeAdmin(user.id)}
                >
                  <Shield size={15} />
                  Remove Admin
                </button>
              )}

              {user.is_active ? (
                <button
                  className="button danger"
                  onClick={() => deactivateUser(user.id)}
                >
                  <UserX size={15} />
                  Deactivate
                </button>
              ) : (
                <button
                  className="button primary"
                  onClick={() => activateUser(user.id)}
                >
                  <User size={15} />
                  Activate
                </button>
              )}

            </div>

          </article>

        ))}

      </div>

      <DeleteConfirmModal
                isOpen={deleteUserId !== null}
                title="Delete User"
                message="This USer will be permanently deleted. This action cannot be undone."
                onCancel={()=>setDeleteUserId(null)}
                onConfirm={deleteUser}
              />
    </>
  );
}