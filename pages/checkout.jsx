import User from "@/models/User";
import styles from "@/styles/checkout.module.scss";
import db from "@/utils/db";
import { Checkbox, Form, Input, Radio, Select } from "antd";
import axios from "axios";
import { getSession } from "next-auth/react";
import {useState } from "react";
import { RiCoupon3Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import {turkeyCities} from '@/data/cities'
import {countries as allCountries} from '@/data/countries'
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";


export default function Checkout({ user }) {
  const [coupontoggle, setCoupontoggle] = useState(false);
  const [diffaddrtoggle, setDiffaddrtoggle] = useState(false);
  const [ilce, setIlce] = useState();
  const [payment, setPayment] = useState("");
  const [countries, setCountries] = useState(allCountries);
  const [cities, setCities] = useState(turkeyCities);
  const cart = useSelector((state) => state.cartSlice.cart);
  const activeAddress = user.addresses.find((addr) => addr.active);

  
  const city = cities?.find((city) => city.alan_kodu == activeAddress.city);
  const state = city?.ilceler.find((c) => c.ilce_kodu == activeAddress.state);
  const cityHandle = (e) => {
    setIlce(cities?.find((c) => c.alan_kodu == e));
  };
  const handlePayment = (e) => {
    setPayment(e);
  };

  const initialValues = {
    name: activeAddress ? activeAddress.firstName : "",
    surname: activeAddress ? activeAddress.lastName : "",
    country: activeAddress.country ? activeAddress.country : "TR",
    street: activeAddress ? activeAddress.address1 : "",
    province: activeAddress.city ? activeAddress.city : "",
    ilce: activeAddress.state ? activeAddress.state : "",
    postcode: activeAddress ? activeAddress.zipCode : "",
    cellphone: activeAddress ? activeAddress.phoneNumber : "",
    email: activeAddress ? user.email : "",
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
              <Input placeholder={"Kupon Kod"} />
              <button className={styles.primary_button}>Kupon Uygula</button>
            </div>
          </div>
        )}
        <div className={styles.checkout__wrapper}>
          <div className={styles.checkout__billing}>
            <h3>Fatura Detayları</h3>
            <div>
              <Form layout="vertical" initialValues={initialValues}>
                <div>
                  <Form.Item
                    label="Adınız"
                    name={"name"}
                    rules={[
                      { required: true, message: "Lütfen adınızı giriniz." },
                    ]}
                  >
                    <Input placeholder={"Adınız"} />
                  </Form.Item>
                  <Form.Item
                    label="Soyadınız"
                    name={"surname"}
                    rules={[
                      { required: true, message: "Lütfen soyadınızı giriniz." },
                    ]}
                  >
                    <Input placeholder={"Soyadınız"} />
                  </Form.Item>
                </div>
                <Form.Item label="Şirket Adı" name={"company"}>
                  <Input placeholder={"Şirket Adı"} />
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
                  <Select className={styles.select}>
                    {countries?.map((country, i) => (
                      <Select.Option key={i} value={country?.code}>
                        {country?.name}
                      </Select.Option>
                    ))}
                  </Select>
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
                  <Select className={styles.select} onChange={cityHandle}>
                    {cities.map((city, i) => (
                      <Select.Option key={i} value={city?.alan_kodu}>
                        {city?.il_adi}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="İlçe"
                  name={"ilce"}
                  rules={[
                    {
                      required: true,
                      message: "Lütfen yaşadığınız ilce giriniz.",
                    },
                  ]}
                >
                  <Select className={styles.select}>
                    {ilce?.ilceler.map((ilce, i) => (
                      <Select.Option key={i} value={ilce?.ilce_kodu}>
                        {ilce?.ilce_adi}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>

                <Form.Item
                  label="Posta Kodu"
                  name={"postcode"}
                  rules={[{ required: true, message: "Posta Kodunu giriniz." }]}
                >
                  <Input placeholder={"Posta Kodu"} />
                </Form.Item>
                <Form.Item label="Apartman Adı" name={"apartman"}>
                  <Input placeholder={"Apartman adı"} />
                </Form.Item>

                <Form.Item
                  label="Telefon No"
                  name={"cellphone"}
                  rules={[
                    { required: true, message: "Telefon numaranızı giriniz." },
                  ]}
                >
                  <Input placeholder={"Telefon Numarası"} />
                </Form.Item>
                <Form.Item
                  label="Email"
                  name={"email"}
                  rules={[
                    { required: true, message: "Email adresinizi giriniz." },
                  ]}
                >
                  <Input placeholder={"Email"} />
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
                        <Input placeholder={"Adınız"} name="addrname" />
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
                        <Input placeholder={"Soyadınız"} name="addrsurname" />
                      </Form.Item>
                    </div>
                    <Form.Item label="Şirket Adı" name={"addrcompany"}>
                      <Input placeholder={"Şirket Adı"} name="addrcompany" />
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
                      <Select className={styles.select}>
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
                      <Input
                        style={{ marginTop: "20px" }}
                        placeholder={"Cadde adı ve Kapı No"}
                        name="street"
                      />
                    </Form.Item>
                    <Form.Item label="Apartman Adı">
                      <Input
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
                      <Input placeholder={"Posta Kodu"} name="addrpostcode" />
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
                      <Select className={styles.select}>
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
                      <Input
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
                      <Input placeholder={"Email"} name="addremail" />
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
                <th> {cart.map((item) => item.name + ",  ")} </th>
                <td>
                  {cart
                    .reduce((prev, item) => prev + item.price * item.qty, 0)
                    .toFixed(2)}
                  ₺
                </td>
              </tr>
            </thead>
            <tbody>
              <tr>
                <th>Subtotal </th>
                <td>
                  {" "}
                  {cart
                    .reduce((prev, item) => prev + item.price * item.qty, 0)
                    .toFixed(2)}{" "}
                  ₺{" "}
                </td>
              </tr>
              <tr>
                <th> Kargolama </th>
                <td>
                  Sabit Fiyat : <b> 20.00 ₺ </b>
                </td>
              </tr>
              <tr>
                <th> Total </th>
                <td>
                  {" "}
                  {(
                    cart.reduce(
                      (prev, item) => prev + item.price * item.qty,
                      0
                    ) + 20.0
                  ).toFixed(2)}{" "}
                  ₺{" "}
                </td>
              </tr>
            </tbody>
          </table>
        </div>
        <div className={styles.checkout__payment}>
          <Radio.Group
            defaultValue={user.defaultPaymentMethod}
            onChange={handlePayment}
          >
            <div>
              <Radio value={"credit card"}>Kredi Kartı ile Ödeme</Radio>
            </div>
            <div>
              <Radio value={"door"}>Kapıda Ödeme</Radio>
            </div>
            <div>
              <Radio value={"havale"}>Havale</Radio>
            </div>
          </Radio.Group>
          <button className={styles.primary_button}>Sipariş Ver</button>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions)

  if (!session) {
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }
  }
  await db.connectDb();
  const user = await User.findById(session.user.id);
  await db.disconnectDb();
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
    },
  };
}
