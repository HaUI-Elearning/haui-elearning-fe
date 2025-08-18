import { useEffect, useState } from "react";
import {
  Typography,
  Box,
  TextField,
  Button,
  Snackbar,
  Alert,
} from "@mui/material";
import { formatDayMonthYear } from "../../../utils/dateFomatter";
import styles from "./myPF";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import { setUser } from "../../../store/userSlice";

function MyProfile() {
  const dispatch = useDispatch();
  const userInfo = useSelector((state) => state.user.userInfo);
  const accessToken = useSelector((state) => state.user.accessToken);
  const parseInfo = JSON.parse(userInfo);
  const fullText = parseInfo.username;
  const [displayText, setDisplayText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [index, setIndex] = useState(0);
  const [name, setName] = useState(parseInfo.name);
  const [introduce, setIntroduce] = useState(parseInfo.introduce);
  const maxWords = 150;
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState("");
  useEffect(() => {
    const interval = setInterval(() => {
      if (isDeleting) {
        if (index > 0) {
          setDisplayText((prev) => prev.slice(0, index - 1));
          setIndex((prev) => prev - 1);
        } else {
          setIsDeleting(false);
          setIndex(0);
        }
      } else {
        if (index < fullText.length) {
          setDisplayText((prev) => prev + fullText[index]);
          setIndex((prev) => prev + 1);
        } else {
          setIsDeleting(true);
        }
      }
    }, 500);

    return () => clearInterval(interval);
  }, [isDeleting, index, fullText]);

  const handleSave = async () => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/users/update-profile",
        {
          name,
          introduce,
        },
        {
          headers: {
            Authorization: `Bearer ${accessToken}`,
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 200) {
        dispatch(
          setUser({
            userInfo: JSON.stringify(response.data.data),
            accessToken: accessToken,
          })
        );
        setSnackbarMessage("Cập nhật thông tin thành công!");
        setOpenSnackbar(true);
      }
    } catch (error) {
      console.error("Failed to update information:", error);
      setSnackbarMessage("Cập nhật thông tin thất bại. Vui long thử lại sau!");
      setOpenSnackbar(true);
    }
  };
  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };
  return (
    <div style={styles.styleDiv}>
      <Box>
        <Typography style={styles.stylesHiNameTypo}>
          <span>Xin chào, </span>
          {displayText}
        </Typography>
        <Box style={styles.stylesBox}>
          <Typography style={styles.stylesPublicPF}>
            <b>Hồ sơ công khai</b>
            <br />
            <span style={styles.stylesAddInfo}>Thêm thông tin về bạn</span>
          </Typography>
          <table style={styles.stylesTable}>
            <thead>
              <tr>
                <th style={styles.stylesTd} scope="col"></th>
                <th style={styles.stylesTd} scope="col"></th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={styles.stylesTd}>Họ và tên:</td>
                <td style={styles.stylesTd}>
                  <TextField
                    variant="outlined"
                    value={name || ""}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Tên của bạn"
                  />
                </td>
              </tr>
              <tr>
                <td style={styles.stylesTd}>Tên đăng nhập:</td>
                <td style={styles.stylesTd}>{parseInfo.username}</td>
              </tr>
              <tr>
                <td style={styles.stylesTd}>Email:</td>
                <td style={styles.stylesTd}>{parseInfo.email}</td>
              </tr>
              <tr>
                <td style={styles.stylesTd}>Giới thiệu ngắn:</td>
                <td style={styles.stylesTd}>
                  <TextField
                    fullWidth
                    variant="outlined"
                    value={introduce || ""}
                    onChange={(e) => {
                      if (e.target.value.length <= maxWords) {
                        setIntroduce(e.target.value);
                      }
                    }}
                    placeholder="Hãy chia sẻ đôi nét về bạn"
                    inputProps={{ maxLength: maxWords }}
                    multiline
                    rows={4}
                  />
                  <Typography
                    variant="caption"
                    color="textSecondary"
                    style={{ marginTop: "5px" }}
                  >
                    {introduce ? introduce.length : 0} / {maxWords} ký tự
                  </Typography>
                </td>
              </tr>
              <tr>
                <td style={styles.stylesTd}>Ngày tham gia:</td>
                <td style={styles.stylesTd}>
                  {formatDayMonthYear(parseInfo.createdAt)}
                </td>
              </tr>
            </tbody>
          </table>
          <Box sx={{ display: "flex", justifyContent: "center" }}>
            <Button
              variant="contained"
              color="primary"
              onClick={handleSave}
              sx={styles.stylesButton}
            >
              Cập nhật
            </Button>
          </Box>
        </Box>
      </Box>
      <Snackbar
        open={openSnackbar}
        autoHideDuration={6000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{
          vertical: "top",
          horizontal: "right",
        }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity="success"
          sx={{ width: "100%", fontSize: "1.2rem", padding: "16px" }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default MyProfile;
