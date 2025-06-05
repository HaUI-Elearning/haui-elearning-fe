import { useState } from "react";
import Overview from "./Overview/Overview";
import Reviews from "./Reviews";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import ChapterList from "./ChapterList/ChapterList";
import styles from "./styles";
const tabs = ["Overview", "Reviews"];
const Study = (course = {}) => {
  const tabComponents = {
    Overview: <Overview course={course} />,
    Reviews: <Reviews />,
  };
  const [activeTab, setActiveTab] = useState("Overview");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleLessonClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };
  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.lessonSection}>
          <VideoPlayer videoURL={selectedVideo}/>
        </div>

        <div style={styles.tabSection}>
          <div style={styles.tabs}>
            {tabs.map((tab) => (
              <button
                key={tab}
                style={{
                  ...styles.tabBtn,
                  borderBottom: activeTab === tab ? "2px solid purple" : "none",
                  fontWeight: activeTab === tab ? "bold" : "normal",
                }}
                onClick={() => setActiveTab(tab)}
              >
                {tab}
              </button>
            ))}
          </div>

          <div style={styles.tabContent}>
            {tabComponents[activeTab] || <p>No content for {activeTab}</p>}
          </div>
        </div>
      </div>

      <div style={styles.sidebar}>
        <ChapterList
          chapters={course.course.chapters || []}
          onLessonClick={handleLessonClick}
        />
      </div>
    </div>
  );
};

export default Study;
