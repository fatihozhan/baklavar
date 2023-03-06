import styles from "./styles.module.scss";
import Link from "next/link";
import Image from "next/image";

export default function BlogCard({ article }) {
  return (
    <div className={styles.blogCard}>
      <div className={styles.blogCard__img}>
        <Image
          src={`${article.img}.jpg`}
          height="300"
          width="800"
          alt={article.title}
        />
      </div>
      <div className={styles.blogCard__content}>
        <p>{article.date}</p>
        <h3>{article.title}</h3>
        <p>{article.content.substring(0, 200)}...</p>
        <Link href={`/blog/${article.slug}`}>
          <button className={styles.primary_button}>Oku</button>
        </Link>
      </div>
    </div>
  );
}
