import { useEffect, useState } from "react";
import Overview from "./Overview/Overview";
import Reviews from "./Review/ReviewTab";
import VideoPlayer from "./VideoPlayer/VideoPlayer";
import ChapterList from "./ChapterList/ChapterList";
import styles from "./styles";
import PropTypes from "prop-types";

const Study = ({ course }) => {
  const [courseOverview, setCourseOverview] = useState(course);

  useEffect(() => {
    setCourseOverview(course);
  }, [course]);

  const tabs = ["Tổng quan", "Đánh giá"];
  const tabComponents = {
    "Tổng quan": <Overview course={course} />,
    "Đánh giá": <Reviews courseId={courseOverview.courseId} isAuthor={courseOverview.authorCourse} />,
  };
  const [activeTab, setActiveTab] = useState("Tổng quan");
  const [selectedVideo, setSelectedVideo] = useState(null);

  const handleLessonClick = (videoUrl) => {
    setSelectedVideo(videoUrl);
  };
  return (
    <div style={styles.container}>
      <div style={styles.mainContent}>
        <div style={styles.lessonSection}>
          <VideoPlayer videoURL={selectedVideo} />
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
            {tabComponents[activeTab] || <p>Không có nội dung cho {activeTab}</p>}
          </div>
        </div>
      </div>

      <div style={styles.sidebar}>
        <ChapterList
          chapters={course.chapters || []}
          onLessonClick={handleLessonClick}
        />
      </div>
    </div>
  );
};
Study.propTypes = {
  course: PropTypes.any,
};

export default Study;
