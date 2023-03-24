import Grid from "@mui/material/Grid";
import TextField from "@mui/material/TextField";

function WorkerReadOnly(props) {
  const { styles, currentWorker } = props;

  return (
    <Grid style={styles.width80} container spacing={3}>
      {Object.keys(currentWorker).map((field) => (
        <Grid item xs={6}>
          <TextField
            id="outlined-required"
            label={field.replace(/([a-z])([A-Z])/g, "$1 $2")}
            style={styles.fullWidth}
            value={currentWorker[field]}
            variant="filled"
            disabled={true}
            sx={{
              "& .Mui-disabled": {
                backgroundColor: "#cbdcef",
              },
            }}
          />
        </Grid>
      ))}
    </Grid>
  );
}
export default WorkerReadOnly;
