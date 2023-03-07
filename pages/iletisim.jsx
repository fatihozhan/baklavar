import Inputs from "@/components/input";
import { GiLetterBomb } from "react-icons/gi";
import { BiHeadphone } from "react-icons/bi";
import { HiOutlineMapPin } from "react-icons/hi2";
import styles from "@/styles/contact.module.scss";
import { Form, Input } from "antd";

export default function Contact() {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <div className={styles.contact}>
      <div className={styles.background}></div>

      <div className={styles.container}>
        <div className={styles.contact__left}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            onFinishFailed={onFinishFailed}
            layout="vertical"
            autoComplete="off"
          >
            <div className={styles.title}>Bize Mesaj Gönder</div>
            <div className={styles.contact__left_top}>
              <div className={styles.contact__left_top_first}>
                <Form.Item
                  label="Ad Soyad"
                  name="fullName"
                  rules={[
                    { required: true, message: "Lütfen Adınızı Giriniz!" },
                  ]}
                >
                  <Inputs placeholder={"Ad Soyad"} name="fullName" />
                </Form.Item>
                <Form.Item
                  label="Telefon Numarası"
                  name="phone"
                  rules={[
                    {
                      required: true,
                      message: "Lütfen Telefon Numaranızı Giriniz!",
                    },
                  ]}
                >
                  <Inputs placeholder={"Telefon Numarası"} name="phone" />
                </Form.Item>
              </div>
              <div className={styles.contact__left_top_second}>
                <Form.Item
                  label="Email"
                  name="email"
                  rules={[
                    {
                      required: true,
                      message: "Lütfen E posta adresinizi giriniz!",
                    },
                  ]}
                >
                  <Inputs placeholder={"Email"} name="email" />
                </Form.Item>
                <Form.Item
                  label="Konu"
                  name="subject"
                  rules={[
                    { required: true, message: "Lütfen Konuyu Giriniz!" },
                  ]}
                >
                  <Inputs placeholder={"Konu..."} name="subject" />
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
              <button className={styles.primary_button}>Gönder</button>
            </div>
          </Form>
        </div>
        <div className={styles.contact__right}>
          <div>
            <GiLetterBomb />
            <h4>Email Adresimiz</h4>
            <p>iletisim@baklavar.com</p>
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
