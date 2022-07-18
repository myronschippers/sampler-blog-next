import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, dbUserSnapshot } from '../lib/firebase';

// Custom hook to read auth record and user profile doc
export function useUserData() {
  const [user] = useAuthState(auth);
  const [username, setUsername] = useState(null);
  console.log('useUserData hook - user', user);

  useEffect(() => {
    // turn off realtime subscription
    let unsubscribe;

    if (user) {
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
