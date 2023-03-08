import styles from "./styles.module.scss";
import Image from "next/image";
import { GrClose } from "react-icons/gr";

export default function CartCard() {
  return (
    <div className={styles.card}>
      <div className={styles.card__left}>
        <GrClose />
        <Image
          src={"/images/products/tomatoes.jpg"}
          height="90"
          width={"90"}
          alt="ürün resmi"
        />
        <h4>Domatesler, domatesler on numara domatesler</h4>
      </div>
      <div className={styles.card__right}>
        <p> 12.00 ₺ / adet </p>
        <div>
          <span>-</span>
          <span>2</span>
          <span>+</span>
        </div>
        <p> Total : 24.00 ₺ </p>
      </div>
    </div>
  );
}
