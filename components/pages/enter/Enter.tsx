import { useContext, useState, useCallback, useEffect } from 'react';
import debounce from 'lodash.debounce';
import {
  auth,
  googleAuthProvider,
  authSignInWithPopup,
  getUsernameDocRef,
  setUserDoc,
  setUsernameDoc,
} from '../../../lib/firebase';
import { UserContext } from '../../../lib/context';

export default function Enter() {
  const { user, username } = useContext(UserContext);

  return (
    <main>
      <h2>Sign in</h2>
      {user ? (
        !username ? (
          <UsernameForm />
        ) : (
          <SignOutButton />
        )
      ) : (
        <SignInButton />
      )}
    </main>
  );
}

// Sign in with Google button
function SignInButton() {
  const signInWithGoogle = async () => {
    await authSignInWithPopup(auth, googleAuthProvider);
  };

  return (
    <button className="btn-google" onClick={signInWithGoogle}>
      <img src={'/google-logo.png'} /> Sign in with Google
    </button>
  );
}

// Sign out button
function SignOutButton() {
  return <button onClick={() => auth.signOut()}>Sign out</button>;
}

// Username Form for the creation of a username for logged in user
function UsernameForm() {
  const [formValue, setFormValue] = useState('');
  const [isValid, setIsValid] = useState(false);
  const [loading, setLoading] = useState(false);

  const { user, username } = useContext(UserContext);

  const onSubmit = async (eventObj) => {
    eventObj.preventDefault();

    console.log('SUBMIT - user:', user);
    console.log('SUBMIT - username:', formValue);
    // Create refs for both documents
    await setUserDoc({
      username: formValue,
      photoURL: user.photoURL,
      displayName: user.displayName,
      uid: user.uid,
    });
    await setUsernameDoc(formValue, user.uid);
  };

  const onChange = (eventObj) => {
    // Force form value types in form to match correct format
    const val = eventObj.target.value.toLowerCase();
    const re = /^(?=[a-zA-Z0-9._]{3,15}$)(?!.*[_.]{2})[^_.].*[^_.]$/;

    // Only set form value if length is < 3 OR it passes regex
    if (val.length < 3) {
      setFormValue(val);
      setLoading(false);
      setIsValid(false);
    }

    if (re.test(val)) {
      setFormValue(val);
      setLoading(true);
      setIsValid(false);
    }
  };

  // Hit the database for username match after each debounced change
  // useCallback is required for debounce to work
  const checkUsername = useCallback(
    debounce(async (username) => {
      if (username.length >= 3) {
        const usernameDocResp = await getUsernameDocRef(username);
        const exists = usernameDocResp.data() ? true : false;
        console.log(
          'checkUsername - usernameDocResp.data():',
          usernameDocResp.data()
        );
        setIsValid(!exists);
        setLoading(false);
      }
    }, 500),
    []
  );

  useEffect(() => {
    checkUsername(formValue);
  }, [formValue]);

  return (
    !username && (
      <section>
        <h3>Choose Username</h3>
        <form onSubmit={onSubmit}>
          <input
            name="username"
            placeholder="username"
            value={formValue}
            onChange={onChange}
          />
          <UsernameMessage
            username={formValue}
            isValid={isValid}
            loading={loading}
          />
          <button type="submit" className="btn-green" disabled={!isValid}>
            Choose
          </button>

          <h3>Debug State</h3>
          <div>
            Username: {formValue}
            <br />
            Loading: {loading.toString()}
            <br />
            Username Valid: {isValid.toString()}
          </div>
        </form>
      </section>
    )
  );
}

function UsernameMessage({ username, isValid, loading }) {
  if (loading) {
    return <p>Checking...</p>;
  } else if (isValid) {
    return <p className="text-success">{username} is available!</p>;
  } else if (username && !isValid) {
    return <p className="text-danger">That username is taken!</p>;
  } else {
    return null;
  }
}
