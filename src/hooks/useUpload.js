export default function useUpload(navigate) {
  const submitJob = async (file, options) => {
    if (!file) {
      alert("Please select a video file first!");
      return;
    }
    const token = localStorage.getItem("token");

    const formData = new FormData();
    formData.append("video", file);
    formData.append("language", options.language);
    formData.append("skip_silence", options.skipSilence);

    // console.log("Uploading to backend...");


    // API call later
    const url = await fetch("http://localhost:3000/file/upload", {
      method: "POST",
      body: formData,
      headers : {
        "Authorization": `Bearer ${token}`
      }
    });

    const data = await url.json();
    console.log(data);
    navigate("/generating");
  };

  return submitJob;
}
