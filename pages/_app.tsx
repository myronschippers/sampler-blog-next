import { Toaster } from 'react-hot-toast';
import '../styles/globals.css';
// COMPONENTS
import Navbar from '../components/navbar/Navbar';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <Navbar />
      <Component {...pageProps} />
      <Toaster />
    </>
  );
}

export default MyApp;
