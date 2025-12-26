import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { eventAPI } from '../../services/api';
import ErrorMessage from '../Common/ErrorMessage';
import Loading from '../Common/Loading';

const EditEvent = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [error, setError] = useState('');
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    dateOptions: [{ date: '', time: '' }],
    pollQuestion: '',
    pollOptions: ['', ''],
  });

  // Fetch existing event data
  const fetchEvent = async () => {
    try {
      const res = await eventAPI.getById(id);
      const event = res.data.data;

      setFormData({
        title: event.title,
        description: event.description,
        dateOptions: event.dateOptions.length
          ? event.dateOptions
          : [{ date: '', time: '' }],
        pollQuestion: event.pollQuestion || '',
        pollOptions: event.pollOptions.length
          ? event.pollOptions
          : ['', ''],
      });
    } catch (err) {
      setError('Failed to load event data');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchEvent();
  }, [id]);

  // Date options
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

  // Poll options
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

  // Submit form
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSaving(true);

    try {
      await eventAPI.update(id, formData);
      navigate(`/events/${id}`);
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to update event');
    } finally {
      setSaving(false);
    }
  };

  if (loading) return <Loading />;

  return (
    <div className="space-y-8">
      <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-10">
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-purple-600 rounded-2xl mb-4 shadow-lg">
            <span className="text-2xl">✏️</span>
          </div>
          <h1 className="text-4xl font-bold bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-transparent mb-2">
            Edit Event
          </h1>
          <p className="text-gray-600">Update your event details and poll options</p>
        </div>

        {error && <ErrorMessage message={error} />}

        <form onSubmit={handleSubmit} className="space-y-8">
          {/* Event Title */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Event Title *
            </label>
            <input
              type="text"
              value={formData.title}
              onChange={(e) =>
                setFormData({ ...formData, title: e.target.value })
              }
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm placeholder-gray-400"
              placeholder="Enter event title"
            />
          </div>

          {/* Description */}
          <div>
            <label className="block text-sm font-semibold text-gray-700 mb-3">
              Description *
            </label>
            <textarea
              value={formData.description}
              onChange={(e) =>
                setFormData({ ...formData, description: e.target.value })
              }
              rows={4}
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm resize-none placeholder-gray-400"
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
                    value={option.date}
                    onChange={(e) => updateDateOption(index, 'date', e.target.value)}
                    required
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
                  />
                  <input
                    type="time"
                    value={option.time}
                    onChange={(e) => updateDateOption(index, 'time', e.target.value)}
                    required
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm"
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
              value={formData.pollQuestion}
              onChange={(e) =>
                setFormData({ ...formData, pollQuestion: e.target.value })
              }
              placeholder="e.g., Which date works best for you?"
              required
              className="w-full px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm placeholder-gray-400"
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
                    value={option}
                    onChange={(e) => updatePollOption(index, e.target.value)}
                    placeholder={`Option ${index + 1}`}
                    required
                    className="flex-1 px-4 py-3 border-2 border-gray-200 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 bg-white/70 backdrop-blur-sm placeholder-gray-400"
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
              onClick={() => navigate(`/events/${id}`)}
              className="px-8 py-3 rounded-xl border-2 border-gray-300 text-gray-700 hover:bg-gray-50 transition-all duration-200 font-semibold"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={saving}
              className="px-8 py-3 rounded-xl bg-gradient-to-r from-blue-500 to-purple-600 text-white font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed shadow-lg hover:shadow-xl hover:scale-105 relative overflow-hidden group"
            >
              <span className="relative z-10">
                {saving ? (
                  <div className="flex items-center justify-center">
                    <div className="w-5 h-5 border-2 border-white border-t-transparent rounded-full animate-spin mr-2"></div>
                    Saving...
                  </div>
                ) : (
                  '💾 Save Changes'
                )}
              </span>
              <div className="absolute inset-0 bg-gradient-to-r from-blue-600 to-purple-700 opacity-0 group-hover:opacity-100 transition-opacity duration-200"></div>
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditEvent;
