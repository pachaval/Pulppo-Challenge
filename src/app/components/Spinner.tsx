const Spinner: React.FC = () => (
  <div className="text-center mt-5">
    <div className="w-[50px] h-[50px] border-4 border-gray-200 border-t-blue-500 rounded-full animate-spin" />
    <style>
      {`
        @keyframes spin {
          0% { transform: rotate(0deg); }
          100% { transform: rotate(360deg); }
        }
      `}
    </style>
  </div>
);

export default Spinner;
