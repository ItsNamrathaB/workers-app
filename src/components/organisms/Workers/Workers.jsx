import CircularProgress from "@mui/material/CircularProgress";

import workerService from "../../../utils/axios-utils/workerUtils";
import { allWorkersMessage } from "../../../_constants/snackbarErrorMessages";
import { useEffect, useState } from "react";

import WorkersList from "../WorkersList/WorkersList";
import SDSnackBar from "../../molecules/SDSnackBar/SDSnackBar";

function Workers() {
  const styles = {
    centerAll: {
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    },
    fullWidth: {
      width: "100%",
    },
  };

  const [allWorkers, setWorkers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [workersFetchError, setWorkersFetchError] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });

  // Fetch all workers on the initialMount
  useEffect(() => {
    setLoading(true);
    workerService
      .getAllWorkers()
      .then((response) => {
        setWorkers(response.data);
        setLoading(false);
        setWorkersFetchError(false);
      })
      .catch((error) => {
        setLoading(false);
        setWorkersFetchError(true);
        setSnackbar({
          ...snackbar,
          open: true,
          severity: "error",
          message: allWorkersMessage,
        });
      });
  }, []);

  return (
    <div style={styles.centerAll}>
      {loading ? (
        <CircularProgress />
      ) : (
        <>
          {/* Show error message if error occurs while fetching data */}
          {workersFetchError ? (
            <SDSnackBar
              snackbar={snackbar}
              setSnackbar={setSnackbar}
              styles={styles}
            />
          ) : (
            <WorkersList workers={allWorkers} />
          )}
        </>
      )}
    </div>
  );
}

export default Workers;
