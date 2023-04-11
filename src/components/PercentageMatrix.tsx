import { Box, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment, useMemo } from "react";
import { ParsedReport } from "~core/definitions";
import { PollReportModel } from "~core/models";
import { PieChart, Pie, ResponsiveContainer } from "recharts";
import { PercentagePieChart } from "./PieChart";

interface Props {
  report: PollReportModel;
}

export const PercentageMatrix = ({ report }: Props) => {
  const parsed = useMemo(() => {
    const result: ParsedReport = {};

    report.data.forEach((pair) => {
      if (!result[pair.firstIndex]) result[pair.firstIndex] = { [pair.firstIndex]: 0 };
      result[pair.firstIndex][pair.secondIndex] = pair.firstValue;

      if (!result[pair.secondIndex]) result[pair.secondIndex] = { [pair.secondIndex]: 0 };
      result[pair.secondIndex][pair.firstIndex] = pair.secondValue;
    });

    return result;
  }, [report]);

  const summary = useMemo(() => {
    return Object.keys(parsed).map((key) => Object.values(parsed[+key]).reduce((acc, curr) => acc + curr, 0));
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

      <Table component={Paper} sx={{ mt: 1 }}>
        <TableHead>
          <TableRow>
            <TableCell />
            {Object.keys(parsed).map((key) => (
              <TableCell key={key}>P{+key + 1}</TableCell>
            ))}
            <TableCell>Σ</TableCell>
            <TableCell>Σ / 100</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {Object.keys(parsed).map((key) => (
            <TableRow key={key}>
              <TableCell>P{+key + 1}</TableCell>
              {Object.keys(parsed[+key]).map((innerKey) => (
                <TableCell key={innerKey}>{parsed[+key][+innerKey]}</TableCell>
              ))}
              <TableCell>{summary[+key]}</TableCell>
              <TableCell>{(summary[+key] / average).toFixed(4)}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>

      <Box m={2} />

      <Typography fontWeight="bold">Графіки</Typography>

      <PercentagePieChart data={pieChart} />
    </Fragment>
  );
};
