import { Box, Tab, Tabs, Typography } from "@mui/material";
import { useState } from "react";
import NewestCources from "./NewestCources";
import AllCourseInCategory from "./AllCourseInCategory"
import PropTypes from 'prop-types';
TabCourse.propTypes = {
    course: PropTypes.array,
};
function TabCourse({course=[]}) {
    const [value, setValue] = useState('one');
    const handleChange = (event, newValue) => {
        setValue(newValue);
    };
    return (
      <>
        <Box sx={{ width: "100%", marginTop: "10px" }}>
          <Typography variant="h5" fontWeight="bolder">
            Các khóa học giúp bạn bắt đầu
          </Typography>
          <Typography sx={{ color: "grey" }}>
            Khám phá các khóa học từ những chuyên gia giàu kinh nghiệm thực tế
          </Typography>
          <Tabs
            value={value}
            onChange={handleChange}
            textColor="secondary"
            indicatorColor="secondary"
            aria-label="secondary tabs example"
          >
            <Tab value="one" label="Phổ biến nhất" />
            <Tab value="two" label="Mới nhất" />
          </Tabs>
        </Box>
        {value === "one" && (
          <AllCourseInCategory course={course}></AllCourseInCategory>
        )}
        {value === "two" && <NewestCources course={course} />}
      </>
    );
}

export default TabCourse;