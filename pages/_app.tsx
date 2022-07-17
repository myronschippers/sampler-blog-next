import { Toaster } from 'react-hot-toast';
import { UserContext } from '../lib/context';
import '../styles/globals.css';
// COMPONENTS
import Navbar from '../components/navbar/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <UserContext.Provider value={{ user: {}, username: 'Shep' }}>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </UserContext.Provider>
  );
}

export default MyApp;
