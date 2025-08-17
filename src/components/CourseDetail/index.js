
const styles = {
  box: {
    backgroundColor: "black",
    height: "400px",
    color: "white",
    boxShadow: 1,
  },
  box1: {
    display: "flex",
    marginBottom: "6px",
    padding: "10px",
    justifyContent: "center",
  },
  circle: {
    width: 50,
    height: 50,
    borderRadius: "50%",
    border: "2px solid black",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    cursor: "pointer",
    marginLeft: "1.5rem",
  },
  breadcrumb: {
    paddingTop: "20px",
    fontSize: "20px",
    color: "#ffffff",
  },
  homeLink: {
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
    textDecoration: "none",
  },
  grainText: {
    display: "flex",
    alignItems: "center",
  },
  container: {
    height: "auto",
    backgroundColor: "white",

    marginTop: "20px",
    marginBottom: "20px",
    padding: "40px",
  },
  contents: {
    height: "auto",
    minHeight: "110vh",
  },
  title: {
    fontSize: "30px",
    fontWeight: "bold",
    marginTop: "15px",
  },
  description: {
    marginTop: "15px",
    fontSize: "18px",
    lineHeight: 1.5,
  },
  author: {
    marginTop: "15px",
  },
  star: {
    marginTop: "15px",
    color: "orange",
    fontSize: "19px",
    fontWeight: "bolder",
    display: "flex",
  },
  date: {
    marginTop: "15px",
    display: "flex",
  },
  learnTitle: {
    fontWeight: "bolder",
    marginBottom: "18px",
  },

  learnContentBox: {
    border: "1px solid #fff",
    display: "flex",
  },
  itemContents: {
    border: "1px solid black",
    padding: "40px",
  },
  cartPortal: {
    position: "absolute",
    top: "16%",
    right: "180px",
    zIndex: 2,
    alignItems: "center",
    bgcolor: "white",
    borderRadius: "5px",
    minHeight: "580px",
    width: "350px",
    boxShadow: "0px 6px 12px rgba(0, 0, 0, 0.1)",
    border: "1px solid grey",
  },
  boxImage: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  cart1: {
    backgroundColor: "rgb(192, 66, 206)",
    padding: "18px",
    color: "#fff",
    width: "100%",
    height: "50px",
    fontWeight: "bold",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgb(160, 50, 170) !important",
      color: "#fff",
    },
  },


  
    cart2: {
    backgroundColor: "rgb(192, 66, 206)",
    padding: "18px",
    color: "#fff",
    width: "80%",
    height: "50px",
    fontWeight: "bold",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgb(160, 50, 170) !important",
      color: "#fff",
    },
  },
  buyNowButton: {
    backgroundColor: "#fff",
    color: "#A435F0",
    padding: "12px 32px",
    fontWeight: "bold",
    fontSize: "1rem",
    borderRadius: "12px",
    width: "100%",

    textTransform: "none",
    border: "2px solid #A435F0",
    "&:hover": {
      backgroundColor: "#f3e8fd",
      color: "#9228B3",
      borderColor: "#9228B3",
    },
  },

  enroll: {
    backgroundColor: "rgb(192, 66, 206)",
    padding: "18px",
    color: "#fff",
    width: "100%",
    height: "50px",
    fontWeight: "bold",
    borderRadius: "8px",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "rgb(160, 50, 170) !important",
      color: "#fff",
    },
  },

  dialogContentStyle: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    padding: 3,
    textAlign: "center",
  },

  imageStyle: {
    width: "30%",
    maxWidth: "400px",
    height: "auto",
    borderRadius: "8px",
    marginBottom: "16px",
  },

  titleStyle: {
    fontWeight: "bold",
    marginBottom: "8px",
    color: "#333",
  },

  paragraphStyle: {
    marginBottom: "12px",
    color: "#555",
    lineHeight: 1.6,
    fontSize: "16px",
  },

  sectionTitleStyle: {
    fontWeight: "bold",
    marginTop: "20px",
    marginBottom: "8px",
    color: "#333",
  },
  noReview: {
    textAlign: "center",
    fontSize: "20px",
    color: "#888",
    marginTop: "20px",
  },
};
export default styles