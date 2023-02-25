import { Button, Modal, Input } from "antd";
import Link from "next/link";
import { useState } from "react";
import styles from "./styles.module.scss";

export default function HeaderModal({ setIsModalOpen, isModalOpen }) {
  const [tab, setTab] = useState(1);
  return (
    <div>
      <Modal
        className={styles.modal}
        title=""
        open={isModalOpen}
        onOk={() => setIsModalOpen(false)}
        style={{ fontFamily: "Space Grotesk" }}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <header className={styles.modal__header}>
          <button
          onClick={()=> setTab(1)}
            style={{
              backgroundColor: `${tab != 1 ? "#136450" : ""}`,
              color: `${tab != 1 ? "#fff" : ""}`,
            }}
          >
            Kaydol
          </button>
          <button
          onClick={()=> setTab(2)}

            style={{
              backgroundColor: `${tab == 1 ? "#136450" : ""}`,
              color: `${tab == 1 ? "#fff" : ""}`,
            }}
          >
            Giriş Yap
          </button>
        </header>
        <div style={{ display: `${tab != 1 ? "none" : ""}` }}>


            
          <footer className={styles.modal__footer}>
            <button>Giriş Yap</button>
            <Link href="">Şifreni mi unuttun?</Link>
          </footer>
        </div>
      </Modal>
    </div>
  );
}
