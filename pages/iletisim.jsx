import { GiLetterBomb } from "react-icons/gi";
import { BiHeadphone } from "react-icons/bi";
import { HiOutlineMapPin } from "react-icons/hi2";
import styles from "@/styles/contact.module.scss";
import { Form, Input } from "antd";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Loader from "@/components/loader";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function Contact({ currentSession }) {
  const [loading, setLoading] = useState(false);
  const formRef = useRef(null);
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios
        .post("/api/messages", { values })
        .then((data) => {
          if (data.data.success) {
            toast.success(data.data.message);
            formRef.current.resetFields();
          }
        })
        .catch((data) => toast.error(data.response.data.message));
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  return (
    <div className={styles.contact}>
      {loading && <Loader />}
      <div className={styles.background}></div>

      <div className={styles.container}>
        <div className={styles.contact__left}>
          <Form
            ref={formRef}
            name="basic"
            initialValues={{
              name: currentSession?.name,
              email: currentSession?.email,
            }}
            onFinish={onFinish}
            layout="vertical"
          >
            <div className={styles.title}>Bize Mesaj Gönder</div>
            <div className={styles.contact__left_top}>
              <div className={styles.contact__left_top_first}>
                <Form.Item
                  label="Ad Soyad"
                  name="name"
                  className={styles.customInput}
                  rules={[
                    { required: true, message: "Lütfen Adınızı Giriniz!" },
                  ]}
                >
                  <Input placeholder={"Ad Soyad"} />
                </Form.Item>
                <Form.Item
                  label="Telefon Numarası"
                  className={styles.customInput}
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Lütfen Telefon Numaranızı Giriniz!",
                    },
                  ]}
                >
                  <Input
                    type="number"
                    maxLength={12}
                    minLength={9}
                    placeholder={"Telefon Numarası"}
                  />
                </Form.Item>
              </div>
              <div className={styles.contact__left_top_second}>
                <Form.Item
                  label="Email"
                  className={styles.customInput}
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Lütfen E posta adresinizi giriniz!",
                    },
                    {
                      type: "email",
                      message: "Lütfen E posta adresinizi giriniz!",
                    },
                  ]}
                >
                  <Input placeholder={"Email"} />
                </Form.Item>
                <Form.Item
                  className={styles.customInput}
                  label="Konu"
                  name="subject"
                  rules={[
                    { required: true, message: "Lütfen Konuyu Giriniz!" },
                  ]}
                >
                  <Input placeholder={"Konu..."} />
                </Form.Item>
              </div>
            </div>
            <div className={styles.contact__left_bottom}>
              <Form.Item
                label="Mesaj"
                name="message"
                rules={[
                  { required: true, message: "Lütfen Mesajınızı Giriniz" },
                ]}
              >
                <Input.TextArea
                  role={8}
                  name="message"
                  rows={5}
                  placeholder="Mesajınız..."
                />
              </Form.Item>
              <button className={styles.primary_button} type="submit">
                Gönder
              </button>
            </div>
          </Form>
        </div>
        <div className={styles.contact__right}>
          <div>
            <GiLetterBomb />
            <h4>Email Adresimiz</h4>
            <p>iletisim@rfcbakliyat.com</p>
            <p>fatihozhan27@gmail.com</p>
          </div>
          <div>
            <HiOutlineMapPin />
            <h4>Adresimiz</h4>
            <p>Nevşehir Üniversitesi Teknopark Fios Yazılım</p>
            <p>Sanayi ve Ticaret A.Ş. Nevşehir / Merkez / Türkiye 50000</p>
          </div>
          <div>
            <BiHeadphone />
            <h4>Telefon Numaramız</h4>
            <p>+905367701238</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  return {
    props: {
      currentSession: session?.user ? JSON.parse(JSON.stringify(session?.user)) : null
    },
  };
}
