const Loading = ({ text = "Loading..." }) => {
  return (
    <div className="flex items-center justify-center min-h-screen">
      <div className="flex flex-col items-center space-y-4">
        {/* Spinner */}
        <div className="w-16 h-16 border-4 border-gradient-to-r from-blue-500 to-purple-600 border-t-transparent border-solid rounded-full animate-spin"></div>
        {/* Text */}
        <p className="text-gray-700 text-xl font-semibold bg-gradient-to-r from-blue-600 to-purple-600 bg-clip-text text-transparent">{text}</p>
      </div>
    </div>
  );
};

export default Loading;
