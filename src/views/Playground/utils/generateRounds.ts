import { PollVariantModel } from "~core/models";
import { PlagroundRoundFormValues, PlaygroundFormValues } from "../common/schema";
import { shuffle } from "lodash";

export const generateRounds = (variants: PollVariantModel[]): PlaygroundFormValues => {
  const pairs: PlagroundRoundFormValues[] = [];

  for (let i = 0; i < variants.length; i++) {
    for (let j = i + 1; j < variants.length; j++) {
      pairs.push({
        firstIndex: i,
        firstValue: 50,
        secondIndex: j,
        secondValue: 50,
      });
    }
  }

  return { pairs: shuffle(pairs) };
};
