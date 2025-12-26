import { eventAPI } from '../../services/api';

const InvitationList = ({ invitations, onResponse }) => {
  const handleResponse = async (eventId, response) => {
    try {
      await eventAPI.respond(eventId, response);
      onResponse();
    } catch (err) {
      alert('Failed to respond to invitation');
    }
  };

  if (!invitations || invitations.length === 0) {
    return (
      <div className="text-center py-8">
        <div className="text-gray-400 text-4xl mb-2">📨</div>
        <p className="text-gray-500 font-medium">No pending invitations</p>
        <p className="text-gray-400 text-sm">You'll see invitations here when people invite you to events</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center gap-3">
        <div className="text-2xl">📨</div>
        <h2 className="text-2xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent">
          Pending Invitations
        </h2>
      </div>

      <div className="space-y-4">
        {invitations.map((inv) => (
          <div
            key={inv._id}
            className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-6 hover:shadow-2xl transition-all duration-300"
          >
            {/* Event Info */}
            <div className="mb-4">
              <h3 className="text-xl font-bold text-gray-800 mb-2">
                {inv.event?.title}
              </h3>
              <p className="text-gray-600 line-clamp-2">
                {inv.event?.description}
              </p>
            </div>

            {/* Event Meta */}
            <div className="flex items-center gap-4 text-sm text-gray-500 mb-6">
              <div className="flex items-center gap-1">
                <span>👤</span>
                <span>Created by {inv.event?.creator?.name}</span>
              </div>
              <div className="flex items-center gap-1">
                <span>📅</span>
                <span>{inv.event?.dateOptions?.length || 0} date options</span>
              </div>
            </div>

            {/* Actions */}
            <div className="flex gap-4">
              <button
                onClick={() =>
                  handleResponse(inv.event._id, 'accepted')
                }
                className="flex-1 bg-gradient-to-r from-green-500 to-green-600 text-white py-3 rounded-xl font-semibold hover:from-green-600 hover:to-green-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                ✅ Accept Invitation
              </button>

              <button
                onClick={() =>
                  handleResponse(inv.event._id, 'declined')
                }
                className="flex-1 bg-gradient-to-r from-red-500 to-red-600 text-white py-3 rounded-xl font-semibold hover:from-red-600 hover:to-red-700 transition-all duration-200 hover:scale-105 shadow-lg hover:shadow-xl"
              >
                ❌ Decline
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default InvitationList;
