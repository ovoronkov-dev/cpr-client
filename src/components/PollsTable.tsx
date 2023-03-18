import { Alert, Button, Paper, Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { useCollection } from "react-firebase-hooks/firestore";
import { Link } from "react-router-dom";
import { PollModel } from "~core/models";
import { getPollsCollection } from "~firebase/collections/polls-collection";

interface PollsListRowProps {
  id: string;
  data: PollModel;
}

const PollsListRow = ({ id, data }: PollsListRowProps) => (
  <TableRow>
    <TableCell>{data.title}</TableCell>
    <TableCell>{data.description}</TableCell>
    <TableCell>{data.variants.length}</TableCell>
    <TableCell>
      <Button size="small" variant="contained" color="secondary" component={Link} to={`/polls/${id}`}>
        Переглянути
      </Button>
    </TableCell>
  </TableRow>
);

export const PollsList = () => {
  const [snapshot, loading, error] = useCollection(getPollsCollection());

  if (error) return <Alert severity="error">{error.message}</Alert>;

  return (
    <Table component={Paper}>
      <TableHead>
        <TableRow>
          <TableCell>Назва</TableCell>
          <TableCell>Опис</TableCell>
          <TableCell>Кількість варіантів</TableCell>
          <TableCell />
        </TableRow>
      </TableHead>
      <TableBody>
        {snapshot?.docs.map((document) => (
          <PollsListRow key={document.id} id={document.id} data={document.data()} />
        ))}
      </TableBody>
    </Table>
  );
};
