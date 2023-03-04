import NavigatorBar from "@/components/navigatorBar";
import { TiTick } from "react-icons/ti";
import { products } from "../../pages/index";
import { AiOutlineHeart } from "react-icons/ai";
import { IoIosArrowBack } from "react-icons/io";
import { Rate } from "antd";
import Image from "next/image";
import styles from "../../styles/product.module.scss";
import { useState } from "react";
import { Input, Form } from "antd";
import Inputs from "@/components/input";
import ProductCard from "@/components/productCart";

export default function Product() {
  const [tab, setTab] = useState(1);

  const onFinish = (values) => {
    console.log("Success:", values);
  };
  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };

  return (
    <div className={styles.product}>
      <NavigatorBar />
      <div className={styles.container}>
        <div className={styles.product__general}>
          <div className={styles.product__img}>
            <div className={styles.product__img_top}>
              <Image
                src={"/images/products/grape1.jpg"}
                width="600"
                height={"600"}
                alt="grape"
              />
            </div>
            <div className={styles.product__img_bottom}>
              <Image
                src={"/images/products/grape2.jpg"}
                width="90"
                height={"90"}
                alt="grape"
              />
              <Image
                src={"/images/products/grape3.jpg"}
                width="90"
                height={"90"}
                alt="grape"
              />
              <Image
                src={"/images/products/grape4.jpg"}
                width="90"
                height={"90"}
                alt="grape"
              />
            </div>
          </div>
          <div className={styles.product__infos}>
            <div className={styles.product__infos_title}>
              <h2>Kuru Üzüm Kurusunun Paketlenmişi</h2>
              <Rate defaultValue={3.4} disabled /> <b> (1 Değerlendirme)</b>
            </div>
            <div className={styles.product__infos_content}>
              <p>13.00₺</p>
              <p>
                Üzümler çok faydalı çok çok faydalı Lorem ipsum dolor sit amet
                consectetur adipisicing elit. Nostrum tempore vero ab!
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
              <span>200 Adet Stokta</span>
              <div className={styles.product__infos_content_footer}>
                <div className={styles.product__infos_content_footer_quantity}>
                  <span>-</span>
                  <span>1</span>
                  <span>+</span>
                </div>
                <div className={styles.product__infos_content_footer_buttons}>
                  <button className={styles.primary_button}>Sepete Ekle</button>

                  <AiOutlineHeart />
                </div>
              </div>
            </div>
            <div className={styles.product__infos_footer}>
              <h4>SKU : BAK-025</h4>
              <p>
                <b>Kategori : </b> Baklagil
              </p>
              <p>
                <b>Etiket : </b> Baklagil, sağlık, organik
              </p>
            </div>
          </div>
        </div>
        <div className={styles.product__details}>
          <div className={styles.product__details_buttons}>
            <button
              className={`${tab == 1 ? styles.activeTab : ""}`}
              onClick={() => setTab(1)}
            >
              Açıklama
            </button>
            <button
              className={`${tab == 2 ? styles.activeTab : ""}`}
              onClick={() => setTab(2)}
            >
              Ek Bilgiler
            </button>
            <button
              className={`${tab == 3 ? styles.activeTab : ""}`}
              onClick={() => setTab(3)}
            >
              Yorumlar (1)
            </button>
          </div>
          {tab == 1 && (
            <div className={styles.product__details_description}>
              Lorem, ipsum dolor sit amet consectetur adipisicing elit.
              Voluptatem adipisci, consequuntur nostrum totam quos eaque quas
              amet? In provident fugiat, ipsum minima similique eos animi id ab
              facilis cum nobis earum aut, eaque voluptatem aliquam ex molestias
              doloremque amet excepturi! Et suscipit voluptas asperiores
              voluptatum modi totam illum fugiat id officiis, eaque laboriosam
              perspiciatis! Lorem ipsum dolor sit amet consectetur adipisicing
              elit. Laboriosam a obcaecati pariatur quibusdam, sapiente eveniet
              asperiores perspiciatis vitae esse velit itaque expedita tempore!
            </div>
          )}
          {tab == 2 && (
            <div className={styles.product__details_additional}>
              <table>
                <tbody>
                  <tr>
                    <th>Renk</th>
                    <td>Yeşil, Sarı, Mavi</td>
                  </tr>
                  <tr>
                    <th>Ağırlık</th>
                    <td>0.5 Kg, 1 Kg, 2 Kg </td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}
          {tab == 3 && (
            <div className={styles.product__details_reviews}>
              <div className={styles.product__details_reviews_comment}>
                <Image
                  src={"/images/customer/customer1.jpeg"}
                  height="50"
                  width={50}
                  alt="customer resmi"
                />
                <div className={styles.product__details_reviews_comment_info}>
                  <Rate disabled defaultValue={3.4} />
                  <div>
                    <h4>Resul ÖZTÜRK</h4>
                    <span> - Salı 6, 2023 </span>
                  </div>
                  <p>Çok iyi ürün!</p>
                </div>
              </div>
              <div className={styles.product__details_reviews_form}>
                <h4>Bir yorum da sen ekle!</h4>
                <p>
                  E mail adresin yayınlanmayacaktır. Zorunlu alanlar * ile
                  işaretlenmiştir.
                </p>
                <h5>
                  <b> * </b> Puanın :{" "}
                </h5>
                <Rate defaultValue={4.5} />
                <Form
                  name="review"
                  initialValues={{
                    remember: true,
                  }}
                  onFinish={onFinish}
                  onFinishFailed={onFinishFailed}
                  autoComplete="off"
                  layout="vertical"
                >
                  <Form.Item
                    label="Review"
                    name="review"
                    rules={[
                      {
                        required: true,
                        message: "Lütfen yorumunuzu giriniz",
                      },
                    ]}
                  >
                    <Input.TextArea rows={4} />
                  </Form.Item>

                  <Form.Item
                    label="Name"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Lütfen adınızı giriniz!",
                      },
                    ]}
                  >
                    <Inputs type="text" name={"name"} />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Lütfen Emailinizi giriniz!",
                      },
                    ]}
                  >
                    <Inputs type="text" name={"email"} />
                  </Form.Item>

                  <Form.Item
                    wrapperCol={{
                      offset: 8,
                      span: 16,
                    }}
                  >
                    <div
                      className={styles.product__details_reviews_form_button}
                    >
                      <button
                        type="primary"
                        className={styles.primary_button}
                        htmlType="submit"
                      >
                        Gönder
                      </button>
                    </div>
                  </Form.Item>
                </Form>
              </div>
            </div>
          )}
        </div>
        <div className={styles.product__related}>
          <div className={styles.product__related_title}>
            <h2>Benzer Ürünler</h2>
          </div>
          <div className={styles.product__related_content}>
            {products.map((product, i) => (
              <ProductCard key={i} product={product} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
