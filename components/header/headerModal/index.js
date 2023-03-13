import { Button, Modal, Checkbox, Form } from "antd";
import { signIn, signOut } from "next-auth/react";
import { AiOutlineMail, AiOutlineUser } from "react-icons/ai";
import { IoKeyOutline } from "react-icons/io5";
import Link from "next/link";
import { useRef, useState } from "react";
import ModalInput from "./modalInput";
import styles from "./styles.module.scss";
import axios from "axios";
import { toast } from "react-toastify";

export default function HeaderModal({ setIsModalOpen, isModalOpen }) {
  const [tab, setTab] = useState(1);
  const formRef = useRef(null);

  const changeHandler = (e) => {};
  const handleSignIn = async (values) => {
    let options = {
      redirect: false,
      email: values.email,
      password: values.password,
    };
    try {
      const res = await signIn("credentials", options);
      console.log(res);
      if (res.error) return toast.error(res.error);
      toast.success("Giriş Başarılı...");
      setTimeout(() => {
        setIsModalOpen(false);
      }, 1300);
    } catch (error) {
      console.log(error);
    }
  };
  const handleReset = () => {
    formRef.current?.resetFields();
  };
  const handleSubmit = async (values) => {
    try {
      const { data } = await axios.post("/api/auth/signup", { values });
      if (data.user) {
        toast.success(data.message);
        setTab(1);
        handleReset();
      } else {
        toast.error(data.message);
      }
    } catch (error) {
      console.log(error);
    }
  };
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
          <Form layout="vertical" onFinish={handleSignIn}>
            <Form.Item
              rules={[
                {
                  type: "email",
                  message: "Lütfen geçerli bir email giriniz",
                  required: true,
                },
              ]}
              label="Email"
              name={"email"}
            >
              <ModalInput
                icon={<AiOutlineMail />}
                placeholder="Email veya Kullanıcı Adı"
                type="text"
              />
            </Form.Item>
            <Form.Item
              rules={[
                {
                  required: true,
                  message: "Zorunlu Alan",
                },
                {
                  min: 6,
                  message: "Şifreniz en az 6 karakter uzunluğunda olmalıdır.",
                },
              ]}
              label="Şifre"
              name={"password"}
            >
              <ModalInput
                type="password"
                icon={<IoKeyOutline />}
                placeholder="Parola"
              />
            </Form.Item>

            <Checkbox onChange={changeHandler}>Beni Hatırla</Checkbox>

            <footer className={styles.modal__footer}>
              <button
                type="submit"
              >
                Giriş Yap
              </button>
              <Link href="">Şifreni mi unuttun?</Link>
            </footer>
          </Form>
        </div>
        <div style={{ display: `${tab == 1 ? "none" : ""}` }}>
          <Form
            layout="vertical"
            onReset={handleReset}
            onFinish={handleSubmit}
            ref={formRef}
          >
            <Form.Item
              name={"username"}
              label="Kullanıcı Adı"
              rules={[
                { required: true, message: "Kullancı Adı Alanı Zorunludur." },
                {
                  min: 4,
                  message:
                    "Kullanıcı Adınız En Az 4 Karakter Uzunluğunda Olmalıdır.",
                },
              ]}
            >
              <ModalInput
                type={"text"}
                icon={<AiOutlineUser />}
                placeholder="Kullanıcı Adı"
              />
            </Form.Item>
            <Form.Item
              name={"name"}
              rules={[{ required: true, message: "Zorunlu Alan" }]}
              label="Ad Soyad"
            >
              <ModalInput
                type={"text"}
                icon={<AiOutlineUser />}
                placeholder="İsim Soyisim"
              />
            </Form.Item>
            <Form.Item
              label="Email"
              name={"email"}
              rules={[
                { required: true, message: "Zorunlu Alan" },
                { type: "email", message: "Geçerli Bir Email Adresi Giriniz" },
              ]}
            >
              <ModalInput
                type={"text"}
                icon={<AiOutlineMail />}
                placeholder="Email"
                name={"email"}
              />
            </Form.Item>
            <Form.Item
              label="Şifre"
              name={"password"}
              rules={[
                { required: true, message: "Zorunlu Alan" },
                { type: "password" },
                {
                  min: 6,
                  message: "Parolanız en az 6 karakter uzunluğunda olmalıdır.",
                },
              ]}
            >
              <ModalInput
                type={"password"}
                icon={<IoKeyOutline />}
                placeholder="Şifre"
              />
            </Form.Item>
            <footer className={styles.modal__footer}>
              <button>Kaydol</button>
            </footer>
          </Form>
        </div>
      </Modal>
    </div>
  );
}
