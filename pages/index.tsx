import styles from '../styles/Home.module.css';
// COMPONENTS
import Loader from '../components/loader/Loader';

export default function Home() {
  return (
    <div className={styles.container}>
      <h1>
        Welcome to <a href="https://nextjs.org">Next.js!</a>
      </h1>

      <Loader show />
    </div>
  );
}
