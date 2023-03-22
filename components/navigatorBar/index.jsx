import styles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavigatorBar({title}) {
  const router = useRouter();
  const capitalizeFirtLetters = (str) => {
    if (!str) return str;
    let words = str.split(" ");

    // Her kelimenin ilk harfini büyük yap
    words = words.map(word => word.charAt(0).toUpperCase() + word.substring(1));
  
    // Kelimeleri birleştirerek büyük harflendirilmiş metni oluştur
    return words.join(" ");
  };
  return (
    <div className={styles.bar}>
      <div className={styles.container}>
        <div className={styles.bar__top}>
          <Link href="/">Home /</Link>
          {` ${router.pathname.split("/")[1]?.charAt(0).toUpperCase()}` +
            `${router.pathname.split("/")[1]?.substring(1)} `}
          /
          {title ? title :router.query["slug"]
            ? ` ${ capitalizeFirtLetters(router.query["slug"][0].replaceAll("-", " ")) }`
            : router.pathname.split("/")[2]?.charAt(0).toUpperCase()
            ? router.pathname.split("/")[2]?.charAt(0).toUpperCase() +
              router.pathname.split("/")[2]?.substring(1)
            : ""}
          {router.pathname.split("/")[3]
            ? `/ ${
                router.pathname.split("/")[3]?.charAt(0).toUpperCase() +
                router.pathname.split("/")[3]?.substring(1)
              }`
            : ""}
        </div>
        <div className={styles.bar__title}>
          <h2>
            {title ? title : router.query["slug"]
              ? capitalizeFirtLetters(router.query["slug"][0].replaceAll("-", " "))
              : router.pathname.split("/")[3]
              ? router.pathname.split("/")[3].charAt(0).toUpperCase() +
                router.pathname.split("/")[3].substring(1)
              : router.pathname.split("/")[2]
              ? router.pathname.split("/")[2].charAt(0).toUpperCase() +
                router.pathname.split("/")[2].substring(1)
              : router.pathname.split("/")[1]
              ? router.pathname.split("/")[1].charAt(0).toUpperCase() +
                router.pathname.split("/")[1].substring(1)
              : ""}
          </h2>
        </div>
      </div>
    </div>
  );
}
