import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventAPI } from '../../services/api';
import { useAuth } from '../../context/AuthContext';
import PollVoting from '../Polls/PollVoting';
import PollResults from '../Polls/PollResults';
import Loading from '../Common/Loading';

const EventDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { user } = useAuth();

  const [event, setEvent] = useState(null);
  const [loading, setLoading] = useState(true);
  const [inviteEmail, setInviteEmail] = useState('');
  const [inviteMessage, setInviteMessage] = useState('');
  const [showInvite, setShowInvite] = useState(false);

  // Fetch event from backend
  const fetchEvent = async () => {
    try {
      const res = await eventAPI.getById(id);
      setEvent(res.data.data);
    } catch (err) {
      console.error('Failed to fetch event', err);
      setEvent(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  const handleDelete = async () => {
    if (!window.confirm('Are you sure you want to delete this event?')) return;
    try {
      await eventAPI.delete(id);
      navigate('/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Failed to delete event');
    }
  };

  const handleInvite = async (e) => {
    e.preventDefault();
    try {
      await eventAPI.invite(id, inviteEmail);
      setInviteMessage('Invitation sent successfully!');
      setInviteEmail('');
      setTimeout(() => setInviteMessage(''), 3000);
    } catch (err) {
      setInviteMessage(err.response?.data?.message || 'Failed to send invitation');
    }
  };

  if (loading) return <Loading />;

  if (!event) {
    return (
      <div className="text-center py-16">
        <div className="text-6xl mb-4">🔍</div>
        <h2 className="text-2xl font-bold text-gray-800 mb-2">Event Not Found</h2>
        <p className="text-gray-600 mb-6">The event you're looking for doesn't exist or has been removed.</p>
        <button
          onClick={() => navigate('/dashboard')}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg"
        >
          ← Back to Dashboard
        </button>
      </div>
    );
  }

  const isCreator = event.creator._id === user._id;

  const formatDate = (date) =>
    new Date(date).toLocaleDateString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
    });

  return (
    <div className="space-y-8">
      {/* Header */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-6">
          <div className="flex flex-col sm:flex-row sm:items-center gap-4">
            <span
              className={`inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold ${
                event.status === 'active'
                  ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
                  : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
              }`}
            >
              <span className="mr-2">{event.status === 'active' ? '🟢' : '⚪'}</span>
              {event.status}
            </span>
            {isCreator && (
              <span className="inline-flex items-center px-4 py-2 rounded-full text-sm font-semibold bg-gradient-to-r from-blue-400 to-blue-500 text-white">
                <span className="mr-2">👑</span>
                You're the creator
              </span>
            )}
          </div>

          <div className="flex gap-3">
            <button
              onClick={() => navigate('/dashboard')}
              className="px-6 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 font-semibold"
            >
              ← Back to Dashboard
            </button>
            {isCreator && (
              <>
                <button
                  onClick={() => navigate(`/events/${id}/edit`)}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  ✏️ Edit Event
                </button>
                <button
                  onClick={handleDelete}
                  className="px-6 py-3 rounded-xl bg-gradient-to-r from-red-500 to-red-600 text-white font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 hover:scale-105 shadow-lg"
                >
                  🗑️ Delete Event
                </button>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Event Info */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <h1 className="text-4xl font-bold mb-4">{event.title}</h1>
        <p className="text-gray-700 mb-6">{event.description}</p>

        {/* Creator Info */}
        <div className="bg-blue-50 rounded-xl p-6 border border-blue-100">
          <h2 className="text-xl font-bold mb-4 flex items-center">👤 Event Creator</h2>
          <p className="font-medium">{event.creator.name}</p>
          <p className="text-gray-600">{event.creator.email}</p>
        </div>
      </div>

      {/* Date Options */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">📅 Date Options</h2>
        <div className="grid gap-4">
          {event.dateOptions.map((option, idx) => (
            <div key={idx} className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <span className="text-gray-800 font-medium">{formatDate(option.date)} at {option.time}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Participants */}
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
        <h2 className="text-2xl font-bold mb-6 flex items-center">👥 Participants ({event.participants.length})</h2>
        <div className="grid gap-4">
          {event.participants.map(p => (
            <div key={p.user._id} className="bg-green-50 rounded-xl p-4 border border-green-100 flex items-center gap-3">
              <div className="w-10 h-10 bg-green-400 text-white rounded-full flex items-center justify-center font-bold">
                {p.user.name.charAt(0)}
              </div>
              <span>{p.user.name}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Invite Form */}
      {isCreator && (
        <div className="bg-white/70 rounded-2xl shadow-xl border border-white/20 p-8">
          <button
            onClick={() => setShowInvite(!showInvite)}
            className="w-full bg-blue-500 text-white py-4 rounded-xl mb-6"
          >
            {showInvite ? 'Hide Invite Form' : 'Invite Participants'}
          </button>
          {showInvite && (
            <form onSubmit={handleInvite} className="space-y-4">
              <input
                type="email"
                value={inviteEmail}
                onChange={(e) => setInviteEmail(e.target.value)}
                placeholder="Enter participant's email"
                required
                className="w-full p-3 border rounded-xl"
              />
              {inviteMessage && <p className={inviteMessage.includes('success') ? 'text-green-600' : 'text-red-600'}>{inviteMessage}</p>}
              <button type="submit" className="w-full bg-green-500 text-white py-3 rounded-xl">Send Invitation</button>
            </form>
          )}
        </div>
      )}

      {/* Poll */}
      {event.poll && (
        <>
          <div className="bg-white/70 rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold mb-6">📊 Event Poll</h2>
            <PollVoting event={event} />
          </div>
          <div className="bg-white/70 rounded-2xl shadow-xl border border-white/20 p-8">
            <h2 className="text-2xl font-bold mb-6">📈 Poll Results</h2>
            <PollResults event={event} />
          </div>
        </>
      )}
    </div>
  );
};

export default EventDetails;
