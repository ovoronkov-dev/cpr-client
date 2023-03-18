import { Box, Grid, Slider, styled, Typography } from "@mui/material";
import { ChangeEvent, Fragment, SyntheticEvent } from "react";
import { useController } from "react-hook-form";
import { ImageLoader } from "~components/ImageLoader";
import { PollVariantModel } from "~core/models";

const ImageContainer = styled(Box)({
  width: "100%",
  height: "100%",

  "& img": {
    width: "100%",
    height: "100%",

    objectFit: "cover",
  },
});

interface Props {
  variants: PollVariantModel[];
  currentRound: number;
}

export const PlagroundRound = ({ currentRound, variants }: Props) => {
  const { field } = useController({ name: `pairs.${currentRound}` });

  const handleChange = (_: Event | SyntheticEvent<Element, Event>, value: number | number[]) => {
    field.onChange({
      firstIndex: field.value.firstIndex,
      secondIndex: field.value.secondIndex,
      firstValue: 100 - (value as number),
      secondValue: value,
    });
  };

  if (!field.value) return null;

  return (
    <Fragment>
      <Grid container sx={{ flex: 1 }} alignItems="stretch" spacing={2}>
        <Grid item xs={6} sx={{ height: "100%" }}>
          <ImageContainer>
            <ImageLoader src={variants[field.value.firstIndex]?.url} />
          </ImageContainer>
        </Grid>
        <Grid item xs={6} sx={{ height: "100%" }}>
          <ImageContainer>
            <ImageLoader src={variants[field.value.secondIndex]?.url} />
          </ImageContainer>
        </Grid>
      </Grid>
      <Box sx={{ display: "flex", alignItems: "center", mt: 1 }}>
        <Typography>{field.value.firstValue}%</Typography>
        <Slider defaultValue={50} max={100} min={0} onChangeCommitted={handleChange} />
        <Typography>{field.value.secondValue}%</Typography>
      </Box>
    </Fragment>
  );
};
