import { Table, TableBody, TableCell, TableHead, TableRow } from "@mui/material";
import { ParsedReport } from "~core/definitions";

interface Props {
  report: ParsedReport;
}

export const PercentageMatrix = ({ report }: Props) => {
  return (
    <Table>
      <TableHead>
        <TableRow>
          <TableCell />
          {Object.keys(report).map((key) => (
            <TableCell key={key}>P{+key + 1}</TableCell>
          ))}
          <TableCell>Σ</TableCell>
          <TableCell>Σ / 100</TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {Object.keys(report).map((key) => (
          <TableRow key={key}>
            <TableCell>P{+key + 1}</TableCell>
            {Object.keys(report[+key]).map((innerKey) => (
              <TableCell key={innerKey}>{report[+key][+innerKey]}</TableCell>
            ))}
            <TableCell>{Object.values(report[+key])}</TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};
