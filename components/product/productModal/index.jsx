import styles from "./styles.module.scss";
import Image from "next/image";
import { Modal } from "antd";
import { useState } from "react";
import ProductInfos from "../productPageInfos";

export default function ProductModal({ product, isModalOpen, setIsModalOpen }) {
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Modal
      open={isModalOpen}
      footer={false}
      width="900px"
      onCancel={handleCancel}
    >
      <div className={styles.productModal}>
        <div className={styles.productModal__left}>
          <Image
            src={"/images/products/grapes.jpg"}
            height="400"
            width={"400"}
            alt="Product resmi"
          />
        </div>
        <div className={styles.productModal__right}>
          <ProductInfos />
        </div>
      </div>
    </Modal>
  );
}
