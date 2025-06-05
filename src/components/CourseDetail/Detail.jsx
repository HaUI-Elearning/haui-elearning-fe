import PropTypes from "prop-types";
import { Box, Container } from "@mui/material";
import Grid2 from "@mui/material/Unstable_Grid2";
import { useNavigate } from "react-router-dom";
import styles from ".";
import { useState } from "react";
import AllLesson from "./CourseContent/Lesson";
import BreadcrumbsComp from "../../common/BreadcrumbsComp/BreadcrumbsComp";
import CourseInfo from "./CourseInfo/CourseInfo";
import WhatYouWillLearn from "./WhatLearn/Content";
import LearnMore from "./LearnMore/LearnMore";
import CartPortal from "./CartPotal/CartPotal";
import ReviewInDetail from "./Review/ReviewInDetail";

const Detail = ({ course = {}, comment = {}, onCommentFilter }) => {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);

  const handleNameClick = () => {
    navigate("/");
  };

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <Box sx={{ marginTop: "30px" }}>
      <Box sx={styles.box}>
        <Container>
          <Grid2 container spacing={3}>
            <Grid2 sm={8}>
              <BreadcrumbsComp course={course} onHomeClick={handleNameClick} />
              <CourseInfo course={course} />
            </Grid2>
            <Grid2 sm={4}></Grid2>
          </Grid2>
        </Container>
      </Box>

      <Box sx={styles.contents}>
        <Container sx={styles.container}>
          <WhatYouWillLearn course={course} />
        </Container>

        <Container>
          <Grid2 container>
            <Grid2 sm={12}>
              <LearnMore
                handleClickOpen={handleClickOpen}
                handleClose={handleClose}
                open={open}
              />
            </Grid2>
          </Grid2>
        </Container>

        <Container>
          <AllLesson data={course} />
        </Container>

        <Container>
          <ReviewInDetail onCommentFilter={onCommentFilter} comment={comment} />
        </Container>
      </Box>

      <CartPortal course={course} />
    </Box>
  );
};

Detail.propTypes = {
  course: PropTypes.object,
  comment: PropTypes.object,
  onCommentFilter: PropTypes.func,
};

export default Detail;
