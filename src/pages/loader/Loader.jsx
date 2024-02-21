import { ThreeDots as LoaderSpinner } from 'react-loader-spinner';
import styles from './Loader.module.css';

const Loader = () => {
  return (
    <div className={styles.loader}>
      <LoaderSpinner color="#00BFFF" height={50} width={50} />
    </div>
  );
};

export default Loader;
