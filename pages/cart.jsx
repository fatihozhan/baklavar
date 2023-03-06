import NavigatorBar from "@/components/navigatorBar";
import { AiOutlineMinusSquare } from "react-icons/ai";
import styles from "../styles/cart.module.scss";

export default function CartPage() {
  return (
    <div className={styles.cart}>
      <NavigatorBar />
      <div className={styles.container}>
        <div className={styles.cart__content}>
          <div className={styles.cart__content_empty}>
            <AiOutlineMinusSquare />
            <p>Sepetin şu anda boş.</p>
          </div>
          <div className={styles.cart__content_button}>
            <button className={styles.primary_button}>
              Alışverişe Devam Et
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
