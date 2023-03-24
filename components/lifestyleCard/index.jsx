import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function LifeStyleCard({ data }) {
  return (
    <div className={styles.lifestylecard}>
      <Link href="/shop ">
        <div className={styles.lifestylecard__img}>
          <Image src={data.img} width="70" height={70} alt={data.name} />
        </div>
        <div className={styles.lifestylecard__name}>{data.name}</div>
      </Link>
    </div>
  );
}
