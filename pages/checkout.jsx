import User from "@/models/User";
import styles from "@/styles/checkout.module.scss";
import db from "@/utils/db";
import { Form, Input, Radio, Select } from "antd";
import { useState } from "react";
import { RiCoupon3Line } from "react-icons/ri";
import { useSelector } from "react-redux";
import { turkeyCities } from "@/data/cities";
import { countries as allCountries } from "@/data/countries";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import axios from "axios";
import Loader from "@/components/loader";
import { toast } from "react-toastify";
import { Router, useRouter } from "next/router";
import { useDispatch } from "react-redux";
import { emptyCart } from "@/store/cartSlice";

export default function Checkout({ user }) {
  const [coupontoggle, setCoupontoggle] = useState(false);
  // const [diffaddrtoggle, setDiffaddrtoggle] = useState(false);
  const [ilce, setIlce] = useState();
  const [loading, setLoading] = useState(false);
  const [payment, setPayment] = useState(user.defaultPaymentMethod);
  const cart = useSelector((state) => state.cartSlice.cart);
  const activeAddress = user.addresses.find((addr) => addr.active);
  const router = useRouter();
  const dispatch = useDispatch();

  const cityHandle = (e) => {
    setIlce(turkeyCities?.find((c) => c.alan_kodu == e));
  };
  const handlePayment = (e) => {
    setPayment(e.target.value);
  };

  const initialValues = {
    firstName: activeAddress ? activeAddress.firstName : "",
    lastName: activeAddress ? activeAddress.lastName : "",
    country: activeAddress.country ? activeAddress.country : "TR",
    address1: activeAddress ? activeAddress.address1 : "",
    city: activeAddress.city ? activeAddress.city : "",
    state: activeAddress.state ? activeAddress.state : "",
    zipCode: activeAddress ? activeAddress.zipCode : "",
    phoneNumber: activeAddress ? activeAddress.phoneNumber : "",
    mahalle: activeAddress ? activeAddress.mahalle : "",
  };
  const onFinish = async (degerler) => {
    try {
      let values = {};
      values.user = user._id;
      values.products = [];
      values.notes = degerler.notes;
      cart.map((p) =>
        values.products.push({
          product: p._id,
          name: p.name,
          image: p.images[0],
          qty: p.qty,
          price: p.price,
        })
      );
      values.shippingAddress = [
        {
          firstName: degerler.firstName,
          lastName: degerler.lastName,
          phoneNumber: degerler.phoneNumber,
          address1: degerler.address1,
          apartman: degerler.apartman,
          city: degerler.city,
          state: degerler.state,
          zipCode: degerler.zipCode,
          country: degerler.country,
          mahalle: degerler.mahalle,
        },
      ];
      values.paymentMethod = payment;
      values.total = cart.reduce(
        (prev, item) => prev + item.price * item.qty,
        0
      );
      values.isPaid = false;
      setLoading(true);
      await axios
        .post("/api/orders/addOrder", { values })
        .then((data) => {
          if (data.data.success) {
            toast.success(data.data.message);
            dispatch(emptyCart());
            data.data.success && router.push("/hesabim?orders=1");
          }
        })
        .catch((data) => {
          console.log(data.response.data);
          if (data.response.data.error) {
            router.push("/")
          }
          toast.error(data.response.data.message);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className={styles.checkout}>
      {loading && <Loader />}
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
        <Form
          layout="vertical"
          onFinish={onFinish}
          initialValues={initialValues}
        >
          <div className={styles.checkout__wrapper}>
            <div className={styles.checkout__billing}>
              <h3>Fatura Detayları</h3>
              <div>
                <div>
                  <Form.Item
                    label="Adınız"
                    name={"firstName"}
                    rules={[
                      { required: true, message: "Lütfen adınızı giriniz." },
                    ]}
                  >
                    <Input placeholder={"Adınız"} />
                  </Form.Item>
                  <Form.Item
                    label="Soyadınız"
                    name={"lastName"}
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
                    {allCountries?.map((country, i) => (
                      <Select.Option key={i} value={country?.code}>
                        {country?.name}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="Şehir"
                  name={"city"}
                  rules={[
                    {
                      required: true,
                      message: "Lütfen yaşadığınız ili giriniz.",
                    },
                  ]}
                >
                  <Select className={styles.select} onChange={cityHandle}>
                    {turkeyCities.map((city, i) => (
                      <Select.Option key={i} value={city?.alan_kodu}>
                        {city?.il_adi}
                      </Select.Option>
                    ))}
                  </Select>
                </Form.Item>
                <Form.Item
                  label="İlçe"
                  name={"state"}
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
                  label="Mahalle"
                  name={"mahalle"}
                  rules={[{ required: true, message: "Mahallenizi Giriniz." }]}
                >
                  <Input placeholder={"Mahalle"} />
                </Form.Item>
                <Form.Item
                  label="Cadde, Sokak, No:"
                  name={"address1"}
                  rules={[
                    {
                      required: true,
                      message: "Cadde Sokak ve Kapı Numaranızı Giriniz.",
                    },
                  ]}
                >
                  <Input placeholder={"Cadde, Sokak, No:"} />
                </Form.Item>
                <Form.Item
                  label="Posta Kodu"
                  name={"zipCode"}
                  rules={[{ required: true, message: "Posta Kodunu giriniz." }]}
                >
                  <Input placeholder={"Posta Kodu"} />
                </Form.Item>
                <Form.Item label="Apartman Adı" name={"apartman"}>
                  <Input placeholder={"Apartman adı"} />
                </Form.Item>

                <Form.Item
                  label="Telefon No"
                  name={"phoneNumber"}
                  rules={[
                    { required: true, message: "Telefon numaranızı giriniz." },
                  ]}
                >
                  <Input placeholder={"Telefon Numarası"} />
                </Form.Item>
              </div>
            </div>
            <div className={styles.checkout__address}>
              <h3>Siparişiniz ile ilgili notlar</h3>
              {/* {diffaddrtoggle && (
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
            )} */}
              <div className={styles.checkout__address_notes}>
                <Form.Item label="Sipariş Notları" name={"notes"}>
                  <Input.TextArea
                    rows={4}
                    placeholder={"Siparişiniz ile ilgili özel notlar"}
                  />
                </Form.Item>
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
        </Form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/",
        permanent: false,
      },
    };
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
