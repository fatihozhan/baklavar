import styles from "./styles.module.scss";
import Link from "next/link";
import { useRouter } from "next/router";

export default function NavigatorBar() {
  const router = useRouter();
  return (
    <div className={styles.bar}>
      <div className={styles.container}>
        <div className={styles.bar__top}>
          <Link href="/">Home /</Link>
          {` ${router.pathname.split("/")[1]?.charAt(0).toUpperCase()}` +
            `${router.pathname.split("/")[1]?.substring(1)} `}
          /
          {router.query["slug"]
            ? router.query["slug"] : router.pathname.split("/")[2]?.charAt(0).toUpperCase()
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
            {router.query["slug"]
              ? router.query["slug"]
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
