import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment, useMemo } from "react";
import {
  Bar,
  BarChart,
  CartesianGrid,
  Legend,
  ReferenceLine,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { ParsedReport } from "~core/definitions";
import { PollReportModel } from "~core/models";

interface Props {
  report: PollReportModel;
}

export const DifferenceMatrix = ({ report }: Props) => {
  const parsed = useMemo(() => {
    const result: ParsedReport = {};

    report.data.forEach((pair) => {
      if (!result[pair.firstIndex]) result[pair.firstIndex] = { [pair.firstIndex]: 0 };
      result[pair.firstIndex][pair.secondIndex] = pair.firstValue - pair.secondValue;

      if (!result[pair.secondIndex]) result[pair.secondIndex] = { [pair.secondIndex]: 0 };
      result[pair.secondIndex][pair.firstIndex] = pair.secondValue - pair.firstValue;
    });

    return result;
  }, [report]);

  const difference = useMemo(() => {
    return Object.keys(parsed).map((key) => Object.values(parsed[+key]).reduce((acc, curr) => acc + curr, 0));
  }, [parsed]);

  const chartData = useMemo(() => {
    return difference.map((item, index) => ({
      name: `P${index + 1}`,
      value: item,
    }));
  }, []);

  return (
    <Fragment>
      <Typography fontWeight="bold">Матриця різниць</Typography>

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
                  <TableCell>
                    <strong>{difference[+key]}</strong>
                  </TableCell>
                  <TableCell>
                    <strong>{difference[+key] / 100}</strong>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Grid>
        <Grid item xs={4}>
          <ResponsiveContainer width="100%" height={400}>
            <BarChart
              width={500}
              height={300}
              data={chartData}
              margin={{
                top: 5,
                right: 30,
                left: 20,
                bottom: 5,
              }}
            >
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Legend />
              <ReferenceLine y={0} stroke="#000" />
              <Bar dataKey="value" fill="#8884d8" />
            </BarChart>
          </ResponsiveContainer>
        </Grid>
      </Grid>
    </Fragment>
  );
};
