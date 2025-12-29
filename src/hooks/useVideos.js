import { useEffect, useState } from "react";

export default function useVideos() {
  const [videos, setVideos] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const fetchVideos = async () => {
      try {
        const res = await fetch("http://localhost:3000/api/videos", {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${token}`
          }
        });
        if (res.ok) { 
          setVideos(await res.json());
        }
      } catch {
        console.log("Backend not connected yet");
      }
    };

    fetchVideos();
    const interval = setInterval(fetchVideos, 5000);
    return () => clearInterval(interval);
  }, []);

  return videos;
}
