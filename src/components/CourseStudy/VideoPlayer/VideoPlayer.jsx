import PropTypes from "prop-types";

import styles from "./styles";

const VideoPlayer = ({ videoURL }) => {
  return (
    <div style={styles.container}>
      {videoURL ? (
        <video controls autoPlay muted src={videoURL} style={styles.video}>
          Trình duyệt hiện không hỗ trợ phát video
        </video>
      ) : (
        <p style={styles.message}>Hãy chọn một bài học để bắt đầu học ngay!</p>
      )}
    </div>
  );
};

VideoPlayer.propTypes = {
  videoURL: PropTypes.string,
};

export default VideoPlayer;
