import { useState, useEffect } from "react";
import {
  Container,
  Table,
  TableHead,
  TableBody,
  TableCell,
  TableRow,
  Button,
  Chip,
} from "@mui/material";
import { arrayToDate } from "../../../utils/formatDateArrayToDDMMYYYY";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CancelIcon from "@mui/icons-material/Cancel";
import { fetchOrders } from "../../../apis/OrderHistory/getAllOrder";
import { fetchOrderDetail } from "../../../apis/OrderHistory/getOrderDetail";
import PurchaseFilters from "./PurchaseFilter/PurchaseFilter";
import PurchaseView from "./PurchaseView/PurchaseView";
import styles from "./styles";

const PurchaseHistory = () => {
  const [status, setStatus] = useState("");
  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [orders, setOrders] = useState([]);

  const [dialogOpen, setDialogOpen] = useState(false);
  const [orderDetail, setOrderDetail] = useState(null);

  useEffect(() => {
    const loadOrders = async () => {
      try {
        const result = await fetchOrders();
        setOrders(result);
      } catch (error) {
        console.error("Fail to get all order history", error);
      }
    };

    loadOrders();
  }, []);

  const filteredOrders = orders.filter((order) => {
    const matchStatus = status
      ? order.payment.status.toLowerCase() === status.toLowerCase()
      : true;

    const orderDate = arrayToDate(order.payment?.paymentDate);
    if (!orderDate) return false;

    const from = fromDate ? new Date(fromDate) : null;
    const to = toDate ? new Date(toDate) : null;

    const matchFromDate = from ? from <= orderDate : true;
    const matchToDate = to ? orderDate <= to : true;

    return matchStatus && matchFromDate && matchToDate;
  });

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    setStatus("");
  };

  const handleViewClick = async (paymentID) => {
    try {
      const detail = await fetchOrderDetail(paymentID);
      setOrderDetail(detail);
      setDialogOpen(true);
    } catch (error) {
      console.error("Error fetching order detail:", error);
    }
  };

  return (
    <Container>
      <PurchaseFilters
        fromDate={fromDate}
        toDate={toDate}
        status={status}
        setFromDate={setFromDate}
        setToDate={setToDate}
        setStatus={setStatus}
        onClear={handleClear}
      />

      <Table>
        <TableHead>
          <TableRow sx={styles.headRow}>
            <TableCell sx={styles.headCell}>ID</TableCell>
            <TableCell sx={styles.headCell}>TRN</TableCell>
            <TableCell sx={styles.headCell}>Ngày mua</TableCell>
            <TableCell sx={styles.headCell}>Tổng tiền</TableCell>
            <TableCell sx={styles.headCell}>Số lượng khóa học</TableCell>
            <TableCell sx={styles.headCell}>Trạng thái</TableCell>
            <TableCell sx={styles.headCell}></TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {filteredOrders.map((order) => (
            <TableRow key={order.orderId}>
              <TableCell>{order.orderId}</TableCell>
              <TableCell>{order.payment?.txnRef}</TableCell>
              <TableCell>
                {order.payment?.paymentDate
                  ? arrayToDate(order.payment.paymentDate).toLocaleString()
                  : ""}
              </TableCell>

              <TableCell>{order.totalAmount?.toLocaleString()}₫</TableCell>
              <TableCell>{order.courses?.length || 0}</TableCell>
              <TableCell>
                <Chip
                  label={
                    order.payment?.status === "success" ? "Thành công" : "Thất bại"
                  }
                  color={
                    order.payment?.status === "success" ? "success" : "error"
                  }
                  icon={
                    order.payment?.status === "success" ? (
                      <CheckCircleOutlineIcon />
                    ) : (
                      <CancelIcon />
                    )
                  }
                  variant="outlined"
                  size="small"
                  sx={{ fontWeight: "bold" }}
                />
              </TableCell>
              <TableCell>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleViewClick(order.payment?.paymentId)}
                  sx={styles.view}
                >
                  Xem chi tiết
                </Button>
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <PurchaseView
        open={dialogOpen}
        onClose={() => setDialogOpen(false)}
        orderDetail={orderDetail}
      />
    </Container>
  );
};

export default PurchaseHistory;
