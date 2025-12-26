import { Link } from 'react-router-dom';

const EventCard = ({ event, isCreator = false }) => {
  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
    });
  };

  return (
    <div className="bg-white/80 backdrop-blur-sm rounded-2xl shadow-xl hover:shadow-2xl transition-all duration-300 p-6 flex flex-col justify-between border border-white/20 hover:scale-105 hover:-translate-y-1">
      
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <span
          className={`text-xs font-semibold px-3 py-1 rounded-full ${
            event.status === 'active'
              ? 'bg-gradient-to-r from-green-400 to-green-500 text-white'
              : 'bg-gradient-to-r from-gray-400 to-gray-500 text-white'
          }`}
        >
          {event.status}
        </span>

        {isCreator && (
          <span className="text-xs font-semibold px-3 py-1 rounded-full bg-gradient-to-r from-blue-400 to-blue-500 text-white">
            Creator
          </span>
        )}
      </div>

      {/* Content */}
      <div className="mb-6">
        <h3 className="text-xl font-bold text-gray-800 mb-2">
          {event.title}
        </h3>
        <p className="text-sm text-gray-600 line-clamp-2">
          {event.description}
        </p>
      </div>

      {/* Meta Info */}
      <div className="text-sm text-gray-600 space-y-2 mb-6">
        <p className="flex items-center"><span className="mr-2">📅</span> Date Options: {event.dateOptions?.length || 0}</p>
        <p className="flex items-center"><span className="mr-2">👥</span> Participants: {event.participants?.length || 0}</p>
        {event.createdAt && (
          <p className="flex items-center"><span className="mr-2">🕒</span> Created: {formatDate(event.createdAt)}</p>
        )}
      </div>

      {/* Action */}
      <Link
        to={`/events/${event._id}`}
        className="mt-auto text-center bg-gradient-to-r from-blue-500 to-purple-600 text-white py-3 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 shadow-md hover:shadow-lg"
      >
        View Details
      </Link>
    </div>
  );
};

export default EventCard;
