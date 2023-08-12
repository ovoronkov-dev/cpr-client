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
import { PollReportModel } from "~core/models";
import { calculateKDifferenceMatrixValues, parseKDifferenceMatrix } from "./utils";

interface Props {
  report: PollReportModel;
}

export const KDifferenceMatrix = ({ report }: Props) => {
  const parsed = useMemo(() => {
    return parseKDifferenceMatrix(report);
  }, [report]);

  const difference = useMemo(() => {
    return calculateKDifferenceMatrixValues(parsed);
  }, [parsed]);

  const chartData = useMemo(() => {
    return difference.map((item, index) => ({
      name: `P${index + 1}`,
      value: item,
    }));
  }, []);

  return (
    <Fragment>
      <Typography fontWeight="bold">К-шкала різниць</Typography>

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
