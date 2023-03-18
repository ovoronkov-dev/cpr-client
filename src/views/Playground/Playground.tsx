import { Alert, Box, Button, CircularProgress, Grid, Paper, Typography } from "@mui/material";
import { useNavigate, useParams } from "react-router";
import { usePollDocument } from "~firebase/hooks/usePollDocument";
import { useForm, useFieldArray, FormProvider } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { PlaygroundFormValues, playgroundValidationSchema } from "./common/schema";
import { useEffect, useState } from "react";
import { generateRounds } from "./utils/generateRounds";
import { PlagroundRound } from "./components/Round";
import { addDoc, collection } from "firebase/firestore";
import { adminDb } from "~firebase/admin-config";
import { useAuthState } from "~firebase/hooks/useAuthState";

export const Playground = () => {
  const { id } = useParams<{ id: string }>();

  const navigate = useNavigate();
  const [user] = useAuthState();
  const [document, loading, error] = usePollDocument(id);
  const [currentRound, setCurrentRound] = useState(0);

  const form = useForm<PlaygroundFormValues>({
    resolver: yupResolver(playgroundValidationSchema),
  });

  useEffect(() => {
    if (document) {
      form.reset(generateRounds(document.variants));
    }
  }, [document]);

  const { fields } = useFieldArray({ control: form.control, name: "pairs" });

  const handleNext = () => setCurrentRound((round) => round + 1);

  const handlePrev = () => setCurrentRound((round) => round - 1);

  const handleSubmit = async () => {
    const values = form.getValues();

    await addDoc(collection(adminDb, "reports"), {
      pollId: id,
      userId: user?.uid,
      data: values.pairs,
    });

    navigate(`/reports/${id}`);
  };

  if (error) return <Alert severity="error">{error.message}</Alert>;

  if (loading || !document) return <CircularProgress size={60} />;

  return (
    <FormProvider {...form}>
      <Box sx={{ display: "flex", flex: 1, flexDirection: "column", overflow: "visible" }}>
        {fields.map((field, index) => (
          <Box key={field.id} hidden={index !== currentRound}>
            <PlagroundRound currentRound={index} variants={document.variants} />
          </Box>
        ))}

        <Paper sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", p: 2, mt: 1 }}>
          <Typography fontWeight="bold">
            {currentRound + 1} / {fields.length}
          </Typography>

          <Typography>Що краще?</Typography>

          <Box>
            <Button variant="contained" color="primary" disabled={!currentRound} onClick={handlePrev} sx={{ mr: 1 }}>
              Назад
            </Button>

            {currentRound < fields.length - 1 ? (
              <Button variant="contained" color="primary" onClick={handleNext}>
                Далі
              </Button>
            ) : (
              <Button variant="contained" color="primary" onClick={handleSubmit}>
                Завершити
              </Button>
            )}
          </Box>
        </Paper>
      </Box>
    </FormProvider>
  );
};
