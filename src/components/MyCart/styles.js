// styles.js
const styles = {
  container: {
    padding: "16px",
    backgroundColor: "#f9f9f9",
    minHeight: "60vh",
  },
  typoTitle: {
    fontSize: "40px",
    fontWeight: "bolder",
  },
  typoTotalCart: {
    fontSize: "20px",
    fontWeight: "bolder",
  },
  BoxTilte: {
    borderBottom: "1px solid grey",
  },
  courseItem: {
    borderBottom: "1px solid #ddd",
    padding: "8px",
    display: "flex",
    alignItems: "center",
  },
  thumbnail: {
    width: "100%",
    height: "auto",
    borderRadius: "5px",
  },
  typo1: {
    fontWeight: "bolder",
    display: "flex",
  },
  typo2: {
    fontWeight: "lighter",
    color: "grey",
  },
  typo3: {
    fontWeight: "bolder",
    fontSize: "30px",
  },

  courseDetails: {
    flexGrow: 1,
    marginLeft: "16px",
  },
  price: {
    fontWeight: "bold",
    color: "#672cad",
  },
  totalPaper: {
    padding: "10px",
    height: "30vh",
    display: "flex",
    flexDirection: "column",
  },
  checkoutButton: {
    backgroundColor: "#A435F0",
    color: "#fff",
    padding: "12px 32px",
    fontWeight: "bold",
    fontSize: "1rem",
    borderRadius: "12px",

    textTransform: "none",
    "&:hover": {
      backgroundColor: "#9228B3",
    },
  },
};

export default styles;
