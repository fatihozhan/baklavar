import styles from "./styles.module.scss";
import Image from "next/image";

export default function LifeStyleCard({ data }) {
  return (
    <div className={styles.lifestylecard}>
      <div className={styles.lifestylecard__img}>
        <Image src={data.img} width="70" height={70} alt={data.name} />
      </div>
      <div className={styles.lifestylecard__name}>{data.name}</div>
    </div>
  );
}
