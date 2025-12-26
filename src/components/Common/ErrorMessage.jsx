import { useState } from 'react';

const ErrorMessage = ({ message }) => {
  const [visible, setVisible] = useState(true);

  if (!message || !visible) return null;

  return (
    <div className="bg-gradient-to-r from-red-50 to-red-100 border-2 border-red-200 text-red-800 px-6 py-4 rounded-2xl relative shadow-lg" role="alert">
      <span className="block sm:inline font-medium">{message}</span>
      <button
        type="button"
        onClick={() => setVisible(false)}
        className="absolute top-2 right-2 p-2 hover:bg-red-200 rounded-full transition-colors duration-200"
      >
        <svg
          className="fill-current h-5 w-5 text-red-600"
          role="button"
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 20 20"
        >
          <title>Close</title>
          <path d="M14.348 5.652a1 1 0 10-1.414-1.414L10 7.172 7.066 4.238a1 1 0 10-1.414 1.414L8.586 10l-2.934 2.934a1 1 0 101.414 1.414L10 12.828l2.934 2.934a1 1 0 001.414-1.414L11.414 10l2.934-2.934z" />
        </svg>
      </button>
    </div>
  );
};

export default ErrorMessage;
