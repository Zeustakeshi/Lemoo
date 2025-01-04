const Loading = () => {
  return (
    <div>
      <div className="flex items-center justify-center h-screen">
        <div className="relative">
          <div className="h-24 w-24 rounded-full border-t-8 border-b-8 border-dashed border-blue-200 animate-spin"></div>
          <div className="absolute top-0 left-0 h-24 w-24 rounded-full border-dashed border-t-8 border-b-8 border-blue-400 animate-spin">
            <h1 className="text-5xl">🤸</h1>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Loading;
