export default function useUpload(navigate) {
  const submitJob = async (fileOrLink, options) => {
    if (!fileOrLink) {
      alert("Please select a video file or paste a link first!");
      return;
    }

    const token = localStorage.getItem("token");
    const formData = new FormData();

    // --- CHECK TYPE HERE ---
    if (typeof fileOrLink === "string") {
      // It's a link (e.g., YouTube/Drive URL)
      formData.append("videoUrl", fileOrLink); 
    } else {
      // It's a physical file from the browser
      formData.append("video", fileOrLink);
    }

    // Append standard options
    formData.append("language", options.language);
    formData.append("detailLevel", options.detailLevel); // Matches your OptionsSection
    formData.append("skipSongs", options.skipSongs);
    formData.append("skipDialogues", options.skipDialogues);

    try {
      const res = await fetch("http://localhost:3000/file/upload", {
        method: "POST",
        body: formData,
        headers: {
          "Authorization": `Bearer ${token}`
          // Reminder: Don't set Content-Type header manually for FormData
        }
      });

      if (res.ok) {
        navigate("/generating");
      } else {
        const err = await res.json();
        alert(`Error: ${err.message || "Upload failed"}`);
      }
    } catch (error) {
      console.error("Connection error:", error);
    }
  };

  return submitJob;
}