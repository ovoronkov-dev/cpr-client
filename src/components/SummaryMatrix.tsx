import { Paper, Table, TableBody, TableCell, TableHead, TableRow, Typography } from "@mui/material";
import { Fragment, useMemo } from "react";
import { PollReportModel } from "~core/models";
import { calculateKMatrix, calculatePercentageMatrix, calculateRatioMatrix, calculateSaatiMatrix } from "./utils";

interface Props {
  report: PollReportModel;
}

export const SummaryMatrix = ({ report }: Props) => {
  const percentage = useMemo(() => calculatePercentageMatrix(report), [report]);

  const saati = useMemo(() => calculateSaatiMatrix(report), [report]);

  const kmatrix = useMemo(() => calculateKMatrix(report), [report]);

  const ratio = useMemo(() => calculateRatioMatrix(report), [report]);

  const keys = useMemo(() => Object.keys(percentage), [percentage]);

  return (
    <Fragment>
      <Typography fontWeight="bold">Загальна матриця</Typography>

      <Table component={Paper} sx={{ mt: 1 }}>
        <TableHead>
          <TableRow>
            <TableCell />
            <TableCell>Відсотки</TableCell>
            <TableCell>Сааті</TableCell>
            <TableCell>К-шкала</TableCell>
            <TableCell>Відношення</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {keys.map((_, index) => (
            <TableRow key={index}>
              <TableCell>
                <strong>P{index + 1}</strong>
              </TableCell>
              <TableCell>{percentage[index]}</TableCell>
              <TableCell>{saati[index]}</TableCell>
              <TableCell>{kmatrix[index]}</TableCell>
              <TableCell>{ratio[index]}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </Fragment>
  );
};
