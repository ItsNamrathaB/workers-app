import Button from "@mui/material/Button";
import CircularProgress from "@mui/material/CircularProgress";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import { useTheme } from "@mui/material";

import { useEffect, useMemo, useState } from "react";
import { useParams } from "react-router-dom";

import useForm from "./useForm";
import workerService from "../../utils/axios-utils/workerUtils";
import workerFieldProps from "../../_constants/workerFieldProps";
import WorkerReadOnly from "../../components/organisms/WorkerReadOnly/WorkerReadOnly";
import CreateWorker from "../../components/organisms/CreateWorker/CreateWorker";
import {
  individualWorkerMessage,
  createWorkerMessage,
} from "../../_constants/snackbarErrorMessages";
import SDSnackBar from "../../components/molecules/SDSnackBar/SDSnackBar";

function Worker() {
  /* constants - start*/
  const { workerId } = useParams();
  const theme = useTheme();
  const workerFields = workerFieldProps();
  const names = useMemo(
    () => workerFields.map((field) => field.name),
    [workerFields]
  );
  const initialValues = names.reduce(
    (accumulator, name) => ({ ...accumulator, [name]: "" }),
    {}
  );
  const styles = {
    width80: {
      width: "80%",
    },
    fullWidth: { width: "100%" },
    errorColor: {
      border: "0.125px solid " + theme.palette.error.main,
    },
    defaultFilledColor: {
      border: "0.125px solid #C4C4C4",
    },
    primaryColor: {
      border: "0.125px solid " + theme.palette.primary.main,
    },
    datePickerDefault: {
      marginBottom: "2em",
      width: "100%",
      borderRadius: "4px",
    },
    buttonContainer: {
      backgroundColor: "none",
      width: "100%",
      paddingBottom: "2.5em",
    },
  };
  /* constants - end*/

  /* State declarations - start */
  const [values, handleValueChange] = useForm(initialValues);
  const [errorMessages, setErrorMessages] = useState(initialValues);
  const [selectedDate, setDate] = useState(null);
  const [currentWorker, setCurrentWorker] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(
    workerFields
      .map((field) => {
        return { [field.name]: field.required };
      })
      .reduce((accumulator, name) => {
        let accumulatedValue = {};
        for (const requiredKey in name) {
          accumulatedValue = {
            ...accumulator,
            [requiredKey]: name[requiredKey],
          };
        }
        return accumulatedValue;
      }, {})
  );
  const [apiError, setAPIError] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "",
  });
  /* State declarations - end */

  /* useEffect - start */

  //fetch individual worker details if workerId parameter is present on initial mount
  useEffect(() => {
    if (workerId) {
      setLoading(true);
      workerService
        .getWorkerDetails(workerId)
        .then((response) => {
          setCurrentWorker(response.data);
          setLoading(false);
          setAPIError(false);
          setSnackbar({
            ...snackbar,
            open: true,
            message: "",
            severity: "success",
          });
        })
        .catch((error) => {
          setLoading(false);
          setAPIError(true);
          setSnackbar({
            ...snackbar,
            open: true,
            message: individualWorkerMessage,
            severity: "error",
          });
        });
    }
  }, []);

  /* useEffect - end */

  /* Handler functions - start */

  // Set error object onblur of fields
  function handleError(e, field) {
    const isValueEmpty =
      values[field.name] === undefined
        ? true
        : values[field.name] === null || values[field.name] === "";

    // only make mandatory fields invalid
    let isValid = field.required ? !isValueEmpty : true;

    let errorMessage = "Please fill this mandatory field";

    // validate number regex if the field is of type number
    if (field.type === "number") {
      // check regex for 10 digit number
      const pattern = new RegExp("^\\d{10}$");
      let isValueValidNumber =
        !isValueEmpty && pattern.test(values[field.name]);
      if (!isValueValidNumber) {
        errorMessage = "Please enter a valid contact number";
        isValid = field.required
          ? // if the field is mandatory, both non-empty and valid value conditions are checked
            isValid && isValueValidNumber
          : // if the field is non-mandatory, check for valid value only if it's filled
          !isValueEmpty
          ? isValueValidNumber
          : true;
      }
    }
    setError({ ...error, [field.name]: !isValid });
    setErrorMessages({
      ...errorMessages,
      [field.name]: !isValid && errorMessage,
    });
  }

  // Create worker onclick of submit
  function handleClick() {
    setLoading(true);
    workerService
      .createWorker(JSON.stringify(values))
      .then((response) => {
        setAPIError(false);
        setSnackbar({
          ...snackbar,
          open: true,
          message: "Worker created successfully",
          severity: "success",
        });
        setLoading(false);
      })
      .catch((error) => {
        setAPIError(true);
        setSnackbar({
          ...snackbar,
          open: true,
          message: createWorkerMessage,
          severity: "error",
        });
        setLoading(false);
      });
  }

  /* Handler functions - end */

  return (
    <Grid
      container
      spacing={3}
      justifyContent="center"
      direction={"column"}
      alignItems={"center"}
    >
      <Grid item style={styles.fullWidth} container justifyContent="center">
        <Grid item sx={{ paddingTop: "1em" }}>
          <Typography variant="h5">
            {workerId ? "WORKER DETAILS" : "CREATE WORKER"}
          </Typography>
        </Grid>
      </Grid>
      <Grid item>
        <Grid container>
          {workerId ? (
            // Display read-only component if the workerId param is set
            <Grid item container justifyContent="center">
              {loading ? (
                <CircularProgress style={{ margin: "auto" }} />
              ) : (
                <>
                  {apiError ? (
                    <SDSnackBar
                      snackbar={snackbar}
                      setSnackbar={setSnackbar}
                      styles={styles}
                    />
                  ) : (
                    <WorkerReadOnly
                      styles={styles}
                      currentWorker={currentWorker}
                    />
                  )}
                </>
              )}
            </Grid>
          ) : (
            // Display CreateWorker form if the workerId param is not set
            <>
              {loading && (
                <CircularProgress sx={{ zIndex: 100, margin: "auto" }} />
              )}
              {snackbar.open && (
                <SDSnackBar
                  snackbar={snackbar}
                  setSnackbar={setSnackbar}
                  styles={styles}
                />
              )}
              <CreateWorker
                styles={styles}
                workerFields={workerFields}
                selectedDate={selectedDate}
                setDate={setDate}
                setError={setError}
                error={error}
                values={values}
                handleValueChange={handleValueChange}
                handleError={handleError}
                errorMessages={errorMessages}
              />
            </>
          )}
        </Grid>
      </Grid>
      <Grid
        item
        style={styles.buttonContainer}
        container
        justifyContent={"center"}
      >
        <Grid item>
          {!workerId && (
            <Button
              variant="contained"
              disabled={
                loading ||
                Object.values(error).reduce(
                  (accumulator, currentValue) => accumulator || currentValue,
                  false
                )
              }
              onClick={handleClick}
            >
              Submit
            </Button>
          )}
        </Grid>
      </Grid>
    </Grid>
  );
}

export default Worker;
