import { Box } from "@mui/material";
import ReactDOM from "react-dom";

import styles from "..";

import { useState } from "react";

import { CourseImage } from "./CourseImage";
import { PriceSection } from "./PriceSection";
import { CourseDetails } from "./CourseDetail";
import { LoginDialog } from "./LoginDialog";
import { CourseActions } from "./CourseAction";
const CartPortal = ({ course }) => {
  const [open, setOpen] = useState(false);
  return ReactDOM.createPortal(
    <Box sx={styles.cartPortal}>
      <CourseImage thumbnail={course.thumbnail} title={course.title} />

      <PriceSection price={course.price} />

      <CourseActions course={course} open={open} setOpen={setOpen} />

      <CourseDetails chapter={course.chapters}></CourseDetails>
      <LoginDialog open={open} setOpen={setOpen} />
    </Box>,
    document.body
  );
};

export default CartPortal;
