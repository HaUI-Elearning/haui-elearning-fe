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
      toast.error("Tên chương không được để trống!");
      return;
    }

    const posNumber = Number(position);
    if (!posNumber || posNumber < 1 || !Number.isInteger(posNumber)) {
      toast.error("Position phải là số nguyên dương!");
      return;
    }

    setLoading(true);
    try {
      const res = await addChapter(courseId, title, description, posNumber);
      const resAll = await getAllChapter(courseId);
      setChapters(resAll.data.data);

      

      toast.success("Thêm chương thành công!");
      setOpen(false);
      setTitle("");
      setDescription("");
      setPosition("");
    } catch (error) {
      console.error(error);
      toast.error("Lỗi khi thêm chương");
    } finally {
      setLoading(false);
    }
  };

  const isInvalidPosition =
    position !== "" && (!Number(position) || Number(position) < 1);

  return (
    <>
      <Button variant="contained" onClick={() => setOpen(true)}>
        Thêm Folder
      </Button>

      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        disableEscapeKeyDown={false}
      >
        <DialogTitle>Thêm Chương Mới</DialogTitle>
        <DialogContent>
          <TextField
            autoFocus
            margin="dense"
            label="Tên chương"
            fullWidth
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TextField
            margin="dense"
            label="Mô tả"
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
            helperText={isInvalidPosition ? "Phải là số nguyên dương" : ""}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)}>Hủy</Button>
          <Button variant="contained" onClick={handleAdd} disabled={loading}>
            {loading ? "Đang thêm..." : "Thêm"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default AddChapterDialog;
