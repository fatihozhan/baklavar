import CartCard from "@/components/cart/cartCard";
import Link from "next/link";
import Inputs from "@/components/input";
import NavigatorBar from "@/components/navigatorBar";
import { AiOutlineMinusSquare } from "react-icons/ai";
import styles from "../styles/cart.module.scss";
import { useSelector, useDispatch } from "react-redux";

export default function CartPage() {
  const cart = useSelector((state) => state.cartSlice.cart);
  return (
    <div className={styles.cart}>
      <NavigatorBar />
      <div className={styles.container}>
        <div className={styles.cart__content}>
          {cart?.length == 0 ? (
            <div className={styles.cart__content_empty}>
              <AiOutlineMinusSquare />
              <p>Sepetin şu anda boş.</p>
            </div>
          ) : (
            cart?.map((product, i) => (
              <div key={i} className={styles.cart__content_items}>
                <CartCard product={product} />
              </div>
            ))
          )}
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
                  <td>
                    {cart?.reduce((prev, item) => prev + item.price * item.qty , 0)}
                    ₺
                  </td>
                </tr>
                <tr>
                  <th>Kargo</th>
                  <td>
                    <p>Sabit Fiyat : 20.00₺ </p>
                    <p>
                      Adres : <b>Türkiye</b>
                    </p>
                    <button>Adresi Değiştir</button>
                  </td>
                </tr>
                <tr>
                  <th>Toplam</th>
                  <td>
                    <b> {cart?.reduce((prev, item) => prev + item.price * item.qty , 0) + 20.00} ₺</b>
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
