export interface PollVariantModel {
  title: string;
  url: string;
}

export interface PollModel {
  title: string;
  description: string;
  variants: PollVariantModel[];
}

export interface PollReportPair {
  firstIndex: number;
  secondIndex: number;
  firstValue: number;
  secondValue: number;
}

export interface PollReportModel {
  pollId: string;
  userId: string;
  data: PollReportPair[];
}
