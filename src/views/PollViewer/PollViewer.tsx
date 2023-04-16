import { Alert, Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { useMemo } from "react";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ReportViewer } from "~components/ReportViewer";
import { PollReportModel } from "~core/models";
import { usePollDocument } from "~firebase/hooks/usePollDocument";
import { useReportDocument } from "~firebase/hooks/useReportDocument";
import { getTime } from "date-fns";

export const PollViewer = () => {
  const { id } = useParams<{ id: string }>();

  const [document, loading, error] = usePollDocument(id);
  const [reports] = useReportDocument(id);

  const sortedReports = useMemo(() => {
    const mappedReports = reports.map((report) => ({
      id: report.id,
      ...(report.data() as PollReportModel),
    }));
    const reportsWithoutDate = mappedReports.filter((r) => !r.createdAt);
    const reportsWithDate = mappedReports
      .filter((r) => !!r.createdAt)
      .sort((a, b) => getTime(new Date(b.createdAt)) - getTime(new Date(a.createdAt)));

    return [...reportsWithDate, ...reportsWithoutDate];
  }, [reports]);

  console.log(sortedReports);

  if (error) return <Alert severity="error">{error.message}</Alert>;

  if (loading || !document) return <CircularProgress size={60} />;

  return (
    <Paper sx={{ p: 2 }}>
      <Grid container spacing={1}>
        <Grid item xs={6}>
          <Typography variant="body2" fontWeight="bold">
            Назва опитування:
          </Typography>

          <Typography>{document.title}</Typography>
        </Grid>

        <Grid item xs={6}>
          <Typography variant="body2" fontWeight="bold">
            Опис опитування:
          </Typography>

          <Typography>{document.description || "-"}</Typography>
        </Grid>
      </Grid>

      <Button component={Link} to={`/playground/${id}`} variant="contained" color="primary" sx={{ mt: 1 }}>
        Почати проходження
      </Button>

      {sortedReports.map((report) => (
        <Box mt={2} key={report.id}>
          <ReportViewer report={report} />
        </Box>
      ))}
    </Paper>
  );
};
