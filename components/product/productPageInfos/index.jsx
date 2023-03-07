import styles from "@/styles/product.module.scss";
import { useRouter } from "next/router";
import { Rate } from "antd";
import { TiTick } from "react-icons/ti";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { useState } from "react";

export default function ProductInfos() {
  const router = useRouter();
  const [qty, setQty] = useState(1);
  return (
    <>
      <div className={styles.product__infos}>
        <div className={styles.product__infos_title}>
          <h2>Kuru Üzüm Kurusunun Paketlenmişi</h2>
          {router.pathname.includes("/product") && (
            <>
              <Rate defaultValue={3.4} disabled /> <b> (1 Değerlendirme)</b>
            </>
          )}
        </div>
        <div className={styles.product__infos_content}>
          <p>13.00₺</p>
          <p>
            Üzümler çok faydalı çok çok faydalı Lorem ipsum dolor sit amet
            consectetur adipisicing elit. Nostrum tempore vero ab!
          </p>
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
          <span>200 Adet Stokta</span>
          <div className={styles.product__infos_content_footer}>
            <div className={styles.product__infos_content_footer_quantity}>
              <span onClick={() => setQty((prev) => prev>1 ? prev - 1 : 1)}>-</span>
              <span> {qty} </span>
              <span onClick={() => setQty((prev) => prev + 1)}>+</span>
            </div>
            <div className={styles.product__infos_content_footer_buttons}>
              <button className={styles.primary_button}>Sepete Ekle</button>

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
