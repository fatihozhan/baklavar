import Image from "next/image";
import styles from "./styles.module.scss";

export default function AltKategori({ subCategories }) {
  return (
    <>
      <div className={styles.altKategori}>
        {subCategories.map((category) => (
          <div>
            <Image
              src={`/images/subProducts/${category.img}`}
              height={100}
              width={100}
              alt="product resmi"
            />
            <b>{category.title}</b>
            <p>{category.sub1}</p>
            <p>{category.sub2}</p>
            <p>{category.sub3}</p>
            <p>{category.sub4}</p>
          </div>
        ))}
      </div>
    </>
  );
}
