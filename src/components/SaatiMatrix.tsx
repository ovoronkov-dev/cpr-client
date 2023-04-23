import { Grid, Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment, useMemo } from "react";
import { ParsedReport } from "~core/definitions";
import { PollReportModel } from "~core/models";
import { PercentagePieChart } from "./PieChart";
import { fraction } from "mathjs";
import { calculateRootsSaatiMatrix, parseSaatiMatrix } from "./utils";

const SAATI_SCALE = [1 / 9, 1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 1 / 3, 1 / 2, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const calculate = (value: number) => {
  return SAATI_SCALE[Math.floor(value / 6)];
};

interface Props {
  report: PollReportModel;
}

export const SaatiMatrix = ({ report }: Props) => {
  const parsed = useMemo(() => {
    return parseSaatiMatrix(report);
  }, [report]);

  const roots = useMemo(() => {
    return calculateRootsSaatiMatrix(parsed);
  }, [parsed]);

  const pieChart = useMemo(() => {
    return roots.map((value, index) => ({
      name: `P${index + 1}`,
      value: +value.toFixed(4),
    }));
  }, [roots]);

  return (
    <Fragment>
      <Typography fontWeight="bold">Матриця Сааті</Typography>

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
