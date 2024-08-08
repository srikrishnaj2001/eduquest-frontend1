// // VideoCard.js
// import React from 'react';
// import YouTube from 'react-youtube';
// import './video.css';
// import Card from '@mui/material/Card';
// import CardContent from '@mui/material/CardContent';
// import Typography from '@mui/material/Typography';

// const Video = ({ videoId, title }) => {
//   const opts = {
//     height: '250',
//     width: '350',
//   };

//   return (
//     <div className="video-card">
//         <Card className="video-card">
//       <YouTube videoId={videoId} opts={opts} />
//       <CardContent>
//         <Typography variant="h6" component="div">
//           {title}
//         </Typography>
//       </CardContent>
//     </Card>
//     </div>
//   );
// };

// export default Video;
// VideoCard.js
import React, { useEffect, useRef } from 'react';
import YouTube from 'react-youtube';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';

const Video = ({ videoId, title }) => {
  const opts = {
    height: '250',
    width: '350',
  };

  const playerRef = useRef(null);

  useEffect(() => {
    // Ensure that the player is initialized before trying to play the video
    if (playerRef.current) {
      // You can add additional initialization logic here if needed
      console.log('YouTube player initialized');
    }
  }, [videoId]);

  const onReady = (event) => {
    // This function will be called when the YouTube player is ready
    playerRef.current = event.target;
  };

  const playVideo = () => {
    // Check if the player is initialized before trying to play the video
    if (playerRef.current) {
      playerRef.current.playVideo();
    }
  };

  return (
    <div className="video-card">
      <Card className="video-card">
        <YouTube videoId={videoId} opts={opts} onReady={onReady} />
        <CardContent>
          <Typography variant="h6" component="div">
            {title}
          </Typography>
          <button onClick={playVideo}>Play Video</button>
        </CardContent>
      </Card>
    </div>
  );
};

export default Video;
