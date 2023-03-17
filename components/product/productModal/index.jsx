import styles from "./styles.module.scss";
import Image from "next/image";
import { Modal } from "antd";
import { products } from "@/pages/index";
import ProductInfos from "../productPageInfos";

export default function ProductModal({
  productId,
  isModalOpen,
  setIsModalOpen,
  cart,
}) {
  const product = products.find((prod) => prod.id == productId);

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
          <ProductInfos product={product} cart={cart} />
        </div>
      </div>
    </Modal>
  );
}
