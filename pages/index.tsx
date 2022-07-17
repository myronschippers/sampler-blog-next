import toast from 'react-hot-toast';
import styles from '../styles/Home.module.css';
// COMPONENTS
import Loader from '../components/loader/Loader';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <button onClick={() => toast.success('hello toast!')}>Toast Me</button>

      <Loader show />
    </div>
  );
}
