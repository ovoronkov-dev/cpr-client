import { collection, DocumentData, getDocs, query, QueryDocumentSnapshot, where } from "firebase/firestore";
import { useEffect, useState } from "react";
import { adminDb } from "~firebase/admin-config";
import { useAuthState } from "react-firebase-hooks/auth";
import { playgroundAuth } from "~firebase/playground-config";

export const useReportDocument = (pollId?: string): [QueryDocumentSnapshot<DocumentData>[], boolean] => {
  const [loading, setLoading] = useState(false);
  const [docs, setDocs] = useState<QueryDocumentSnapshot<DocumentData>[]>([]);
  const [user] = useAuthState(playgroundAuth);

  useEffect(() => {
    let isSubscribed = true;

    if (user && pollId) {
      setLoading(true);

      getDocs(
        query(collection(adminDb, "reports"), where("pollId", "==", pollId), where("userId", "==", user.uid))
      ).then((doc) => {
        if (isSubscribed) {
          setDocs(doc.docs);
          setLoading(false);
        }
      });
    }

    return () => {
      isSubscribed = false;
    };
  }, [user, pollId]);

  return [docs, loading];
};
