import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { eventAPI } from "../../services/api";

const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    eventAPI
      .getMyEvents()
      .then((res) => setEvents(res?.data?.data || []))
      .catch(() => setEvents([]))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <p className="p-6">Loading...</p>;

  return (
    <div className="p-6">
      <h1 className="text-xl font-bold mb-4">
        Welcome {user?.name || "User"}
      </h1>

      {(events || []).length === 0 ? (
        <p>No events found.</p>
      ) : (
        events.map((e) => (
          <div key={e._id} className="border p-4 mb-2">
            {e.title}
          </div>
        ))
      )}
    </div>
  );
};

export default Dashboard;
