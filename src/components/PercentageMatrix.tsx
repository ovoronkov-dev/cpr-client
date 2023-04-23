import { Box, Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment, useMemo } from "react";
import { PollReportModel } from "~core/models";
import { PercentagePieChart } from "./PieChart";
import { calculateSummaryPercentageMatrix, parsePercentageMatrix } from "./utils";

interface Props {
  report: PollReportModel;
}

export const PercentageMatrix = ({ report }: Props) => {
  const parsed = useMemo(() => parsePercentageMatrix(report), [report]);

  const summary = useMemo(() => {
    return calculateSummaryPercentageMatrix(parsed);
  }, [parsed]);

  const average = useMemo(() => {
    return summary.reduce((acc, curr) => acc + curr, 0);
  }, [summary]);

  const pieChart = useMemo(() => {
    const result: {
      name: string;
      value: number;
    }[] = [];

    summary.forEach((value, index) =>
      result.push({
        name: `P${index + 1}`,
        value,
      })
    );

    return result;
  }, [summary]);

  return (
    <Fragment>
      <Typography fontWeight="bold">Матриця відсотків</Typography>

      <Grid container spacing={1}>
        <Grid item xs={8}>
          <Table component={Paper} sx={{ mt: 1 }}>
            <TableHead>
              <TableRow>
                <TableCell />
                {Object.keys(parsed).map((key) => (
                  <TableCell key={key}>P{+key + 1}</TableCell>
                ))}
                <TableCell>Σ</TableCell>
                <TableCell>Норм.</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(parsed).map((key) => (
                <TableRow key={key}>
                  <TableCell>P{+key + 1}</TableCell>
                  {Object.keys(parsed[+key]).map((innerKey) => (
                    <TableCell key={innerKey}>{parsed[+key][+innerKey]}</TableCell>
                  ))}
                  <TableCell>
                    <strong>{summary[+key]}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{(summary[+key] / average).toFixed(4)}</strong>
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
