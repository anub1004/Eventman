import { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { eventAPI, authAPI } from '../../services/api';
import EventCard from './EventCard';
import InvitationList from './InvitationList';
import Loading from '../Common/Loading';
import Navbar from '../Layout/Navbar'; // import Navbar

const Dashboard = () => {
  const [events, setEvents] = useState({
    createdEvents: [],
    participatingEvents: [],
  });
  const [invitations, setInvitations] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [eventsRes, profileRes] = await Promise.all([
        eventAPI.getAll(),
        authAPI.getProfile(),
      ]);

      setEvents(eventsRes.data.data);

      const pendingInvitations =
        profileRes.data.data.invitations?.filter(
          (inv) => inv.status === 'pending'
        ) || [];

      setInvitations(pendingInvitations);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  if (loading) return <Loading />;

  return (
    <div className="w-full min-h-screen bg-gray-50">
      {/* Navbar */}
      <Navbar />

      <div className="max-w-7xl mx-auto px-6 py-8 space-y-8">
        {/* Header */}
        <div className="flex items-center justify-between">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
            Dashboard
          </h1>
          <Link
            to="/events/create"
            className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
          >
            + Create Event
          </Link>
        </div>

        {/* Invitations */}
        {invitations.length > 0 && (
          <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-2xl font-semibold mb-6 text-gray-800">
              Pending Invitations
            </h2>
            <InvitationList invitations={invitations} onAction={fetchData} />
          </div>
        )}

        {/* Created Events */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">My Events</h2>

          {events.createdEvents.length === 0 ? (
            <p className="text-gray-600 text-lg">
              You haven't created any events yet.{' '}
              <Link
                to="/events/create"
                className="text-blue-600 hover:text-blue-700 font-semibold hover:underline transition-colors"
              >
                Create one now!
              </Link>
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.createdEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>

        {/* Participating Events */}
        <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
          <h2 className="text-2xl font-semibold mb-6 text-gray-800">
            Participating Events
          </h2>

          {events.participatingEvents.length === 0 ? (
            <p className="text-gray-600 text-lg">
              You're not participating in any events yet.
            </p>
          ) : (
            <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-8">
              {events.participatingEvents.map((event) => (
                <EventCard key={event._id} event={event} />
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;

