import { PollReportModel } from "~core/models";
import { Accordion, AccordionDetails, AccordionSummary, Box, Grid, Typography } from "@mui/material";
import { PercentageMatrix } from "./PercentageMatrix";
import { DifferenceMatrix } from "./DifferenceMatrix";
import { RatioMatrix } from "./RatioMatrix";
import { SaatiMatrix } from "./SaatiMatrix";
import { KMatrix } from "./KMatrix";
import { SummaryMatrix } from "./SummaryMatrix";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { format } from "date-fns";

interface Props {
  report: PollReportModel;
}

export const ReportViewer = ({ report }: Props) => {
  return (
    <Box>
      <Typography>
        Дата проходження:{" "}
        {typeof report.createdAt === "number" ? format(report.createdAt, "yyyy-MM-dd HH:mm:ss") : report.createdAt}
      </Typography>

      <SummaryMatrix report={report} />

      <Box m={1} />

      <Accordion>
        <AccordionSummary expandIcon={<ExpandMoreIcon />}>
          <Typography fontWeight="bold">Детальніше</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <PercentageMatrix report={report} />

          <Box m={1} />

          <SaatiMatrix report={report} />

          <Box m={1} />

          <KMatrix report={report} />

          <Box m={1} />

          <RatioMatrix report={report} />

          <Box m={1} />

          <DifferenceMatrix report={report} />
        </AccordionDetails>
      </Accordion>
    </Box>
  );
};
