import { Toaster } from 'react-hot-toast';
// CUSTOM LIBs
import { UserContext } from '../lib/context';
import { useUserData } from '../lib/hooks';
// COMPONENTS
import Navbar from '../components/navbar/Navbar';
// STYLES
import '../styles/globals.css';

function MyApp({ Component, pageProps }) {
  const { user, username } = useUserData();

  return (
    <UserContext.Provider value={{ user, username }}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
