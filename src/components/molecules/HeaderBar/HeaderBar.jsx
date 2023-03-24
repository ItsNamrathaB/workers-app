import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";

import { useNavigate } from "react-router-dom";

function HeaderBar() {
  const navigate = useNavigate();
  return (
    <Grid container alignItems="center" justifyContent={"space-between"}>
      <Grid item>
        <Typography variant="h5">WORKERS</Typography>
      </Grid>
      <Grid item>
        <Button variant="contained" onClick={() => navigate("/worker")}>
          Create a new worker
        </Button>
      </Grid>
    </Grid>
  );
}

export default HeaderBar;
