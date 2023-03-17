import styles from "@/styles/product.module.scss";
import { useRouter } from "next/router";
import { Rate } from "antd";
import { TiTick } from "react-icons/ti";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { addToCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

export default function ProductInfos({ product, cart }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [qty, setQty] = useState(
    cart.find((p) => p.id == product.id)
      ? cart.find((p) => p.id == product.id).qty
      : 1
  );
  useEffect(() => {
    setQty(
      cart.find((p) => p.id == product.id)?.qty
        ? cart.find((p) => p.id == product.id).qty
        : 1
    );
  }, [product]);
  const addToCartHandler = (product, qty) => {
    const res = dispatch(addToCart({ product, qty }));
    res && toast.success("Sepet güncelleme başarılı")
  };

  return (
    <>
      <div className={styles.product__infos}>
        <div className={styles.product__infos_title}>
          <h2>{product.name}</h2>
          {router.pathname.includes("/product") && (
            <>
              <Rate defaultValue={3.4} disabled /> <b> (1 Değerlendirme)</b>
            </>
          )}
        </div>
        <div className={styles.product__infos_content}>
          <p>{product.price.toFixed(2)}₺</p>
          <p>{product.description}</p>
          <ul>
            <li>A Vitamini</li>
            <li>D3 Vitamini</li>
            <li>Kalsiyum</li>
            <li>Magnezyum</li>
            <li>K Vitamini</li>
          </ul>
          <h5>Alergenik</h5>
          <ul>
            <li>
              <TiTick />
              Glutensiz
            </li>
            <li>
              <TiTick />
              Sütsüz
            </li>
            <li>
              <TiTick />
              Yumurtasız
            </li>
          </ul>
          <span>{product.stock} Adet Stokta</span>
          <div className={styles.product__infos_content_footer}>
            <div className={styles.product__infos_content_footer_quantity}>
              <span onClick={() => setQty((prev) => (prev > 1 ? prev - 1 : 1))}>
                -
              </span>
              <span> {qty} </span>
              <span onClick={() => setQty((prev) => prev + 1)}>+</span>
            </div>
            <div className={styles.product__infos_content_footer_buttons}>
              <button
                onClick={() => addToCartHandler(product, qty)}
                className={styles.primary_button}
              >
                Sepete Ekle
              </button>

              <AiOutlineHeart />
            </div>
          </div>
        </div>
        {router.pathname.includes("/product") && (
          <div className={styles.product__infos_footer}>
            <h4>SKU : BAK-025</h4>
            <p>
              <b>Kategori : </b> Baklagil
            </p>
            <p>
              <b>Etiket : </b> Baklagil, sağlık, organik
            </p>
          </div>
        )}
      </div>
    </>
  );
}
