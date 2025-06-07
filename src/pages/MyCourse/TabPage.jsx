import { useState, useEffect } from "react";
import { Box, Tab, Tabs, Typography, Container } from "@mui/material";
import { useLocation, useNavigate } from "react-router-dom";
import WishList from "../../components/User/WishList/WishList";
import MyLearning from "../../components/User/MyLearning/MyLearning";
import NotFoundPage from "../NotFoundPage/NotFound";

const TABS = [
  {
    label: "All Courses",
    path: "/my-course/my-learning",
    content: <MyLearning />,
  },
  { label: "Wishlist", path: "/my-course/my-wishlist", content: <WishList /> },
];

function TabPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const currentTabIndex = TABS.findIndex(
    (tab) => tab.path === location.pathname
  );
  const [selectedTab, setSelectedTab] = useState(currentTabIndex || 0);

  useEffect(() => {
    const currentTabIndex = TABS.findIndex(
      (tab) => tab.path === location.pathname
    );
    if (currentTabIndex !== -1) setSelectedTab(currentTabIndex);
  }, [location.pathname]);

  const handleTabChange = (_, newValue) => {
    setSelectedTab(newValue);
    navigate(TABS[newValue].path);
  };
  if (currentTabIndex === -1) {
    return <NotFoundPage />;
  }
  return (
    <Box sx={{ minHeight: "70vh", backgroundColor: "#f4f4f4" }}>
      <Box
        sx={{
          backgroundColor: "#333",
          color: "white",
          padding: "20px",
          borderRadius: "8px",
          boxShadow: "0 2px 5px rgba(0, 0, 0, 0.2)",
        }}
      >
        <Typography variant="h4" sx={{ fontWeight: "bold", textAlign: "Left" }}>
          My Learning
        </Typography>
        <Container sx={{ paddingTop: "20px" }}>
          <Tabs
            value={selectedTab}
            onChange={handleTabChange}
            aria-label="tabs"
            sx={{
              ".MuiTab-root": {
                textTransform: "none",
                fontWeight: "bolder",
                color: "#fff",
              },
              ".Mui-selected": {
                color: "#white",
                borderRadius: "4px",
              },
              ".MuiTabs-indicator": {
                color: "#fff",
              },
            }}
          >
            {TABS.map((tab, index) => (
              <Tab key={index} label={tab.label} />
            ))}
          </Tabs>
        </Container>
      </Box>
      <Container
        sx={{
          paddingTop: "20px",
          paddingBottom: "20px",
          backgroundColor: "white",
          borderRadius: "8px",
        }}
      >
        {TABS[selectedTab]?.content}
      </Container>
    </Box>
  );
}

export default TabPage;
