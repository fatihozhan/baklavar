import CartCard from "@/components/cart/cartCard";
import Link from "next/link";
import Inputs from "@/components/input";
import NavigatorBar from "@/components/navigatorBar";
import { AiOutlineMinusSquare } from "react-icons/ai";
import styles from "../styles/cart.module.scss";
import { useSelector } from "react-redux";
import db from "@/utils/db";
import User from "@/models/User";
import { getSession } from "next-auth/react";
import {useState } from "react";
import {turkeyCities} from '@/data/cities'
import axios from "axios";

export default function CartPage({ user }) {
  const cart = useSelector((state) => state.cartSlice.cart);
  const [cities, setCities] = useState(turkeyCities);

  const currentAddress = user?.addresses.find((addr) => addr.active == true);
  const city = cities?.find((city) => city.alan_kodu == currentAddress.city);
  const state = city?.ilceler?.find(
    (ilce) => ilce.ilce_kodu == currentAddress.state
  );
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
                    {cart?.reduce(
                      (prev, item) => prev + item.price * item.qty,
                      0
                    )}
                    ₺
                  </td>
                </tr>
                <tr>
                  <th>Kargo</th>
                  <td>
                    <div>
                        <p>Sabit Fiyat : 20.00₺ </p>
                        <p>
                          Adres :{" "}
                          <b>
                            {" "}
                            {currentAddress
                              ? currentAddress.address1 +
                                " " +
                                state?.ilce_adi +
                                "/" +
                                city?.il_adi
                              : "Türkiye"}
                          </b>
                        </p>

                      <Link href={"/hesabim?address=1"}>
                        <button className={styles.secondary_button}>
                          Adresi Değiştir
                        </button>
                      </Link>
                    </div>
                  </td>
                </tr>
                <tr>
                  <th>Toplam</th>
                  <td>
                    <b>
                      {" "}
                      {cart?.reduce(
                        (prev, item) => prev + item.price * item.qty,
                        0
                      ) + 20.0}{" "}
                      ₺
                    </b>
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

export async function getServerSideProps({ req }) {
  await db.connectDb();
  const session = await getSession({ req });
  const user = await User.findById(session.user.id).lean();
  await db.disconnectDb();
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
