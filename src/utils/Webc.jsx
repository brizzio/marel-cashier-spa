//https://itnext.io/accessing-the-webcam-with-javascript-and-react-33cbe92f49cb

import { useRef, useEffect } from "react";

const Webc = () => {
    
    const videoRef = useRef(null);

    useEffect(() => {
      getVideo();
    }, [videoRef]);
  
    const getVideo = () => {
      navigator.mediaDevices
        .getUserMedia({ video: { width: 300 } })
        .then(stream => {
          let video = videoRef.current;
          video.srcObject = stream;
          video.play();
        })
        .catch(err => {
          console.error("error:", err);
        });
    };
  
    return (
      
        <div className="relative max-h-[100px] overflow-hidden border rounded-lg ml-4">
        
            <video ref={videoRef} />
    
        
      </div>
    );
  };
  
  export default Webc;