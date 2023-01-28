import * as React from "react";
import Stack from "@mui/material/Stack";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import { Slide } from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { CloseToast } from "../../Redux/Slices/OpenToastSlice";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function TransitionLeft(props) {
    return <Slide {...props} direction="left" />;
  }

export default function Toasts() {
//   const [open, setOpen] = React.useState(false);
const toastState = useSelector((state) => state.toast);
const dispatch= useDispatch()

const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    dispatch(CloseToast())
};
  

  return (
    <Stack spacing={2} sx={{ width: "100%" }}>

      <Snackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={toastState.open}
        autoHideDuration={6000}
        TransitionComponent={TransitionLeft}
        onClose={handleClose}
      >
        <Alert onClose={handleClose} severity={toastState.type} sx={{ width: "100%" }}>
          {toastState.message}
        </Alert>
      </Snackbar>
    </Stack>
  );
}
