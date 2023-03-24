import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";

import { Link } from "react-router-dom";

export default function WorkersList({ workers }) {
  const styles = {
    widthMin650: {
      minWidth: 650,
    },
    boldHeaders: { fontWeight: "bold" },
  };

  return (
    <TableContainer component={Paper} elevation={5}>
      <Table sx={styles.widthMin650} aria-label="simple table">
        <TableHead>
          <TableRow>
            {workers.length > 0 &&
              Object.keys(workers[0]).map((field) => (
                <TableCell style={styles.boldHeaders}>
                  {/* split upper camelcase name to spaced labels*/}
                  {field.replace(/([a-z])([A-Z])/g, "$1 $2")}
                </TableCell>
              ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {workers.length > 0 &&
            workers.map((worker) => (
              <TableRow
                key={worker.Id}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                {Object.keys(worker).map((key) => (
                  <TableCell>
                    {/* Redirect Id to the individual worker's page */}
                    {key === "Id" ? (
                      <Link to={`/worker/` + worker[key]}>{worker[key]}</Link>
                    ) : (
                      worker[key]?.toString()
                    )}
                  </TableCell>
                ))}
              </TableRow>
            ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}
