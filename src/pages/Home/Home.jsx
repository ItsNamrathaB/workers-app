import Grid from "@mui/material/Grid";

import HeaderBar from "../../components/molecules/HeaderBar/HeaderBar";
import Workers from "../../components/organisms/Workers/Workers";

function Home() {
  const styles = {
    fullWidth: {
      width: "100%",
      padding: "0.5em",
    },
    borderPadding: {
      padding: "1em 0.5em",
    },
  };
  return (
    <Grid container alignItems="center">
      <Grid
        item
        style={{
          ...styles.fullWidth,
          ...styles.borderPadding,
        }}
      >
        <HeaderBar />
      </Grid>
      <Grid item style={styles.fullWidth}>
        <Workers />
      </Grid>
    </Grid>
  );
}

export default Home;
