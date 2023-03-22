import styles from "./styles.module.scss";
import Image from "next/image";
import { GrClose } from "react-icons/gr";
import { useDispatch, useSelector } from "react-redux";
import { increaseQty, descreaseQty, deleteItem } from "@/store/cartSlice";

export default function CartCard({ product }) {
  const dispatch = useDispatch();
  return (
    <div className={styles.card}>
      <div className={styles.card__left}>
        <GrClose onClick={() => dispatch(deleteItem(product._id))} />
        <Image
          src={product.images[0]}
          height="90"
          width={"90"}
          alt="ürün resmi"
        />
        <h4>{product.name}</h4>
      </div>
      <div className={styles.card__right}>
        <p> {product.price.toFixed(2)} ₺ / adet </p>
        <div>
          <span onClick={() => dispatch(descreaseQty(product._id))}>-</span>
          <span> {product.qty} </span>
          <span onClick={() => product.stock > product.qty && dispatch(increaseQty(product._id))}>+</span>
        </div>
        <p> Total : {(product.price * product.qty).toFixed(2)} ₺ </p>
      </div>
    </div>
  );
}
