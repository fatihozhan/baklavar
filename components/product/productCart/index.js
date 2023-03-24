import styles from "./styles.module.scss";
import Link from "next/link";
import { BsHandbag, BsBagCheck } from "react-icons/bs";
import { FiHeart } from "react-icons/fi";
import { HiOutlineMagnifyingGlass } from "react-icons/hi2";
import { Popover, Rate, Tooltip } from "antd";
import Image from "next/image";
import { addToCart, deleteItem } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import axios from "axios";
import { toast } from "react-toastify";
import { useState } from "react";
import { useSession } from "next-auth/react";
import Loader from "@/components/loader";

export default function ProductCard({ product, handleModal, cart, user }) {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const [loading, setLoading] = useState(false);
  const [isWish, setIsWish] = useState(
    user?.wishlist?.find((wish) => wish.product == product._id)
  );
  const handleWishlist = async (id) => {
    try {
      setLoading(true);
      const values = {};
      values.id = id;
      values.email = session?.user.email;
      values.wishlist = true;
      await axios
        .post("/api/users/updateUser", { values })
        .then((data) => {
          toast.success(data.data.message);
          setIsWish(
            data.data.user.wishlist?.find((wish) => wish.product == product._id)
          );
        })
        .catch((data) => toast.error(data.response.data.message));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className={styles.card}>
      {loading && <Loader />}
      <div className={styles.card__img}>
        <Link href={`/product/${product._id}`}>
          <Image
            src={product.images[0]}
            width={200}
            height={200}
            alt="product resmi"
          />
        </Link>
        {cart?.find((p) => p._id == product._id) ? (
          <BsBagCheck
            className={styles.card__img_cartIcon}
            onClick={() => dispatch(deleteItem(product._id))}
          />
        ) : product.stock == 0 ? (
          <Popover
            content={<p>Ürün stoğu tükenmiştir. İstek listesine ekleyiniz.</p>}
          >
            <BsHandbag
              style={{
                backgroundColor: `${product.stock == 0 ? "red" : ""}`,
                color: `${product.stock == 0 ? "#fff" : ""}`,
              }}
              className={styles.card__img_cartIcon}
            />
          </Popover>
        ) : (
          <BsHandbag
            className={styles.card__img_cartIcon}
            onClick={() => dispatch(addToCart({ product }))}
          />
        )}

        <Tooltip title="İstek Listesine Ekle">
          <FiHeart 
            className={styles.card__img_svg1}
            style={{ color: `${isWish ? "red" : ""}` }}
            onClick={() => handleWishlist(product._id)}
          />
        </Tooltip>
        <Tooltip title="İncele">
          <HiOutlineMagnifyingGlass
            onClick={() => handleModal(product._id)}
            className={styles.card__img_svg2}
          />
        </Tooltip>
      </div>
      <div className={styles.card__infos}>
        <Rate
          defaultValue={
            product.reviews.reduce(
              (prev, item) => item.approved && prev + item.rating,
              0
            ) / product.numReviews
          }
          disabled
          allowHalf
        />
        <h4>{product.name}</h4>
        <p> {product.price.toFixed(2)} ₺</p>
        <p>Kilogram Başına</p>
      </div>
    </div>
  );
}
