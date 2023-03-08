import CartCard from "@/components/cart/cartCard";
import Link from "next/link";
import Inputs from "@/components/input";
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
          <div className={styles.cart__content_items}>
            <CartCard />
          </div>
          <div className={styles.cart__content_button}>
            <div>
              <Inputs placeholder={"Kupo Kodu..."} />
              <button className={styles.primary_button}>Kupon Uygula</button>
            </div>
            <div>
              <Link href="/shop ">
                <button className={styles.primary_button}>
                  Alışverişe Devam Et
                </button>
              </Link>
            </div>
          </div>
          <div className={styles.cart__content_total}>
            <h3>Sepet Tutarı</h3>
            <table>
              <tbody>
                <tr>
                  <th>Subtotal</th>
                  <td>24.00 ₺</td>
                </tr>
                <tr>
                  <th>Kargo</th>
                  <td>
                    <p>Sabit Fiyat : 20.00₺ </p>
                    <p>
                      Adres : <b>Türkiye</b>{" "}
                    </p>
                    <button>Adresi Değiştir</button>
                  </td>
                </tr>
                <tr>
                  <th>Toplam</th>
                  <td>
                    {" "}
                    <b>44.00₺</b>{" "}
                  </td>
                </tr>
              </tbody>
            </table>
            <Link href="/checkout ">
              <button className={styles.primary_button}>
                Alışverişi Tamamla
              </button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
