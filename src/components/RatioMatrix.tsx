import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment, useMemo } from "react";
import { ParsedReport } from "~core/definitions";
import { PollReportModel } from "~core/models";
import { PercentagePieChart } from "./PieChart";

interface Props {
  report: PollReportModel;
}

export const RatioMatrix = ({ report }: Props) => {
  const parsed = useMemo(() => {
    const result: ParsedReport = {};

    report.data.forEach((pair) => {
      if (!result[pair.firstIndex]) result[pair.firstIndex] = { [pair.firstIndex]: 1 };
      result[pair.firstIndex][pair.secondIndex] = (pair.firstValue || 1) / (pair.secondValue || 1);

      if (!result[pair.secondIndex]) result[pair.secondIndex] = { [pair.secondIndex]: 1 };
      result[pair.secondIndex][pair.firstIndex] = (pair.secondValue || 1) / (pair.firstValue || 1);
    });

    return result;
  }, [report]);

  const summary = useMemo(() => {
    return Object.keys(parsed).map((key) => Object.values(parsed[+key]).reduce((acc, curr) => acc + curr, 0));
  }, [parsed]);

  const roots = useMemo(() => {
    const keys = Object.keys(parsed);
    return keys.map((key) =>
      Math.pow(
        Object.values(parsed[+key]).reduce((acc, curr) => acc * (curr || 1), 1),
        1 / (keys.length - 1)
      )
    );
  }, [parsed]);

  const pieChart = useMemo(() => {
    return roots.map((value, index) => ({
      name: `P${index + 1}`,
      value: +value.toFixed(4),
    }));
  }, [roots]);

  return (
    <Fragment>
      <Typography fontWeight="bold">Матриця відношень</Typography>

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
                <TableCell>√</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {Object.keys(parsed).map((key) => (
                <TableRow key={key}>
                  <TableCell>P{+key + 1}</TableCell>
                  {Object.keys(parsed[+key]).map((innerKey) => (
                    <TableCell key={innerKey}>{parsed[+key][+innerKey].toFixed(4)}</TableCell>
                  ))}
                  <TableCell>{summary[+key].toFixed(4)}</TableCell>
                  <TableCell>
                    <strong>{roots[+key].toFixed(4)}</strong>
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
