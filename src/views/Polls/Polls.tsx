import { Paper } from "@mui/material";
import { PollsList } from "~components/PollsTable";

export const Polls = () => {
  return (
    <Paper sx={{ p: 2 }}>
      <PollsList />
    </Paper>
  );
};
