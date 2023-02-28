import styles from "./styles.module.scss";
import { BsHandbag } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Rate } from "antd";
import Image from "next/image";

export default function ProductCard({product}) {

  return (
    <div className={styles.card}>
      <div className={styles.card__img}>
        <Image
          src={product.image}
          width={200}
          height={200}
          alt="product resmi"
        />
        <BsHandbag className={styles.card__img_cartIcon} />
        <FiHeart className={styles.card__img_svg1}/>
        <HiOutlineMagnifyingGlass className={styles.card__img_svg2}/>
      </div>
      <div className={styles.card__infos}>
        <Rate defaultValue={product.rate} disabled allowHalf />
        <h4>{product.title}</h4>
        <p> {product.price} ₺</p>
        <p>Kilogram Başına</p>
      </div>
    </div>
  );
}
