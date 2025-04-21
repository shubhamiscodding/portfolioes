import React from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import { ArrowLeft } from "lucide-react"; // Import icon

const Resume = () => {
  const navigate = useNavigate(); // Hook for navigation

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white p-4 sm:p-6 w-full">
      {/* Back Button */}
      <button
        onClick={() => navigate("/")}
        className="absolute top-4 sm:top-6 left-4 sm:left-6 flex items-center bg-gray-800 hover:bg-gray-700 px-3 sm:px-4 py-2 rounded-lg transition duration-300"
      >
        <ArrowLeft className="w-4 sm:w-5 h-4 sm:h-5 mr-2" />
        Back to Portfolio
      </button>

      {/* Resume Heading */}
      <h1 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6">My Resume</h1>

      {/* Resume PDF Embed */}
      <img
        src="https://res.cloudinary.com/dqhn4dq02/image/upload/v1740114838/in3byxp5pcwlingjsuby.jpg"
        className="max-w-full sm:max-w-4xl h-auto sm:h-[800px] border rounded-lg shadow-lg"
        title="Resume"
      ></img>

      {/* Download Button */}
      <a
        href="https://drive.google.com/file/d/1oklhsTdUrqervNohScwVhvXMESaEZn81/view"
        download="https://drive.google.com/file/d/1oklhsTdUrqervNohScwVhvXMESaEZn81/view"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 sm:mt-6 bg-green-600 hover:bg-green-700 text-white px-4 sm:px-6 py-2 sm:py-3 rounded-lg transition duration-300"
      >
        Download Resume
      </a>
    </div>
  );
};

export default Resume;
