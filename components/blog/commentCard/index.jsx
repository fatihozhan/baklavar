import styles from "./styles.module.scss";
import Image from "next/image";

export default function CommentCard({ comment }) {
  return (
    <div className={styles.card}>
      <div className={styles.card__top}>
        <div className={styles.card__top_l}>
          <Image src={comment.img} height="50" width={50} alt="müşteri resmi" />
          <h5>{comment.name}</h5>
          <span>{comment.date}</span>
        </div>
        <div className={styles.card__top_r}>
          <button>Cevapla</button>
        </div>
      </div>
      <div className={styles.card__bottom}>{comment.comment}</div>
    </div>
  );
}
