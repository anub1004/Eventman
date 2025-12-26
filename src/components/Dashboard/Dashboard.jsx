import { useEffect, useState } from "react";
import { useAuth } from "../../context/AuthContext";
import { eventAPI } from "../../services/api";
import Loading from "../Common/Loading";
import ErrorMessage from "../Common/ErrorMessage";
import { Link } from "react-router-dom";

const Dashboard = () => {
  const { user } = useAuth();
  const [events, setEvents] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const res = await eventAPI.getMyEvents();
        setEvents(res?.data?.data || []);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load events");
      } finally {
        setLoading(false);
      }
    };

    fetchEvents();
  }, []);

  if (loading) return <Loading />;
  if (error) return <ErrorMessage message={error} />;

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">
        Welcome, {user?.name || "User"}
      </h1>

      {events.length === 0 ? (
        <p className="text-gray-500">
          No events created yet.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {events.map((event) => (
            <div
              key={event._id}
              className="border rounded p-4 shadow-sm"
            >
              <h2 className="text-lg font-semibold">
                {event.title}
              </h2>
              <p className="text-sm text-gray-600">
                {event.description}
              </p>

              <Link
                to={`/events/${event._id}`}
                className="text-blue-600 text-sm mt-2 inline-block"
              >
                View Details →
              </Link>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default Dashboard;

