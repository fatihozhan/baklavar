import styles from "./styles.module.scss";
import Image from "next/image";

export default function FromPeopleCard({ comment }) {
  return (
    <div className={styles.card}>
      <Image
        src={comment.img}
        width="150"
        height={150}
        alt={comment.FullName}
      />
      <p>{comment.comment}</p>
      <h4>{comment.fullName}</h4>
    </div>
  );
}
