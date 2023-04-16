import { PollReportModel } from "~core/models";
import { Box, Grid, Typography } from "@mui/material";
import { PercentageMatrix } from "./PercentageMatrix";
import { DifferenceMatrix } from "./DifferenceMatrix";
import { RatioMatrix } from "./RatioMatrix";

interface Props {
  report: PollReportModel;
}

export const ReportViewer = ({ report }: Props) => {
  return (
    <Box>
      <Typography>Дата проходження: {report.createdAt || "-"}</Typography>

      <PercentageMatrix report={report} />

      <Box m={1} />

      <RatioMatrix report={report} />

      <Box m={1} />

      <DifferenceMatrix report={report} />

      <Box m={1} />
    </Box>
  );
};
