import { useEffect, useState } from "react";
import {
  Activity,
  BookOpen,
  FileText,
  GraduationCap,
  LogIn,
  LogOut,
  Trash2,
  Edit,
} from "lucide-react";
import {authFetch} from "../../utils/auth";
import { getAccessToken } from "../../utils/auth";

export default function ActivityTab() {
  const BASEURL = import.meta.env.VITE_DJANGO_BASE_URL;

  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const token=getAccessToken();
  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    try {
      const res = await fetch(`${BASEURL}/api/activities/`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (!res.ok) {
        throw new Error("Unable to fetch activities");
        
      }

      const data = await res.json();

      setActivities(data);
    } catch (err) {
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  const getIcon = (action) => {
    switch (action) {
      case "CREATED":
        return <BookOpen size={18} />;

      case "UPDATED":
        return <Edit size={18} />;

      case "DELETED":
        return <Trash2 size={18} />;

      case "LOGIN":
        return <LogIn size={18} />;

      case "LOGOUT":
        return <LogOut size={18} />;

      default:
        return <Activity size={18} />;
    }
  };

  if (loading) {
    return <h3>Loading Activities...</h3>;
  }

  return (
    <>
      <div className="control-title">
        <h2>Recent Activity</h2>

        <p className="muted">
          Every action performed by admins and users.
        </p>
      </div>

      <div className="stack">

        {activities.length === 0 ? (
          <div className="empty-state">
            No activity available.
          </div>
        ) : (

          activities.map((activity) => (

            <article
              key={activity.id}
              className="activity-card"
            >
              <span className="activity-icon">
                {getIcon(activity.action)}
              </span>

              <div className="activity-content">

                <h4>
                  {activity.user_name}
                </h4>

                <p>
                  {activity.action}{" "}
                  <strong>{activity.target}</strong>
                </p>

                <small className="muted">
                  {activity.user_email}
                </small>

                <br />

                <small className="muted">
                  {new Date(
                    activity.created_at
                  ).toLocaleString()}
                </small>

              </div>

            </article>

          ))

        )}

      </div>
    </>
  );
}