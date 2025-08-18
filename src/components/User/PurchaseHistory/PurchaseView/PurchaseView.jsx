import html2pdf from "html2pdf.js";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Divider,
  Box,
} from "@mui/material";
import PropTypes from "prop-types";
import { useRef } from "react";
import { formatMoney } from "../../../../utils/moneyFomatter";
import "./styles.css"; // import file CSS
import styles from "../PurchaseFilter/styles";

const formatDate = (dateArray) => {
  const [y, m, d, h, min, s] = dateArray;
  return `${d}/${m}/${y} ${h}:${min}:${s}`;
};

const PurchaseView = ({ open, onClose, orderDetail }) => {
  const { totalAmount, payment, courses } = orderDetail || {};
  const pdfRef = useRef();

  const handleExportPDF = () => {
    const element = pdfRef.current;

    const images = element.querySelectorAll("img");
    const loadImage = (img) =>
      new Promise((resolve) => {
        if (img.complete) resolve();
        else img.onload = img.onerror = () => resolve();
      });

    Promise.all(Array.from(images).map(loadImage)).then(() => {
      const opt = {
        margin: 0.3,
        filename: "purchase-details.pdf",
        image: { type: "jpeg", quality: 0.98 },
        html2canvas: { scale: 2, useCORS: true },
        jsPDF: { unit: "in", format: "a4", orientation: "portrait" },
      };

      html2pdf().set(opt).from(element).save();
    });
  };


  let orderStatusText = "Không xác định";
  if (payment?.status === "success") {
    orderStatusText = "Thành công";
  } else if (payment?.status === "failed") {
    orderStatusText = "Thất bại";
  } else if (payment?.status === "pending") {
    orderStatusText = "Đang xử lý";
  }

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="sm"
      fullWidth
      PaperProps={{
        sx: {
          height: 600,
        },
      }}
    >
      <DialogTitle>
        Chi tiết đơn hàng
        <Button
          onClick={onClose}
          sx={{ position: "absolute", right: 8, top: 8 }}
        >
          ✖️
        </Button>
      </DialogTitle>

      <DialogContent dividers>
        <div ref={pdfRef}>
          <Box mb={2}>
            <Typography variant="subtitle1">
              <strong>Trạng thái đơn hàng:</strong>{" "}
              <span
                style={{
                  color: payment?.status === "success" ? "#2e7d32" : "#d32f2f",
                  fontWeight: "bold",
                  textTransform: "uppercase",
                }}
              >
                {orderStatusText}
              </span>
            </Typography>
            <Typography variant="subtitle1">
              <strong>Tổng tiền:</strong> {formatMoney(totalAmount)}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Ngày mua:</strong>{" "}
              {payment?.paymentDate && formatDate(payment.paymentDate)}
            </Typography>
            <Typography variant="subtitle1">
              <strong>Mã giao dịch:</strong> {payment?.txnRef}
            </Typography>
          </Box>

          <Divider sx={{ my: 2 }} />

          <Typography variant="h6" gutterBottom>
            📚 Các khóa học đã mua:
          </Typography>
          {courses?.map((item) => (
            <Box key={item.courseId} mb={2}>
              <div className="purchase-item">
                <img
                  src={item.thumbnail}
                  alt={item.name}
                  className="purchase-thumbnail"
                  crossOrigin="anonymous"
                />
                <div className="purchase-item-details">
                  <span className="purchase-item-name">{item.name}</span>
                  <span className="purchase-item-author">{item.author}</span>
                  <span className="purchase-item-price">
                    {formatMoney(item.price)}
                  </span>
                </div>
              </div>
              <hr className="hr" />
            </Box>
          ))}
        </div>
      </DialogContent>

      <DialogActions>
        <Button
          variant="contained"
          onClick={handleExportPDF}
          sx={styles.common}
        >
          📤 Xuất ra PDF
        </Button>
      </DialogActions>
    </Dialog>
  );
};

PurchaseView.propTypes = {
  open: PropTypes.any,
  onClose: PropTypes.any,
  orderDetail: PropTypes.any,
};

export default PurchaseView;
