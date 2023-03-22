import styles from "./styles.module.scss";
import Image from "next/image";
import { Modal } from "antd";
import ProductInfos from "../productPageInfos";
import { useEffect, useState } from "react";

export default function ProductModal({
  productId,
  isModalOpen,
  setIsModalOpen,
  cart,
  products,
  user
}) {
  const [product, setProduct] = useState();
  useEffect(() => {
    setProduct(products?.find((prod) => prod._id == productId));
  }, [productId]);



  return (
    <Modal
      open={isModalOpen}
      footer={false}
      width="900px"
      onCancel={() => setIsModalOpen(false)}
    >
      <div className={styles.productModal}>
        <div className={styles.productModal__left}>
          <Image
            src={product?.images[0]}
            height="400"
            width={"400"}
            alt="Product resmi"
          />
        </div>
        <div className={styles.productModal__right}>
          <ProductInfos user={user} isModalOpen={isModalOpen} product={product} cart={cart} />
        </div>
      </div>
    </Modal>
  );
}
