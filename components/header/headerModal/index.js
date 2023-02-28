import { Button, Modal, Checkbox } from "antd";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { IoKeyOutline } from "react-icons/io5";
import Link from "next/link";
import { useState } from "react";
import ModalInput from "./modalInput";
import styles from "./styles.module.scss";

export default function HeaderModal({ setIsModalOpen, isModalOpen }) {
  const [tab, setTab] = useState(1);

  const changeHandler = (e) => {};
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
            onClick={() => setTab(1)}
            style={{
              backgroundColor: `${tab != 1 ? "#136450" : ""}`,
              color: `${tab != 1 ? "#fff" : ""}`,
            }}
          >
            Giriş Yap
          </button>
          <button
            onClick={() => setTab(2)}
            style={{
              backgroundColor: `${tab == 1 ? "#136450" : ""}`,
              color: `${tab == 1 ? "#fff" : ""}`,
            }}
          >
            Kaydol
          </button>
        </header>
        <div style={{ display: `${tab != 1 ? "none" : ""}` }}>
          <ModalInput
            icon={<AiOutlineMail />}
            placeholder="Email veya Kullanıcı Adı"
            name={"email"}
            type="text"
            onChange={changeHandler}
          />
          <ModalInput
            name={"password"}
            type="password"
            onChange={changeHandler}
            icon={<IoKeyOutline />}
            placeholder="Parola"
          />
          <Checkbox onChange={changeHandler}>Beni Hatırla</Checkbox>

          <footer className={styles.modal__footer}>
            <button>Giriş Yap</button>
            <Link href="">Şifreni mi unuttun?</Link>
          </footer>
        </div>
        <div style={{ display: `${tab == 1 ? "none" : ""}` }}>
          <ModalInput
            type={"text"}
            icon={<AiOutlineUser />}
            placeholder="Kullanıcı Adı"
            name={"username"}
            onChange={changeHandler}
          />
          <div style={{display : "flex", gap : "10px"}}>

          <ModalInput
            type={"text"}
            icon={<AiOutlineUser />}
            placeholder="İsim"
            name={"firsname"}
            onChange={changeHandler}
          />
          <ModalInput
            type={"text"}
            icon={<AiOutlineUser />}
            placeholder="Soyisim"
            name={"lastname"}
            onChange={changeHandler}
          />
          </div>
          <ModalInput
            type={"text"}
            icon={<AiOutlineMail />}
            placeholder="Email"
            name={"email"}
            onChange={changeHandler}
          />
           <footer className={styles.modal__footer}>
            <button>Kaydol</button>
          </footer>

        </div>
      </Modal>
    </div>
  );
}
