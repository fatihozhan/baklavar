import styles from "@/styles/media.module.scss";
import Image from "next/image";

export default function Media() {
  return (
    <div className={styles.media}>
      <div className={styles.container}>
        {img.map((m, i) => (
          <Image
            src={i == 1 || i == 3 ? `${m}.jpeg` : `${m}.jpg`}
            key={i}
            height="683"
            width={"1024"}
            alt="galeriden resimler"
          />
        ))}
      </div>
    </div>
  );
}

const img = [
  "/images/media/media1",
  "/images/media/media2",
  "/images/media/media3",
  "/images/media/media4",
  "/images/media/media5",
  "/images/media/media6",
];
