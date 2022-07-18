import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import {
  auth,
  firestoreDb,
  firestoreDoc,
  dbUserSnapshot,
} from '../lib/firebase';

// Custom hook to read auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
      const ref = firestoreDoc(firestoreDb, user.uid);
      unsubscribe = dbUserSnapshot(user.uid, (userDoc) => {
        setUsername(userDoc.data()?.username);
      });
    } else {
      setUsername(null);
    }

    return unsubscribe;
  }, [user]);

  return { user, username };
}
