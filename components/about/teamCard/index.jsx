import styles from "./styles.module.scss";
import Image from "next/image";

export default function TeamCard({ person }) {
  return (
    <div className={styles.person}>
      <Image src={person.img} height={350} width={300} alt={person.name} />
      <div className={styles.person__infos}>
        <h3>{person.name}</h3>
        <p>{person.job}</p>
      </div>
    </div>
  );
}
