import { ParsedReport } from "~core/definitions";
import { PollReportModel } from "~core/models";

export const parsePercentageMatrix = (report: PollReportModel) => {
  const result: ParsedReport = {};

  report.data.forEach((pair) => {
    if (!result[pair.firstIndex]) result[pair.firstIndex] = { [pair.firstIndex]: 0 };
    result[pair.firstIndex][pair.secondIndex] = pair.firstValue;

    if (!result[pair.secondIndex]) result[pair.secondIndex] = { [pair.secondIndex]: 0 };
    result[pair.secondIndex][pair.firstIndex] = pair.secondValue;
  });

  return result;
};

export const calculateSummaryPercentageMatrix = (parsed: ParsedReport) =>
  Object.keys(parsed).map((key) => Object.values(parsed[+key]).reduce((acc, curr) => acc + curr, 0));

export const calculatePercentageMatrix = (report: PollReportModel) => {
  const summary = calculateSummaryPercentageMatrix(parsePercentageMatrix(report));
  const average = summary.reduce((acc, curr) => acc + curr, 0);

  return summary.map((sum) => (sum / average).toFixed(4));
};

const SAATI_SCALE = [1 / 9, 1 / 8, 1 / 7, 1 / 6, 1 / 5, 1 / 4, 1 / 3, 1 / 2, 1, 2, 3, 4, 5, 6, 7, 8, 9];

const calculate = (value: number) => {
  return SAATI_SCALE[Math.floor(value / 6)];
};

export const parseSaatiMatrix = (report: PollReportModel) => {
  const result: ParsedReport = {};

  report.data.forEach((pair) => {
    if (!result[pair.firstIndex]) result[pair.firstIndex] = { [pair.firstIndex]: 1 };
    result[pair.firstIndex][pair.secondIndex] = calculate(pair.firstValue);

    if (!result[pair.secondIndex]) result[pair.secondIndex] = { [pair.secondIndex]: 1 };
    result[pair.secondIndex][pair.firstIndex] = calculate(pair.secondValue);
  });

  return result;
};

export const calculateRootsSaatiMatrix = (parsed: ParsedReport) => {
  const keys = Object.keys(parsed);
  return keys.map((key) =>
    Math.pow(
      Object.values(parsed[+key]).reduce((acc, curr) => acc * (curr || 1), 1),
      1 / (keys.length - 1)
    )
  );
};

export const calculateSaatiMatrix = (report: PollReportModel) =>
  calculateRootsSaatiMatrix(parseSaatiMatrix(report)).map((r) => r.toFixed(4));

export const parseKMatrix = (report: PollReportModel) => {
  const result: ParsedReport = {};

  report.data.forEach((pair) => {
    if (!result[pair.firstIndex]) result[pair.firstIndex] = { [pair.firstIndex]: 1 };
    result[pair.firstIndex][pair.secondIndex] = calculate(pair.firstValue);

    if (!result[pair.secondIndex]) result[pair.secondIndex] = { [pair.secondIndex]: 1 };
    result[pair.secondIndex][pair.firstIndex] = calculate(pair.secondValue);
  });

  return result;
};

export const calculateRootsKMatrix = (parsed: ParsedReport) => {
  const keys = Object.keys(parsed);
  return keys.map((key) =>
    Math.pow(
      Object.values(parsed[+key]).reduce((acc, curr) => acc * (curr || 1), 1),
      1 / (keys.length - 1)
    )
  );
};

export const calculateKMatrix = (report: PollReportModel) =>
  calculateRootsKMatrix(parseKMatrix(report)).map((r) => r.toFixed(4));

export const parseRatioMatrix = (report: PollReportModel) => {
  const result: ParsedReport = {};

  report.data.forEach((pair) => {
    if (!result[pair.firstIndex]) result[pair.firstIndex] = { [pair.firstIndex]: 1 };
    result[pair.firstIndex][pair.secondIndex] = (pair.firstValue || 1) / (pair.secondValue || 1);

    if (!result[pair.secondIndex]) result[pair.secondIndex] = { [pair.secondIndex]: 1 };
    result[pair.secondIndex][pair.firstIndex] = (pair.secondValue || 1) / (pair.firstValue || 1);
  });

  return result;
};

export const calculateRootsRatioMatrix = (parsed: ParsedReport) => {
  const keys = Object.keys(parsed);
  return keys.map((key) =>
    Math.pow(
      Object.values(parsed[+key]).reduce((acc, curr) => acc * (curr || 1), 1),
      1 / (keys.length - 1)
    )
  );
};

export const calculateRatioMatrix = (report: PollReportModel) =>
  calculateRootsRatioMatrix(parseRatioMatrix(report)).map((r) => r.toFixed(4));

export const parseDifferenceMatrix = (report: PollReportModel) => {
  const result: ParsedReport = {};

  report.data.forEach((pair) => {
    if (!result[pair.firstIndex]) result[pair.firstIndex] = { [pair.firstIndex]: 0 };
    result[pair.firstIndex][pair.secondIndex] = pair.firstValue - pair.secondValue;

    if (!result[pair.secondIndex]) result[pair.secondIndex] = { [pair.secondIndex]: 0 };
    result[pair.secondIndex][pair.firstIndex] = pair.secondValue - pair.firstValue;
  });

  return result;
};

export const calculateDifferenceMatrixValues = (parsed: ParsedReport) => {
  return Object.keys(parsed).map((key) => Object.values(parsed[+key]).reduce((acc, curr) => acc + curr, 0));
};

export const calculateDifferenceMatrix = (report: PollReportModel) =>
  calculateDifferenceMatrixValues(parseDifferenceMatrix(report));
