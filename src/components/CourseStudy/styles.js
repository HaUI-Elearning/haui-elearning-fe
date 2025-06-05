const styles = {
  container: {
    display: "flex",
    gap: 24,
    padding: 20,
    minHeight: "100vh",
    alignItems: "flex-start", 
  },
  mainContent: {
    flex: 3,
    display: "flex",
    flexDirection: "column",
    borderRight: "1px solid #ddd",
    paddingRight: 20,
  },
  lessonSection: {
    height: "70vh", 
    marginBottom: 20,
  },
  tabSection: {
    flex: "unset", 
    display: "flex",
    flexDirection: "column",
    paddingTop: 10,
  },
  tabs: {
    display: "flex",
    gap: 10,
    borderBottom: "1px solid #ccc",
    paddingBottom: 10,
  },
  tabBtn: {
    background: "none",
    border: "none",
    cursor: "pointer",
    padding: "8px 12px",
    fontSize: 16,
  },
  tabContent: {
    marginTop: 20,
    flex: "unset",
    overflowY: "visible", 
  },
  sidebar: {
    flex: 1,
    borderLeft: "1px solid #ddd",
    paddingLeft: 20,
    minHeight: "100vh",
  },
};

export default styles;
