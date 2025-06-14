import React, { useEffect, useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";
import { updateChapter, getAllChapter } from "../../apis/chapter.api";

const EditChapterDialog = ({ open, onClose, courseId, chapter, setChapters }) => {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (chapter) {
      setTitle(chapter.title || "");
      setDescription(chapter.description || "");
      setPosition(chapter.position || "");
    }
  }, [chapter]);

  const handleClose = () => {
    if (!loading) {
      onClose();
    }
  };

  const handleUpdate = async () => {
    if (!title.trim()) {
      toast.error("Chapter name cannot be empty!");
      return;
    }

    const posNumber = Number(position);
    if (!posNumber || posNumber < 1 || !Number.isInteger(posNumber)) {
      toast.error("Position must be a positive integer!");
      return;
    }

    setLoading(true);
    try {
      await updateChapter(courseId, chapter.id, title, description, posNumber);

      const resAll = await getAllChapter(courseId);
      setChapters(resAll.data.data);

      toast.success("Chapter updated successfully!");
      handleClose();
    } catch (error) {
      console.error(error);
      toast.error("Error updating chapter");
    } finally {
      setLoading(false);
    }
  };

  const isInvalidPosition =
    position !== "" && (!Number(position) || Number(position) < 1);

  return (
    <Dialog open={open} onClose={handleClose}>
      <DialogTitle>Edit Chapter</DialogTitle>
      <DialogContent>
        <TextField
          autoFocus
          margin="dense"
          label="Chapter Name"
          fullWidth
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Description"
          fullWidth
          multiline
          rows={3}
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <TextField
          margin="dense"
          label="Position"
          type="number"
          fullWidth
          value={position}
          onChange={(e) => setPosition(e.target.value)}
          inputProps={{ min: 1, step: 1 }}
          error={isInvalidPosition}
          helperText={isInvalidPosition ? "Must be a positive integer" : ""}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} disabled={loading}>Cancel</Button>
        <Button variant="contained" onClick={handleUpdate} disabled={loading}>
          {loading ? "Updating..." : "Update"}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default EditChapterDialog;
