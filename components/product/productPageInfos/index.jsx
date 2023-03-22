import styles from "@/styles/product.module.scss";
import { useRouter } from "next/router";
import { Rate } from "antd";
import { TiTick } from "react-icons/ti";
import { AiOutlineHeart } from "react-icons/ai";
import { addToCart } from "@/store/cartSlice";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import Loader from "@/components/loader";

export default function ProductInfos({ product, cart, user }) {
  const router = useRouter();
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [currentUser, setCurrentUser] = useState(user);
  const [qty, setQty] = useState(1);
  useEffect(() => {
    setQty(
      product?.stock == 0
        ? 0
        : cart?.find((p) => p._id == product?._id)?.qty
        ? cart.find((p) => p._id == product?._id).qty
        : 1
    );
  }, [product]);
  const addToCartHandler = (product, qty) => {
    const res = dispatch(addToCart({ product, qty }));
    res && toast.success("Sepet güncelleme başarılı");
  };
  const handleWishlist = async (id) => {
    try {
      setLoading(true);
      const values = {
        email: user.email,
        wishlist: true,
        id,
      };
      await axios
        .post("/api/users/updateUser", { values })
        .then((data) => {
          if (data.data.success) {
            toast.success(data.data.message);
            setCurrentUser(data.data.user);
          }
        })
        .catch((data) => {
          toast.error(data.response.data.message);
        });

      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <>
      <div className={styles.product__infos}>
        {loading && <Loader />}
        <div className={styles.product__infos_title}>
          <h2>{product?.name}</h2>
          {router.pathname.includes("/product") && (
            <>
              <Rate
                defaultValue={
                  product?.reviews?.reduce(
                    (prev, item) => item.approved && prev + item.rating,
                    0
                  ) / product?.numReviews
                }
                allowHalf
                disabled
              />
              <b> ({product?.numReviews} Değerlendirme)</b>
            </>
          )}
        </div>
        <div className={styles.product__infos_content}>
          <p>{product?.price.toFixed(2)}₺</p>
          <p>
            {product?.description.length > 40
              ? product?.description.substring(0, 40) + "..."
              : product?.description}
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
          <span style={{ color: ` ${product?.stock == 0 ? "red" : ""}` }}>
            {product?.stock} Adet Stokta
          </span>
          <div className={styles.product__infos_content_footer}>
            <div className={styles.product__infos_content_footer_quantity}>
              <span
                onClick={() =>
                  setQty((prev) =>
                    product?.stock == 0 ? 0 : prev > 1 ? prev - 1 : 1
                  )
                }
              >
                -
              </span>
              <span> {qty} </span>
              <span
                onClick={() => {
                  setQty((prev) => (product?.stock > prev ? prev + 1 : prev));
                }}
              >
                +
              </span>
            </div>
            <div className={styles.product__infos_content_footer_buttons}>
              <button
                onClick={() => addToCartHandler(product, qty)}
                className={styles.primary_button}
                disabled={product?.stock == 0}
              >
                Sepete Ekle
              </button>

              <AiOutlineHeart
                className={
                  currentUser?.wishlist?.find(
                    (wish) => wish.product == product?._id
                  )
                    ? styles.activeWish
                    : ""
                }
                onClick={() => handleWishlist(product?._id)}
              />
            </div>
          </div>
        </div>
        {router.pathname.includes("/product") && (
          <div className={styles.product__infos_footer}>
            <h4>{product?.code}</h4>
            <p>
              <b>Kategori : </b> {product?.category?.name}
            </p>
            <p>
              <b>Etiket : </b>
              {product?.details.map((detail) =>
                detail.name == "tags" ? detail.value + ", " : ""
              )}
            </p>
          </div>
        )}
      </div>
    </>
  );
}
