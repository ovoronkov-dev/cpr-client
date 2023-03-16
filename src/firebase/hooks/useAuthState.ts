import { onAuthStateChanged, User } from "firebase/auth";
import { useEffect, useState } from "react";
import { playgroundAuth } from "~firebase/playground-config";

export const useAuthState = (): [User | null, boolean, Error | null] => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<null | Error>(null);

  useEffect(() => {
    const listener = onAuthStateChanged(
      playgroundAuth,
      (user) => {
        setUser(user);
        setLoading(false);
      },
      (error) => {
        setError(error);
        setLoading(false);
      }
    );

    return () => {
      listener();
    };
  }, []);

  return [user, loading, error];
};
