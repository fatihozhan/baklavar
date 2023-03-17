import styles from "./styles.module.scss";
import { BsHandbag, BsBagCheck } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Rate, Tooltip } from "antd";
import Image from "next/image";
import slugify from "slugify";
import { addToCart, deleteItem } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import ProductModal from "../productModal";

export default function ProductCard({ product, handleModal, cart }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.card}>
      {/* <ProductModal handleModal = {handleModal} /> */}
      <div className={styles.card__img}>
        <Image
          src={product.images[0]}
          width={200}
          height={200}
          alt="product resmi"
        />
        {cart?.find((p) => p.id == product.id) ? (
          <BsBagCheck className={styles.card__img_cartIcon} 
          onClick={() => dispatch(deleteItem(product.id))}
          
          />
        ) : (
          <BsHandbag
            className={styles.card__img_cartIcon}
            onClick={() => dispatch(addToCart({product}))}
          />
        )}

        <Tooltip title="İstek Listesine Ekle">
          <FiHeart className={styles.card__img_svg1} />
        </Tooltip>
        <Tooltip title="İncele">
          <HiOutlineMagnifyingGlass
            onClick={() => handleModal(product.id)}
            className={styles.card__img_svg2}
          />
        </Tooltip>
      </div>
      <div className={styles.card__infos}>
        <Rate defaultValue={product.rate} disabled allowHalf />
        <h4>{product.name}</h4>
        <p> {product.price.toFixed(2) } ₺</p>
        <p>Kilogram Başına</p>
      </div>
    </div>
  );
}
