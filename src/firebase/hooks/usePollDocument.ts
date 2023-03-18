import { FirestoreError } from "firebase/firestore";
import { useEffect, useState } from "react";
import { PollModel } from "~core/models";
import { getPollDocument } from "~firebase/docs/poll-document";

type UsePollDocumentReturnType = [PollModel | null, boolean, FirestoreError | null];

export const usePollDocument = (id?: string): UsePollDocumentReturnType => {
  const [document, setDocument] = useState<PollModel | null>(null);
  const [error, setError] = useState<FirestoreError | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    let isSubscribed = true;

    (async () => {
      if (id) {
        try {
          setLoading(true);

          const snapshot = await getPollDocument(id);
          const snapshotData = snapshot.data();

          if (snapshotData && isSubscribed) {
            setDocument(snapshotData);
          }
        } catch (error) {
          if (isSubscribed) setError(error as FirestoreError);
        } finally {
          if (isSubscribed) setLoading(false);
        }
      }
    })();

    return () => {
      isSubscribed = false;
    };
  }, [id]);

  return [document, loading, error];
};
