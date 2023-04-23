import { PollReportModel } from "~core/models";
import { Box, Grid, Typography } from "@mui/material";
import { PercentageMatrix } from "./PercentageMatrix";
import { DifferenceMatrix } from "./DifferenceMatrix";
import { RatioMatrix } from "./RatioMatrix";
import { SaatiMatrix } from "./SaatiMatrix";
import { KMatrix } from "./KMatrix";
import { SummaryMatrix } from "./SummaryMatrix";

interface Props {
  report: PollReportModel;
}

export const ReportViewer = ({ report }: Props) => {
  return (
    <Box>
      <Typography>Дата проходження: {report.createdAt || "-"}</Typography>

      <SummaryMatrix report={report} />

      <Box m={1} />

      <PercentageMatrix report={report} />

      <Box m={1} />

      <SaatiMatrix report={report} />

      <Box m={1} />

      <KMatrix report={report} />

      <Box m={1} />

      <RatioMatrix report={report} />

      <Box m={1} />

      <DifferenceMatrix report={report} />

      <Box m={1} />
    </Box>
  );
};
