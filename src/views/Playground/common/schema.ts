import { object, array, number, InferType } from "yup";

export const plagroundRoundValidationSchema = object({
  firstIndex: number().required(),
  secondIndex: number().required(),
  firstValue: number().required(),
  secondValue: number().required(),
}).required();

export const playgroundValidationSchema = object({
  pairs: array(plagroundRoundValidationSchema).required(),
});

export type PlagroundRoundFormValues = InferType<typeof plagroundRoundValidationSchema>;

export type PlaygroundFormValues = InferType<typeof playgroundValidationSchema>;
