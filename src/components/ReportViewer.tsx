import { PollReportModel } from "~core/models";
import { Grid } from "@mui/material";
import { PercentageMatrix } from "./PercentageMatrix";
import { DifferenceMatrix } from "./DifferenceMatrix";

interface Props {
  report: PollReportModel;
}

export const ReportViewer = ({ report }: Props) => {
  return (
    <Grid container spacing={2}>
      <Grid item xs={6}>
        <PercentageMatrix report={report} />
      </Grid>
      <Grid item xs={6}>
        <DifferenceMatrix report={report} />
      </Grid>
    </Grid>
  );
};
