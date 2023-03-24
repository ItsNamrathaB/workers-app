import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";

function CreateWorker(props) {
  const {
    styles,
    workerFields,
    selectedDate,
    setDate,
    setError,
    error,
    values,
    handleValueChange,
    handleError,
    errorMessages,
    // setShouldCompute,
  } = props;
  const dateFormat = "DD-MM-YYYY";

  return (
    <Grid item container justifyContent="center">
      <Grid
        style={styles.width80}
        container
        spacing={4}
        justifyContent="center"
        alignItems={"center"}
      >
        {workerFields.map((field) => (
          <Grid item xs={6}>
            {field.type === "date" ? (
              <LocalizationProvider dateAdapter={AdapterDayjs}>
                <DemoContainer components={["DatePicker"]}>
                  <DatePicker
                    value={selectedDate}
                    onChange={(newValue) => {
                      setDate(newValue);
                      handleValueChange({
                        name: field.name,
                        value: newValue?.toISOString(),
                      });
                      setError({ ...error, [field.name]: false });
                    }}
                    format={dateFormat}
                    sx={{
                      ...styles.datePickerDefault,
                      // Display error style when no date is selected
                      border: selectedDate
                        ? styles.defaultFilledColor
                        : styles.errorColor,
                      "& .MuiOutlinedInput-root.Mui-focused": {
                        "& > fieldset": {
                          border: selectedDate
                            ? styles.primaryColor
                            : styles.errorColor,
                        },
                      },
                    }}
                  />
                </DemoContainer>
              </LocalizationProvider>
            ) : (
              <TextField
                required={field.required}
                id="outlined-required"
                label={field.label}
                style={styles.fullWidth}
                value={values[field.name]}
                onChange={(e) => handleValueChange(e.target)}
                onBlur={(e) => handleError(e, field)}
                name={field.name}
                error={error[field.name]}
                helperText={errorMessages[field.name] || " "}
              />
            )}
          </Grid>
        ))}
      </Grid>
    </Grid>
  );
}

export default CreateWorker;
