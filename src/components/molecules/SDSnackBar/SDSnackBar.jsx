import { Alert, Snackbar } from "@mui/material";

function SDSnackBar(props) {
  const { snackbar, setSnackbar, styles } = props;
  return (
    <Snackbar
      open={snackbar.open}
      autoHideDuration={6000}
      onClose={() => {
        setSnackbar({ ...snackbar, open: false, message: "", severity: "" });
      }}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
    >
      <Alert
        onClose={() =>
          setSnackbar({ ...snackbar, open: false, message: "", severity: "" })
        }
        severity={snackbar.severity}
        sx={{ ...styles.fullWidth, marginTop: "150px" }}
      >
        {snackbar.message}
      </Alert>
    </Snackbar>
  );
}
export default SDSnackBar;
