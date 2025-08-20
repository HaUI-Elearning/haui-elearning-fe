import React, { useState, useEffect } from "react";
import {
  IconChevronDown,
  IconChevronRight,
  IconClockHour9,
  IconPencil,
  IconPlus,
  IconTrash,
} from "@tabler/icons-react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
  Button,
  Typography,
  TextField,
  CircularProgress,
} from "@mui/material";
import CourseList1 from "../../assets/images/course-list-basic-1.png";
import "./ChapterTeacherList.scss";
import Loading from "../../components/Loading/Loading";
import { useNavigate } from "react-router-dom";
import { useParams } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import EditChapterDialog from "./EditChapterDialog";
import AddChapterDialog from "./AddChapterDialog";
import { deleteChapter, getAllChapter } from "../../apis/chapter.api";
import { getLessonsByChapter } from "../../apis/lesson.api";
import axios from "axios";

const ChapterTeacherList = () => {
  // UI control states
  const [openSection, setOpenSection] = useState(null);
  const [isCreatingSubFolder, setIsCreatingSubFolder] = useState(false);
  const [isEditingSection, setIsEditingSection] = useState(false);
  const [isEditingItem, setIsEditingItem] = useState(false);
  const [course, setCourse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [chapters, setChapters] = useState([]);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [chapterToEdit, setChapterToEdit] = useState(null);
  const [chapterToDelete, setChapterToDelete] = useState(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const [lessonsByChapter, setLessonsByChapter] = useState({});
  const [lessonToDelete, setLessonToDelete] = useState(null);
  const [openConfirmLessonDialog, setOpenConfirmLessonDialog] = useState(false);
  const [rejectReason, setRejectReason] = useState("");
  const [loadingReason, setLoadingReason] = useState(false);
  const [showRejectForm, setShowRejectForm] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
  };

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const fetchCourse = async () => {
      try {
        const token = localStorage.getItem("accessToken");
        const response = await fetch(
          `http://localhost:8080/api/v1/Teacher/getCourse/${id}`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
              "Content-Type": "application/json",
            },
          }
        );
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = await response.json();
        setCourse(data);
      } catch (error) {
        console.error("Error fetching course:", error);
      }
    };

    fetchCourse();
  }, []);
  
  useEffect(() => {
    const fetchRejectReason = async () => {
      if (course?.data?.approvalStatus === "rejected") {
        try {
          const token = localStorage.getItem("accessToken");
          setLoadingReason(true);
          const response = await axios.get(
            `http://localhost:8080/api/v1/Teacher/Course/Reason/Reject?courseId=${id}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
                "Content-Type": "application/json",
              },
            }
          );
          console.log("Reject response", response.data)
          setRejectReason(response.data);
        } catch (error) {
          console.error("Error fetching rejection reason:", error);
          setRejectReason("Unable to fetch rejection reason.");
        } finally {
          setLoadingReason(false);
        }
      }
    };

    fetchRejectReason();
  }, [course, id]);
  
  useEffect(() => {
    const fetchChapters = async () => {
      try {
        setLoading(true);
        const res = await getAllChapter(id);
        setChapters(res.data.data);
      } catch (err) {
        console.error("Error fetching chapters:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchChapters();
  }, [id]);
  
  const handleDeleteChapter = (chapterId) => {
    setChapterToDelete(chapterId);
    setOpenConfirmDialog(true);
  };

  const confirmDeleteChapter = async () => {
    try {
      const token = localStorage.getItem("accessToken");
      await deleteChapter(id, chapterToDelete, token);
      setChapters((prev) => prev.filter((c) => c.id !== chapterToDelete));
      toast.success("Chapter deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete chapter!");
    } finally {
      setOpenConfirmDialog(false);
      setChapterToDelete(null);
    }
  };
  
  const handleDeleteLesson = (lessonId, chapterId) => {
    setLessonToDelete({ lessonId, chapterId });
    setOpenConfirmLessonDialog(true);
  };

  const confirmDeleteLesson = async () => {
    if (!lessonToDelete) return;
    try {
      const token = localStorage.getItem("accessToken");
      const { lessonId, chapterId } = lessonToDelete;

      const res = await fetch(
        `http://localhost:8080/api/v1/Teacher/Lesson/delete/${lessonId}?chapterId=${chapterId}`,
        {
          method: "DELETE",
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (!res.ok) {
        throw new Error("Failed to delete lesson");
      }

      // Update lessons in state
      setLessonsByChapter((prev) => {
        const updatedLessons = prev[chapterId]?.filter(
          (lesson) => lesson.lessonId !== lessonId
        );
        return {
          ...prev,
          [chapterId]: updatedLessons,
        };
      });

      toast.success("Lesson deleted successfully!");
    } catch (err) {
      console.error(err);
      toast.error("Failed to delete lesson!");
    } finally {
      setOpenConfirmLessonDialog(false);
      setLessonToDelete(null);
    }
  };
  
  const handleToggleSection = async (idx, chapterId) => {
    if (openSection === idx) {
      setOpenSection(null);
    } else {
      setOpenSection(idx);
      if (!lessonsByChapter[chapterId]) {
        try {
          const token = localStorage.getItem("accessToken");
          const res = await getLessonsByChapter(chapterId, token);
          setLessonsByChapter((prev) => ({
            ...prev,
            [chapterId]: res.data.data,
          }));
        } catch (err) {
          console.error("Error fetching lessons:", err);
          toast.error("No lessons found");
        }
      }
    }
  };

  const handleEditCourse = () => {
    navigate(`/teacher/edit-course/${id}`);
  };
  
  const handleAddLesson = (chapterId) => {
    navigate(`/teacher/addLesson/${chapterId}`);
  };
  
  const handleEditLesson = (chapterId, lessonId) => {
    navigate(`/teacher/editLesson/${chapterId}/${lessonId}`);
  };

  // Function to determine media type (image/video)
  const determineMediaType = (url = "") => {
    const imageExtensions = [".jpg", ".jpeg", ".png", ".gif"];
    const videoExtensions = [".mp4", ".avi", ".mov", ".mkv"];
    const isImage = imageExtensions.some((ext) => url.endsWith(ext));
    if (isImage) {
      return "image";
    }

    const isVideo = videoExtensions.some((ext) => url.endsWith(ext));
    if (isVideo) {
      return "video";
    }
    return "empty";
  };

  return (
    <div className="course-list-containers">
      <div className="course-header">
        <div className="course-img">
          {determineMediaType(course?.data?.thumbnail) === "image" && (
            <img
              className="course-img"
              src={course?.data?.thumbnail}
              alt="Course"
            />
          )}
          {determineMediaType(course?.data?.thumbnail) === "empty" && (
            <img src={CourseList1} alt="Course" className="course-img" />
          )}
        </div>
        <h2 style={{ color: "#f37335" }}>{course?.data?.name}</h2>
        <p className="course-leader-name">{course?.data?.author} </p>
        <div className="infor">
          <IconClockHour9 stroke={2} />
          <p>{course?.data?.hour} hours</p>
        </div>

        <div className="btn-container">
          {/* If status is approved */}
          {course?.data?.approvalStatus === "approved" && (
            <Button
              variant="contained"
              color="primary"
              onClick={handleEditCourse}
              sx={{
                padding: "10px 20px",
                fontSize: "14px",
                minWidth: "120px",
                height: "40px",
                borderRadius: "8px",
                marginTop: 2,
                marginLeft: 2,
              }}
            >
              chỉnh sửa khóa học
            </Button>
          )}

          {/* If status is rejected */}
          {course?.data?.approvalStatus === "rejected" && (
            <>
              <Button
                variant="contained"
                color="primary"
                onClick={handleOpenDialog}
                sx={{
                  padding: "10px 20px",
                  fontSize: "14px",
                  minWidth: "120px",
                  height: "40px",
                  borderRadius: "8px",
                  marginTop: 2,
                  marginLeft: 2,
                }}
              >
                Xem lý do
              </Button>

              <Dialog
                open={openDialog}
                onClose={handleCloseDialog}
                fullWidth
                maxWidth="sm"
              >
                <DialogTitle sx={{ color: "red" }}>
                  Lý do từ chối khóa học
                </DialogTitle>
                <DialogContent dividers>
                  {loadingReason ? (
                    <CircularProgress size={24} />
                  ) : (
                    <TextField
                      label="Rejection Reason"
                      multiline
                      fullWidth
                      rows={4}
                      value={rejectReason}
                      InputProps={{
                        readOnly: true,
                      }}
                    />
                  )}
                </DialogContent>
                <DialogActions>
                  <Button
                    onClick={handleEditCourse}
                    variant="contained"
                    color="primary"
                  >
                    Chỉnh sửa khóa học
                  </Button>
                  <Button onClick={handleCloseDialog} color="inherit">
                    Đóng
                  </Button>
                </DialogActions>
              </Dialog>
            </>
          )}

          {/* Cancel button always visible */}
          <Button
            variant="outlined"
            color="secondary"
            onClick={() => navigate("/teacher")}
            sx={{
              padding: "8px 20px",
              fontSize: "14px",
              minWidth: "120px",
              height: "40px",
              marginLeft: 2,
              marginTop: 2,
              borderRadius: "8px",
            }}
          >
            Quay lại
          </Button>
        </div>
      </div>

      <div className="row2">
        <div className="course-contents">
          <div className="sections">
            {chapters.length > 0 ? (
              chapters.map((chapter, idx) => (
                <div key={chapter.id} className="section">
                  <div
                    className="section-header"
                    onClick={() => handleToggleSection(idx, chapter.id)}
                  >
                    <div className="section-folder-header">
                      {openSection === idx ? (
                        <IconChevronDown />
                      ) : (
                        <IconChevronRight />
                      )}
                      <h3>{chapter.title}</h3>
                      <div className="section-actions">
                        <IconPencil
                          className="edit-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            setChapterToEdit(chapter);
                            setIsEditDialogOpen(true);
                          }}
                        />

                        <IconPlus
                          className="add-icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleAddLesson(chapter.id);
                          }}
                        />
                        <IconTrash
                          className="delete-icon"
                          style={{ cursor: "pointer", color: "red" }}
                          onClick={(e) => {
                            e.stopPropagation();
                            handleDeleteChapter(chapter.id);
                          }}
                        />
                      </div>
                    </div>
                  </div>

                  {openSection === idx && (
                    <div className="section-items">
                      {lessonsByChapter[chapter.id]?.length > 0 ? (
                        lessonsByChapter[chapter.id].map((lesson) => (
                          <div key={lesson.lessonId} className="section-item">
                            <p>{lesson.title}</p>
                            <div className="item-actions">
                              <IconPencil
                                className="edit-icon"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleEditLesson(chapter.id, lesson.lessonId);
                                }}
                              />
                              <IconTrash
                                className="delete-icon"
                                style={{ cursor: "pointer", color: "red" }}
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleDeleteLesson(
                                    lesson.lessonId,
                                    chapter.id
                                  );
                                }}
                              />
                            </div>
                          </div>
                        ))
                      ) : (
                        <div className="section-item">
                          <p>Chưa có bài học nào.</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              ))
            ) : (
              <div className="box-not-courses">
                <p>Chưa có học phần nào được tạo.</p>
              </div>
            )}
            <Dialog
              open={openConfirmLessonDialog}
              onClose={() => setOpenConfirmLessonDialog(false)}
            >
              <DialogTitle>Xác nhận xóa bài học</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Bạn có chắc chắn muốn xóa bài học này không? 
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setOpenConfirmLessonDialog(false)}
                  color="primary"
                >
                  Hủy
                </Button>
                <Button
                  onClick={confirmDeleteLesson}
                  color="error"
                  variant="contained"
                >
                  Xóa
                </Button>
              </DialogActions>
            </Dialog>

            <Dialog
              open={openConfirmDialog}
              onClose={() => setOpenConfirmDialog(false)}
            >
              <DialogTitle>Xác nhận xóa học phần</DialogTitle>
              <DialogContent>
                <DialogContentText>
                  Bạn có chắc chắn muốn xóa học phần này không?
                </DialogContentText>
              </DialogContent>
              <DialogActions>
                <Button
                  onClick={() => setOpenConfirmDialog(false)}
                  color="primary"
                >
                  Hủy
                </Button>
                <Button
                  onClick={confirmDeleteChapter}
                  color="error"
                  variant="contained"
                >
                  Xóa
                </Button>
              </DialogActions>
            </Dialog>
          </div>
        </div>
        <div className="buttons">
          <AddChapterDialog
            courseId={id}
            setChapters={setChapters}
            chapters={chapters}
          />
        </div>
      </div>

      <EditChapterDialog
        open={isEditDialogOpen}
        onClose={() => setIsEditDialogOpen(false)}
        courseId={id}
        chapter={chapterToEdit}
        setChapters={setChapters}
      />
    </div>
  );
};

export default ChapterTeacherList;