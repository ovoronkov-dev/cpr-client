import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment, useMemo } from "react";
import { PollReportModel } from "~core/models";
import { PercentagePieChart } from "./PieChart";
import { fraction } from "mathjs";
import { calculateRootsKMatrix, parseKMatrix } from "./utils";

interface Props {
  report: PollReportModel;
}

export const KMatrix = ({ report }: Props) => {
  const parsed = useMemo(() => {
    return parseKMatrix(report);
  }, [report]);

  const roots = useMemo(() => {
    return calculateRootsKMatrix(parsed);
  }, [parsed]);

  const average = useMemo(() => roots.reduce((a, b) => a + b, 0), [roots]);

  const pieChart = useMemo(() => {
    return roots.map((value, index) => ({
      name: `P${index + 1}`,
      value: +value.toFixed(4),
    }));
  }, [roots]);

  return (
    <Fragment>
      <Typography fontWeight="bold">K-матриця</Typography>

      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Table component={Paper} sx={{ mt: 1 }}>
            <TableHead>
              <TableRow>
                <TableCell />
                {Object.keys(parsed).map((key) => (
                  <TableCell key={key}>P{+key + 1}</TableCell>
                ))}
                <TableCell>√</TableCell>
                <TableCell>Норм</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(parsed).map((key) => (
                <TableRow key={key}>
                  <TableCell>P{+key + 1}</TableCell>
                  {Object.keys(parsed[+key]).map((innerKey) => {
                    const { n, d } = fraction(parsed[+key][+innerKey]);

                    return (
                      <TableCell key={innerKey}>
                        {parsed[+key][+innerKey] < 1 ? `${n}/${d}` : parsed[+key][+innerKey]}
                      </TableCell>
                    );
                  })}
                  <TableCell>
                    <strong>{roots[+key].toFixed(4)}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{(roots[+key] / average).toFixed(4)}</strong>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>

        <Grid item xs={4}>
          <PercentagePieChart data={pieChart} />
        </Grid>
      </Grid>
    </Fragment>
  );
};
