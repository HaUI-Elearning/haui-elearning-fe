import PropTypes from "prop-types";

import styles from "./styles";

const VideoPlayer = ({ videoURL }) => {
  return (
    <div style={styles.container}>
      {videoURL ? (
        <video controls autoPlay muted src={videoURL} style={styles.video}>
          Your browser does not support the video tag 🎥
        </video>
      ) : (
        <p style={styles.message}>📚 Please select a lesson to start!</p>
      )}
    </div>
  );
};

VideoPlayer.propTypes = {
  videoURL: PropTypes.string,
};

export default VideoPlayer;
