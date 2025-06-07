const styles = {
  container: {
    p: 5,
    bgcolor: "#f0f7ff",
    borderRadius: 4,
    boxShadow: "0 8px 20px rgba(0,0,0,0.15)",
    minHeight: "70vh",
  },
  heading: {
    fontWeight: "900",
    mb: 5,
    textAlign: "center",
    textTransform: "uppercase",
    color: "#0d47a1",
  },
  contentBox: {
    display: "flex",
    gap: 6,
    alignItems: "center",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  image: {
    width: { xs: "100%", sm: 320 },
    height: 220,
    objectFit: "cover",
    borderRadius: 3,
    boxShadow: "0 10px 25px rgba(0,0,0,0.3)",
    transition: "transform 0.3s ease",
    "&:hover": {
      transform: "scale(1.05)",
      boxShadow: "0 15px 30px rgba(0,0,0,0.5)",
    },
  },
  infoBox: {
    maxWidth: 540,
  },
  title: {
    fontWeight: 900,
    mb: 1,
    color: "#0d47a1",
  },
  ratingBox: {
    display: "flex",
    alignItems: "center",
    mb: 3,
    gap: 1,
  },
  ratingStars: {
    fontSize: 30,
    color: "#fbc02d",
  },
  ratingValue: {
    fontWeight: "700",
    fontSize: 18,
  },
  description: {
    mb: 4,
    fontSize: 16,
    lineHeight: 1.6,
  },
  button: {
    backgroundColor: "#A435E0",
    color: "white",
    fontWeight: "bold",
    px: 5,
    py: 1.8,
    boxShadow: "0 5px 15px rgba(13,71,161,0.4)",
    transition: "all 0.3s ease",
    "&:hover": {
      backgroundColor: "#9228B3",
      boxShadow: "0 8px 25px rgba(8,48,107,0.8)",
      transform: "translateY(-2px)",
    },
  },
  congratsImg: {
    width: 260,
    height: "auto",
    mb: 2,
    display: "block", 
    margin: "0 auto",
  },
};
export default styles;
