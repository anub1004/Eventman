import { useState, useEffect } from 'react';
import { pollAPI } from '../../services/api';
import Loading from '../Common/Loading';

const PollResults = ({ pollId }) => {
  const [results, setResults] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchResults = async () => {
    try {
      const response = await pollAPI.getResults(pollId);
      setResults(response.data.data);
    } catch (err) {
      console.error('Failed to fetch results', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchResults();
    const interval = setInterval(fetchResults, 5000); // refresh every 5s
    return () => clearInterval(interval);
  }, [pollId]);

  if (loading) return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
      <div className="flex items-center justify-center py-8">
        <div className="w-8 h-8 border-4 border-blue-600 border-t-transparent border-solid rounded-full animate-spin"></div>
      </div>
    </div>
  );

  if (!results) return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
      <div className="text-center py-8">
        <div className="text-4xl mb-4">📊</div>
        <p className="text-gray-500 font-medium">No results available</p>
        <p className="text-gray-400 text-sm">Results will appear here once voting begins</p>
      </div>
    </div>
  );

  const maxVotes = Math.max(...results.results.map(r => r.voteCount), 1);

  return (
    <div className="bg-white/70 backdrop-blur-sm rounded-2xl shadow-xl border border-white/20 p-8">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-2xl font-bold text-gray-800">{results.question}</h3>
        <div className="bg-gradient-to-r from-blue-100 to-purple-100 px-4 py-2 rounded-full">
          <span className="text-sm font-semibold text-gray-700">
            📊 {results.totalVotes} Total Votes
          </span>
        </div>
      </div>

      <div className="space-y-6">
        {results.results.map((option, index) => {
          const percentage =
            results.totalVotes > 0
              ? ((option.voteCount / results.totalVotes) * 100).toFixed(1)
              : 0;
          return (
            <div key={index} className="space-y-3">
              <div className="flex justify-between items-center">
                <span className="text-lg font-medium text-gray-800">{option.text}</span>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-600">
                    {option.voteCount} votes
                  </span>
                  <span className="text-sm font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                    {percentage}%
                  </span>
                </div>
              </div>
              <div className="relative">
                <div className="w-full bg-gray-200 h-4 rounded-full overflow-hidden">
                  <div
                    className="bg-gradient-to-r from-blue-500 to-purple-600 h-4 rounded-full transition-all duration-500 ease-out"
                    style={{ width: `${percentage}%` }}
                  ></div>
                </div>
              </div>
              {option.voters.length > 0 && (
                <div className="bg-gray-50 rounded-xl p-3">
                  <p className="text-xs text-gray-500 mb-2">Voted by:</p>
                  <div className="flex flex-wrap gap-2">
                    {option.voters.map((voter, idx) => (
                      <span
                        key={idx}
                        className="inline-flex items-center px-2 py-1 bg-white rounded-full text-xs font-medium text-gray-600 border"
                      >
                        {voter.name}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 pt-6 border-t border-gray-200">
        <button
          onClick={fetchResults}
          className="w-full bg-gradient-to-r from-gray-500 to-gray-600 text-white py-3 rounded-xl font-semibold hover:from-gray-600 hover:to-gray-700 transition-all duration-200 hover:scale-105 shadow-md"
        >
          🔄 Refresh Results
        </button>
        <p className="text-center text-xs text-gray-500 mt-2">
          Auto-refreshes every 5 seconds
        </p>
      </div>
    </div>
  );
};

export default PollResults;
