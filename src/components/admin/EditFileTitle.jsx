// src/components/EditFileTitle.jsx
import React, { useState } from "react";

const EditFileTitle = () => {
  const [fileCode, setFileCode] = useState(""); // e.g. "abc123xyz"
  const [fileTitle, setFileTitle] = useState(""); // e.g. "The 100 S01E02"
  const [message, setMessage] = useState("");

  // Your API key (better move this to .env)
  const STREAMHG_API_KEY = "28808i3qemps5djx0krzg";

  const handleEdit = async (e) => {
    e.preventDefault();

    try {
      // Build API URL
      const url = `https://streamhgapi.com/api/file/edit?key=${STREAMHG_API_KEY}&file_code=${fileCode}&file_title=${encodeURIComponent(fileTitle)}`;

      const response = await fetch(url);
      const data = await response.json();

      if (data.status === "success") {
        setMessage("✅ File title updated successfully!");
      } else {
        setMessage("❌ Error: " + (data.msg || "Something went wrong"));
      }
    } catch (error) {
      console.error("Error updating file title:", error);
      setMessage("⚠️ Failed to update file title.");
    }
  };

  return (
    <div className="p-4 max-w-md mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold mb-4">Edit File Title</h2>

      <form onSubmit={handleEdit} className="flex flex-col gap-3">
        <input
          type="text"
          placeholder="Enter File Code"
          value={fileCode}
          onChange={(e) => setFileCode(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600"
          required
        />
        <input
          type="text"
          placeholder="Enter New File Title"
          value={fileTitle}
          onChange={(e) => setFileTitle(e.target.value)}
          className="p-2 rounded bg-gray-800 border border-gray-600"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-semibold"
        >
          Update Title
        </button>
      </form>

      {message && <p className="mt-4">{message}</p>}
    </div>
  );
};

export default EditFileTitle;




// import React, { useState } from "react";

// const EditFileTitle = () => {
//   const [fileCode, setFileCode] = useState("");
//   const [baseTitle, setBaseTitle] = useState(""); // e.g., "The 100"
//   const [episode, setEpisode] = useState(""); // e.g., "S01E02"
//   const [transirator, setTransirator] = useState(""); // e.g., "John Doe"
//   const [message, setMessage] = useState("");

//   const STREAMHG_API_KEY = "28808i3qemps5djx0krzg";

//   const handleEdit = async (e) => {
//     e.preventDefault();

//     // Combine base title + episode for StreamHG
//     const fullTitle = `${baseTitle}${episode ? " " + episode : ""}`;

//     try {
//       // --- Update title on StreamHG ---
//       const url = `https://streamhgapi.com/api/file/edit?key=${STREAMHG_API_KEY}&file_code=${fileCode}&file_title=${encodeURIComponent(fullTitle)}`;
//       const response = await fetch(url);
//       const data = await response.json();

//       if (data.status !== "success") {
//         setMessage("❌ Error updating StreamHG: " + (data.msg || "Unknown error"));
//         return;
//       }

//       // --- Insert title into MongoDB ---
//       const serverRes = await fetch("http://localhost:3000/titles", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ baseTitle, episode, transirator }),
//       });

//       const serverData = await serverRes.json();

//       if (serverRes.ok) {
//         setMessage(`✅ Updated StreamHG and saved to DB: "${fullTitle}"`);
//       } else {
//         setMessage("⚠️ DB Error: " + (serverData.message || "Unknown error"));
//       }
//     } catch (error) {
//       console.error(error);
//       setMessage("⚠️ Failed to update StreamHG or DB.");
//     }
//   };

//   return (
//     <div className="p-4 max-w-md mx-auto bg-gray-900 text-white rounded-lg shadow-lg">
//       <h2 className="text-xl font-bold mb-4">Edit File Title</h2>

//       <form onSubmit={handleEdit} className="flex flex-col gap-3">
//         <input
//           type="text"
//           placeholder="Enter File Code"
//           value={fileCode}
//           onChange={(e) => setFileCode(e.target.value)}
//           className="p-2 rounded bg-gray-800 border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Movie Name (base title)"
//           value={baseTitle}
//           onChange={(e) => setBaseTitle(e.target.value)}
//           className="p-2 rounded bg-gray-800 border border-gray-600"
//           required
//         />
//         <input
//           type="text"
//           placeholder="Episode / Extra Info (optional)"
//           value={episode}
//           onChange={(e) => setEpisode(e.target.value)}
//           className="p-2 rounded bg-gray-800 border border-gray-600"
//         />
//         <input
//           type="text"
//           placeholder="Transirator Name"
//           value={transirator}
//           onChange={(e) => setTransirator(e.target.value)}
//           className="p-2 rounded bg-gray-800 border border-gray-600"
//           required
//         />

//         <button
//           type="submit"
//           className="bg-blue-600 hover:bg-blue-700 p-2 rounded-lg font-semibold"
//         >
//           Update Title
//         </button>
//       </form>

//       {message && <p className="mt-4">{message}</p>}
//     </div>
//   );
// };

// export default EditFileTitle;
