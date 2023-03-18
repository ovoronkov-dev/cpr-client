import { collection, FirestoreDataConverter } from "firebase/firestore";
import { PollModel } from "~core/models";
import { adminDb } from "~firebase/admin-config";

const converter: FirestoreDataConverter<PollModel> = {
  toFirestore: (model) => model,
  fromFirestore: (snapshot) => snapshot.data() as PollModel,
};

export const getPollsCollection = () => collection(adminDb, "polls").withConverter(converter);
