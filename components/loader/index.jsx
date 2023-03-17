import styles from "./styles.module.scss";
import { PacmanLoader } from "react-spinners";

export default function Loader() {
  return (
    <div className={styles.loader}>
      <PacmanLoader color="#ffba41" />
    </div>
  );
}
