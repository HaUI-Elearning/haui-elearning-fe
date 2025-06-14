import React, { useState } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  TextField,
  DialogActions,
} from "@mui/material";
import { toast } from "react-toastify";
import { addChapter, getAllChapter } from "../../apis/chapter.api";

const AddChapterDialog = ({ courseId, chapters, setChapters }) => {
  const [open, setOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [position, setPosition] = useState("");
  const [loading, setLoading] = useState(false);

  const handleAdd = async () => {
    if (!title.trim()) {
      toast.error("Chapter title must not be empty!");
      return;
    }

    const posNumber = Number(position);
    if (!posNumber || posNumber < 1 || !Number.isInteger(posNumber)) {
      toast.error("Position must be a positive integer!");
      return;
    }

    setLoading(true);
    try {
      await addChapter(courseId, title, description, posNumber);
      const resAll = await getAllChapter(courseId);
      setChapters(resAll.data.data);

      toast.success("Chapter added successfully!");
      setOpen(false);
      setTitle("");
      setDescription("");
      setPosition("");
    } catch (error) {
      console.error(error);
      toast.error("Error while adding chapter");
    } finally {
      setLoading(false);
    }
  };

  const isInvalidPosition =
    position !== "" && (!Number(position) || Number(position) < 1);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Add Folder
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        disableEscapeKeyDown={false}
      >
        <DialogTitle>Add New Chapter</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Chapter Title"
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
          <Button onClick={() => setOpen(false)}>Cancel</Button>
          <Button variant="contained" onClick={handleAdd} disabled={loading}>
            {loading ? "Adding..." : "Add"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddChapterDialog;
