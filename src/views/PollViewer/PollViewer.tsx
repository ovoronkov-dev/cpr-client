import { Alert, Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { ReportViewer } from "~components/ReportViewer";
import { usePollDocument } from "~firebase/hooks/usePollDocument";
import { useReportDocument } from "~firebase/hooks/useReportDocument";

export const PollViewer = () => {
  const { id } = useParams<{ id: string }>();

  const [document, loading, error] = usePollDocument(id);
  const [reports] = useReportDocument(id);

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

      {reports.map((report) => (
        <Box mt={2} key={report.id}>
          <ReportViewer report={report.data() as any} />
        </Box>
      ))}
    </Paper>
  );
};
