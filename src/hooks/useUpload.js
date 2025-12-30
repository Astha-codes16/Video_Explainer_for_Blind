import axios from "axios";

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

    const resp = await fetch("http://localhost:3000/file/upload", {
      method: "POST",
      body: formData,
      headers : {
        "Authorization": `Bearer ${token}`
      }
    });
    
    const data = await resp.json();
    const url = data.video.videoUrl ;
    const attachment = {
      url
    }

    navigate("/generate");

    const reqStatus = await axios.post(
      "https://google-bot-7t88.onrender.com/process",
      attachment,
      {
        headers: {
          "Content-Type": "application/json"
        }
      }
    );

    let flag = true ;
    let transcript;
    const getUrl = reqStatus.data.id ;

    while(flag) {
      const getResponse = await axios.get(`https://google-bot-7t88.onrender.com/result/${getUrl}`) ;
      
      if(getResponse.data.status != "working") {
        transcript= getResponse.data.transcript ;
        flag = false ;
      }
      else {
        await new Promise(resolve => setTimeout(resolve, 1000));
      }
    }

    const updatedVideo = await axios.post("http://localhost:3000/file/update", {
      url,
      transcript
    }, {
      headers : {
        Authorization: `Bearer ${token}`,
        "Content-Type" : "application/json"
      }
    })

    navigate(`/app/${updatedVideo.data.video._id}`);
  };

  return submitJob;
}
