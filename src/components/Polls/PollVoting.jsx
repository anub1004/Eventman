import { useState } from 'react';
import { pollAPI } from '../../services/api';

const PollVoting = ({ poll, onVote }) => {
  const [selectedOption, setSelectedOption] = useState(null);
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleVote = async () => {
    if (selectedOption === null) {
      setMessage('Please select an option');
      return;
    }

    setLoading(true);
    setMessage('');

    try {
      await pollAPI.vote(poll._id, selectedOption);
      setMessage('Vote submitted successfully!');
      setSelectedOption(null);
      setTimeout(() => {
        setMessage('');
        onVote(); // callback to refresh results or poll
      }, 1500);
    } catch (err) {
      setMessage(err.response?.data?.message || 'Failed to submit vote');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
      <h3 className="text-2xl font-bold text-gray-800 mb-6">{poll.question}</h3>

      {message && (
        <div className={`mb-6 p-4 rounded-xl ${
          message.includes('success')
            ? 'bg-green-50 border border-green-200 text-green-800'
            : 'bg-red-50 border border-red-200 text-red-800'
        }`}>
          <p className="font-medium">{message}</p>
        </div>
      )}

      <div className="space-y-4 mb-8">
        {poll.options.map((option, index) => (
          <label
            key={index}
            className={`flex items-center gap-4 p-4 border-2 rounded-xl cursor-pointer transition-all duration-200 hover:shadow-md ${
              selectedOption === index
                ? 'bg-gradient-to-r from-blue-50 to-purple-50 border-blue-400 shadow-lg'
                : 'border-gray-200 bg-white/50 hover:bg-gray-50'
            }`}
          >
            <input
              type="radio"
              name="poll"
              checked={selectedOption === index}
              onChange={() => setSelectedOption(index)}
              className="w-5 h-5 text-blue-600 focus:ring-blue-500"
            />
            <div className="flex items-center gap-3">
              <div className={`w-4 h-4 rounded-full ${
                selectedOption === index
                  ? 'bg-gradient-to-r from-blue-500 to-purple-600'
                  : 'bg-gray-300'
              }`}></div>
              <span className={`text-lg font-medium ${
                selectedOption === index ? 'text-gray-800' : 'text-gray-700'
              }`}>
                {option.text}
              </span>
            </div>
          </label>
        ))}
      </div>

      <button
        onClick={handleVote}
        disabled={loading || selectedOption === null}
        className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-4 rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 relative overflow-hidden group"
      >
        <span className="relative z-10">
          {loading ? (
            <div className="flex items-center justify-center">
              <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
              Submitting Vote...
            </div>
          ) : (
            '🗳️ Submit Vote'
          )}
        </span>
        <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
      </button>
    </div>
  );
};

export default PollVoting;
