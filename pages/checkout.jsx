import Inputs from "@/components/input";
import styles from "@/styles/checkout.module.scss";
import { Checkbox, Form, Input, Radio, Select } from "antd";
import Image from "next/image";
import { useState } from "react";
import { RiCoupon3Line } from "react-icons/ri";

export default function Checkout() {
  const [coupontoggle, setCoupontoggle] = useState(false);
  const [diffaddrtoggle, setDiffaddrtoggle] = useState(false);
  const [value, setValue] = useState(1);
  const onChange = (e) => {
    setValue(e.target.value);
  };
  return (
    <div className={styles.checkout}>
      <div className={styles.container}>
        <div className={styles.checkout__coupon}>
          <RiCoupon3Line />
          <p>Kuponun mu var?</p>
          <span onClick={() => setCoupontoggle(!coupontoggle)}>
            Buraya tıkla ve kupon kodunu gir
          </span>
        </div>
        {coupontoggle && (
          <div className={styles.checkout__couponContent}>
            <div>
              <p>Eğer kuponun varsa aşağıdan uygulayabilirsin.</p>
            </div>
            <div>
              <Inputs placeholder={"Kupon Kod"} />
              <button className={styles.primary_button}>Kupon Uygula</button>
            </div>
          </div>
        )}
        <div className={styles.checkout__wrapper}>
          <div className={styles.checkout__billing}>
            <h3>Fatura Detayları</h3>
            <div>
              <Form layout="vertical">
                <div>
                  <Form.Item
                    label="Adınız"
                    name={"name"}
                    rules={[
                      { required: true, message: "Lütfen adınızı giriniz." },
                    ]}
                  >
                    <Inputs placeholder={"Adınız"} name="name" />
                  </Form.Item>
                  <Form.Item
                    label="Soyadınız"
                    name={"surname"}
                    rules={[
                      { required: true, message: "Lütfen soyadınızı giriniz." },
                    ]}
                  >
                    <Inputs placeholder={"Soyadınız"} name="surname" />
                  </Form.Item>
                </div>
                <Form.Item label="Şirket Adı" name={"company"}>
                  <Inputs placeholder={"Şirket Adı"} name="company" />
                </Form.Item>
                <Form.Item
                  label="Ülke"
                  name={"country"}
                  rules={[
                    {
                      required: true,
                      message: "Lütfen yaşadığınız ülkeyi giriniz.",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="turkey">Türkiye</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Cadde"
                  name={"street"}
                  rules={[{ required: true, message: "Caddenizi giriniz." }]}
                >
                  <Inputs
                    style={{ marginTop: "20px" }}
                    placeholder={"Cadde adı ve Kapı No"}
                    name="street"
                  />
                  <Inputs placeholder={"Apartman adı"} name="apartment" />
                </Form.Item>
                <Form.Item
                  label="Posta Kodu"
                  name={"postcode"}
                  rules={[{ required: true, message: "Posta Kodunu giriniz." }]}
                >
                  <Inputs placeholder={"Posta Kodu"} name="postcode" />
                </Form.Item>
                <Form.Item
                  label="Şehir"
                  name={"province"}
                  rules={[
                    {
                      required: true,
                      message: "Lütfen yaşadığınız ili giriniz.",
                    },
                  ]}
                >
                  <Select>
                    <Select.Option value="nevsehir">Nevşehir</Select.Option>
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Telefon No"
                  name={"cellphone"}
                  rules={[
                    { required: true, message: "Telefon numaranızı giriniz." },
                  ]}
                >
                  <Inputs placeholder={"Telefon Numarası"} name="cellphone" />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name={"email"}
                  rules={[
                    { required: true, message: "Email adresinizi giriniz." },
                  ]}
                >
                  <Inputs placeholder={"Email"} name="email" />
                </Form.Item>
              </Form>
            </div>
          </div>
          <div className={styles.checkout__address}>
            <Checkbox
              className={styles.checkbox}
              onClick={() => setDiffaddrtoggle(!diffaddrtoggle)}
            >
              <h3>Başka bir adrese gönder</h3>
            </Checkbox>
            {diffaddrtoggle && (
              <div className={styles.checkout__address_toggle}>
                <div>
                  <Form layout="vertical">
                    <div>
                      <Form.Item
                        label="Adınız"
                        name={"addrname"}
                        rules={[
                          {
                            required: true,
                            message: "Lütfen adınızı giriniz.",
                          },
                        ]}
                      >
                        <Inputs placeholder={"Adınız"} name="addrname" />
                      </Form.Item>
                      <Form.Item
                        label="Soyadınız"
                        name={"addrsurname"}
                        rules={[
                          {
                            required: true,
                            message: "Lütfen soyadınızı giriniz.",
                          },
                        ]}
                      >
                        <Inputs placeholder={"Soyadınız"} name="addrsurname" />
                      </Form.Item>
                    </div>
                    <Form.Item label="Şirket Adı" name={"addrcompany"}>
                      <Inputs placeholder={"Şirket Adı"} name="addrcompany" />
                    </Form.Item>
                    <Form.Item
                      label="Ülke"
                      name={"addrcountry"}
                      rules={[
                        {
                          required: true,
                          message: "Lütfen yaşadığınız ülkeyi giriniz.",
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option value="turkey">Türkiye</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Cadde"
                      name={"addrstreet"}
                      rules={[
                        { required: true, message: "Caddenizi giriniz." },
                      ]}
                    >
                      <Inputs
                        style={{ marginTop: "20px" }}
                        placeholder={"Cadde adı ve Kapı No"}
                        name="street"
                      />
                    </Form.Item>
                    <Form.Item label="Apartman Adı">
                      <Inputs
                        placeholder={"Apartman adı"}
                        name="addrapartment"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Posta Kodu"
                      name={"addrpostcode"}
                      rules={[
                        { required: true, message: "Posta Kodunu giriniz." },
                      ]}
                    >
                      <Inputs placeholder={"Posta Kodu"} name="addrpostcode" />
                    </Form.Item>
                    <Form.Item
                      label="Şehir"
                      name={"addrprovince"}
                      rules={[
                        {
                          required: true,
                          message: "Lütfen yaşadığınız ili giriniz.",
                        },
                      ]}
                    >
                      <Select>
                        <Select.Option value="nevsehir">Nevşehir</Select.Option>
                      </Select>
                    </Form.Item>
                    <Form.Item
                      label="Telefon No"
                      name={"addrcellphone"}
                      rules={[
                        {
                          required: true,
                          message: "Telefon numaranızı giriniz.",
                        },
                      ]}
                    >
                      <Inputs
                        placeholder={"Telefon Numarası"}
                        name="addrcellphone"
                      />
                    </Form.Item>
                    <Form.Item
                      label="Email"
                      name={"addremail"}
                      rules={[
                        {
                          required: true,
                          message: "Email adresinizi giriniz.",
                        },
                      ]}
                    >
                      <Inputs placeholder={"Email"} name="addremail" />
                    </Form.Item>
                  </Form>
                </div>
              </div>
            )}
            <div className={styles.checkout__address_notes}>
              <Form layout="vertical">
                <Form.Item label="Sipariş Notları">
                  <Input.TextArea
                    rows={4}
                    placeholder={"Siparişiniz ile ilgili özel notlar"}
                  />
                </Form.Item>
              </Form>
            </div>
          </div>
        </div>
        <div className={styles.checkout__summary}>
          <h3>Siparişiniz</h3>
          <table>
            <thead>
              <tr>
                <th> Domatesler Domatesler 10 Numara Domatesler </th>
                <td> 24.00 ₺ </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Subtotal </th>
                <td> 24.00 ₺ </td>
              </tr>
              <tr>
                <th> Kargolama </th>
                <td>
                  Sabit Fiyat : <b> 20.00 ₺ </b>
                </td>
              </tr>
              <tr>
                <th> Total </th>
                <td> 44.00 ₺ </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.checkout__payment}>
          <Radio.Group onChange={onChange} value={value}>
            <div>
              <Radio value={1}>Kredi Kartı ile Ödeme</Radio>
            </div>
            <div>
              <Radio value={2}>Kapıda Ödeme</Radio>
            </div>
            <div>
              <Radio value={3}>
                PayPal
              </Radio>
            </div>
          </Radio.Group>
          <button className={styles.primary_button}>Sipariş Ver</button>
        </div>
      </div>
    </div>
  );
}
