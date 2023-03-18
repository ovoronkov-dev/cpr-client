import { useMemo } from "react";
import { PollReportModel } from "~core/models";
import { Grid } from "@mui/material";
import { ParsedReport } from "~core/definitions";
import { PercentageMatrix } from "./PercentageMatrix";

interface Props {
  report: PollReportModel;
}

export const ReportViewer = ({ report }: Props) => {
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

  return (
    <Grid container>
      <Grid item xs={6}>
        <PercentageMatrix report={parsed} />
      </Grid>
    </Grid>
  );
};
