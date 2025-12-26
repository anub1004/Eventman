import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { eventAPI } from '../../services/api';
import ErrorMessage from '../Common/ErrorMessage';

const CreateEvent = () => {
  const navigate = useNavigate();
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateOptions: [{ date: '', time: '' }],
    pollQuestion: '',
    pollOptions: ['', ''],
  });

  const addDateOption = () => {
    setFormData({
      ...formData,
      dateOptions: [...formData.dateOptions, { date: '', time: '' }],
    });
  };

  const removeDateOption = (index) => {
    if (formData.dateOptions.length > 1) {
      setFormData({
        ...formData,
        dateOptions: formData.dateOptions.filter((_, i) => i !== index),
      });
    }
  };

  const updateDateOption = (index, field, value) => {
    const updated = [...formData.dateOptions];
    updated[index][field] = value;
    setFormData({ ...formData, dateOptions: updated });
  };

  const addPollOption = () => {
    setFormData({
      ...formData,
      pollOptions: [...formData.pollOptions, ''],
    });
  };

  const removePollOption = (index) => {
    if (formData.pollOptions.length > 2) {
      setFormData({
        ...formData,
        pollOptions: formData.pollOptions.filter((_, i) => i !== index),
      });
    }
  };

  const updatePollOption = (index, value) => {
    const updated = [...formData.pollOptions];
    updated[index] = value;
    setFormData({ ...formData, pollOptions: updated });
  };
const handleSubmit = async (e) => {
  e.preventDefault();
  setError('');
  setLoading(true);

  try {
    await eventAPI.create(formData); // POST /events/add
    navigate('/dashboard');
  } catch (err) {
    setError(err.response?.data?.message || 'Failed to create event');
  } finally {
    setLoading(false);
  }
};


  return (
    <div className="space-y-8">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-10">
        <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-8">
          Create New Event
        </h1>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Event Title *
            </label>
            <input
              type="text"
              required
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              placeholder="Enter event title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Description *
            </label>
            <textarea
              rows={4}
              required
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm resize-none"
              placeholder="Describe your event"
            />
          </div>

          {/* Date Options */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Date Options *
            </label>

            <div className="space-y-4">
              {formData.dateOptions.map((option, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <input
                    type="date"
                    required
                    value={option.date}
                    onChange={(e) =>
                      updateDateOption(index, 'date', e.target.value)
                    }
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                  <input
                    type="time"
                    required
                    value={option.time}
                    onChange={(e) =>
                      updateDateOption(index, 'time', e.target.value)
                    }
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                  {formData.dateOptions.length > 1 && (
                    <button
                      type="button"
                      onClick={() => removeDateOption(index)}
                      className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addDateOption}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
              + Add Date Option
            </button>
          </div>

          {/* Poll Question */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Poll Question *
            </label>
            <input
              type="text"
              required
              value={formData.pollQuestion}
              onChange={(e) =>
                setFormData({ ...formData, pollQuestion: e.target.value })
              }
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
              placeholder="Which option works best?"
            />
          </div>

          {/* Poll Options */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-4">
              Poll Options *
            </label>

            <div className="space-y-4">
              {formData.pollOptions.map((option, index) => (
                <div key={index} className="flex gap-4 items-center">
                  <input
                    type="text"
                    required
                    value={option}
                    onChange={(e) =>
                      updatePollOption(index, e.target.value)
                    }
                    placeholder={`Option ${index + 1}`}
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/50 backdrop-blur-sm"
                  />
                  {formData.pollOptions.length > 2 && (
                    <button
                      type="button"
                      onClick={() => removePollOption(index)}
                      className="px-4 py-3 bg-red-500 text-white rounded-xl hover:bg-red-600 transition-colors duration-200 font-medium"
                    >
                      Remove
                    </button>
                  )}
                </div>
              ))}
            </div>

            <button
              type="button"
              onClick={addPollOption}
              className="mt-4 px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-xl font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 hover:scale-105 shadow-md"
            >
              + Add Poll Option
            </button>
          </div>

          {/* Actions */}
          <div className="flex justify-end gap-6 pt-6">
            <button
              type="button"
              onClick={() => navigate('/dashboard')}
              className="px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>

            <button
              type="submit"
              disabled={loading}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105"
            >
              {loading ? 'Creating...' : 'Create Event'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateEvent;
