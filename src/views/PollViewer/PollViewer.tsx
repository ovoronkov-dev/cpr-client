import { Alert, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { useParams } from "react-router";
import { Link } from "react-router-dom";
import { usePollDocument } from "~firebase/hooks/usePollDocument";
import { useReportDocument } from "~firebase/hooks/useReportDocument";

export const PollViewer = () => {
  const { id } = useParams<{ id: string }>();

  const [document, loading, error] = usePollDocument(id);
  const [reports, reportLoading] = useReportDocument(id);

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

          <Typography>{document.description}</Typography>
        </Grid>
      </Grid>

      {!reportLoading && !reports.length && (
        <Button component={Link} to={`/playground/${id}`} variant="contained" color="primary">
          Почати проходження
        </Button>
      )}
    </Paper>
  );
};
