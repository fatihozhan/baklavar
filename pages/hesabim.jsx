import { InboxOutlined } from "@ant-design/icons";
import Order from "@/models/Order";
import Link from "next/link";
import Image from "next/image";
import NavigatorBar from "@/components/navigatorBar";
import styles from "@/styles/hesabim.module.scss";
import { useState } from "react";
import { signOut, useSession } from "next-auth/react";
import { Form, Input, message, Radio, Rate, Upload } from "antd";
import axios from "axios";
import {
  AiOutlineComment,
  AiOutlineUserAdd,
  AiOutlinePlusCircle,
} from "react-icons/ai";
import { TbJewishStar } from "react-icons/tb";
import { RiListOrdered } from "react-icons/ri";
import { FaRegAddressBook } from "react-icons/fa";
import { MdOutlineExitToApp } from "react-icons/md";
import { GrUserAdmin } from "react-icons/gr";
import User from "@/models/User";
import db from "@/utils/db";
import { toast } from "react-toastify";
import Loader from "@/components/loader";
import AddressCard from "@/components/account/addressCard";
import AddressModal from "@/components/account/addressModal";
import { useRouter } from "next/router";
import { turkeyCities } from "@/data/cities";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import OrderCard from "@/components/account/orderCard";
import Product from "@/models/Product";
import { Table } from "antd";

export default function MyAccount({ user, orders, reviews }) {
  const columns = [
    {
      title: "Ürün Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ürün Fotoğrafı",
      dataIndex: "photo",
      key: "photo",
    },
    {
      title: "Puanım",
      dataIndex: "rating",
      key: "rating",
    },
    {
      title: "Onaylandı Mı?",
      dataIndex: "approved",
      key: "approved",
    },
    {
      title: "İşlemler",
      dataIndex: "operation",
      key: "operation",
    },
  ];
  //wishlist tablosuuuu
  const columns1 = [
    {
      title: "Ürün Adı",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ürün Fotoğrafı",
      dataIndex: "photo",
      key: "photo",
    },
    {
      title: "İşlemler",
      dataIndex: "operation",
      key: "operation",
    },
  ];
  const originData = [];
  const originData1 = [];
  user?.wishlist.map((wish) =>
    originData1.push({
      key: wish.product._id,
      name: wish.product.name,
      photo: (
        <img
          src={wish.product.images[0]}
          alt="wishlist"
          height={70}
          width="70"
        />
      ),
      operation: (
        <a
          style={{ color: "red" }}
          onClick={() => handleWishlist(wish.product._id)}
        >
          Sil
        </a>
      ),
    })
  );

  reviews?.map((rev) =>
    originData.push({
      key: rev.review._id,
      name: rev.product.name,
      photo: (
        <img src={rev.product.image} alt="Ürün Photo" height={70} width="70" />
      ),
      rating: <Rate defaultValue={rev.review.rating} disabled />,
      approved: (
        <img
          src={
            rev.review.approved
              ? "/images/verified.png"
              : "/images/unverified.png"
          }
          alt="isApproved "
          height={60}
          width="60"
        />
      ),
      description: rev.review.review,
      operation: (
        <a
          style={{ color: "red" }}
          onClick={() => reviewDelete(rev.review._id)}
        >
          Sil
        </a>
      ),
    })
  );

  const router = useRouter();
  const [tab, setTab] = useState(
    router.query.address ? 2 : router.query.orders ? 3 : 1
  );
  const [currentUser, setCurrentUser] = useState(user ? user : "");
  const [currentAddress, setCurrentAddress] = useState();
  const [loading, setLoading] = useState(false);
  const [modalKey, setModalKey] = useState(1);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [cities, setCities] = useState(turkeyCities);
  const [data, setData] = useState(originData);
  const [data1, setData1] = useState(originData1);
  const { data: session } = useSession();
  const showModal = async (address) => {
    setLoading(true);
    setIsModalOpen(true);
    setModalKey((prev) => prev + 1);
    address ? setCurrentAddress(address) : setCurrentAddress();
    setLoading(false);
  };
  const fileList = [];
  const getDbUser = async (id, username) => {
    const { data } = await axios.post(`/api/users/getUser`, { username });
    if (data.user && data.user._id != id) {
      return false;
    }

    return true;
  };
  const handleSubmit = async (values) => {
    try {
      setLoading(true);
      values.picture
        ? (values.picture = await new Promise((resolve) => {
            const reader = new FileReader();
            reader.readAsDataURL(values.picture.file.originFileObj);
            reader.onload = () => resolve(reader.result);
          }))
        : currentUser.image;

      const { data } = await axios
        .post("/api/users/updateUser", { values })
        .catch((data) => {
          toast.error(data.response.data.message);
          setLoading(false);
        });
      if (data.success) {
        setLoading(false);
        toast.success(data.message);
      }
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const imgControl = async (e) => {
    const types = ["image/jpg", "image/png", "image/jpeg", "image/gif"];
    if (!types.includes(e.type)) {
      message.error("Desteklenmeyen Dosya Biçimi");
      return Upload.LIST_IGNORE;
    }
    if (e.size > 1500000) {
      message.error("Fotoğraf Yükleme Limiti Aşıldı.");
      return Upload.LIST_IGNORE;
    }

    const src = await new Promise((resolve) => {
      const reader = new FileReader();
      reader.readAsDataURL(e);
      reader.onload = () => resolve(reader.result);
    });
    setCurrentUser({
      ...currentUser,
      image: URL.createObjectURL(e),
    });
    return e;
  };
  const reviewDelete = async (id) => {
    try {
      setLoading(true);
      await axios
        .put("/api/products", { id })
        .then((data) => {
          {
            if (data.data.success) {
              toast.success(data.data.message);
              setData((prev) => prev.filter((data) => data.key != id));
            }
          }
        })
        .catch((data) => {
          toast.error(data.response.data.message);
          console.log(data);
        });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const handleWishlist = async (id) => {
    try {
      const values = {
        id,
        wishlist: true,
        email: user?.email,
      };
      setLoading(true);
      await axios
        .post("/api/users/updateUser", { values })
        .then((data) => {
          if (data.data.success) {
            toast.success(data.data.message);
            setData1(prev => prev.filter(data => data.key != id));
          }
        })
        .catch((data) => {
          console.log(data);
          toast.error(data.response.data.message);
        });
      setLoading(false);
    } catch (error) {
      console.log(error)
      setLoading(false);
    }
  };

  return (
    <div className={styles.hesabim}>
      {loading && <Loader />}
      <NavigatorBar />
      <div className={styles.container}>
        <div className={styles.hesabim__wrapper}>
          <div className={styles.hesabim__sidebar}>
            <ul>
              <li
                onClick={() => setTab(1)}
                style={{ color: `${tab == 1 ? "#136450" : ""}` }}
              >
                <AiOutlineUserAdd /> Bilgilerim
              </li>
              <li
                onClick={() => setTab(2)}
                style={{ color: `${tab == 2 ? "#136450" : ""}` }}
              >
                <FaRegAddressBook /> Adreslerim
              </li>
              <li
                onClick={() => setTab(3)}
                style={{ color: `${tab == 3 ? "#136450" : ""}` }}
              >
                <RiListOrdered /> Siparişlerim
              </li>
              <li
                onClick={() => setTab(4)}
                style={{ color: `${tab == 4 ? "#136450" : ""}` }}
              >
                <AiOutlineComment /> Yorumlarım
              </li>
              <li
                onClick={() => setTab(5)}
                style={{ color: `${tab == 5 ? "#136450" : ""}` }}
              >
                <TbJewishStar /> İstek Listem
              </li>
              <li
                onClick={() => signOut()}
              >
                <MdOutlineExitToApp /> Çıkış Yap
              </li>
              {session?.user?.role == "admin" && (
                <Link href="/admin/dashboard">
                  <li>
                    <GrUserAdmin /> Admin Dashboard
                  </li>
                </Link>
              )}
            </ul>
          </div>
          <div className={styles.hesabim__content}>
            {tab == 1 && (
              <div className={styles.hesabim__content_information}>
                <h3>Bilgileri Düzenle</h3>
                <Form
                  onFinish={handleSubmit}
                  layout="vertical"
                  initialValues={{
                    fullname: currentUser?.name,
                    username: currentUser?.username,
                    email: currentUser?.email,
                    payment: currentUser?.defaultPaymentMethod,
                  }}
                >
                  <div className={styles.hesabim__content_information_pic}>
                    <Image
                      src={currentUser.image}
                      height="200"
                      width={200}
                      alt="user resmi"
                    />
                    <Form.Item name={"picture"}>
                      <Upload.Dragger
                        name="file"
                        multiple={false}
                        maxCount={1}
                        fileList={fileList}
                        beforeUpload={imgControl}
                      >
                        <p className="ant-upload-drag-icon">
                          <InboxOutlined style={{ color: "#136450" }} />
                        </p>
                        <p
                          className="ant-upload-text"
                          style={{ wordWrap: "word-break" }}
                        >
                          Değiştirmek istediğiniz fotoğrafı sürüyleyip
                          bırakabilirsiniz.
                        </p>
                        <p className="ant-upload-hint">
                          Sadece 1 adet fotoğrafa izin verilmektedir.
                        </p>
                      </Upload.Dragger>
                    </Form.Item>
                  </div>
                  <div className={styles.hesabim__content_information_infos}>
                    <h3>Hesap Bilgilerim</h3>
                    <Form.Item
                      rules={[
                        { required: true, message: "Lütfen Adınızı Giriniz" },
                        {
                          min: 5,
                          message: "Ad Soyad en az 5 karakter olmalıdır.",
                        },
                      ]}
                      name={"fullname"}
                      label="Ad Soyad"
                    >
                      <Input placeholder="Ad Soyad.." />
                    </Form.Item>
                    <Form.Item
                      rules={[
                        {
                          required: true,
                          message: "Kullanıcı Adı Bilgisi Zorunludur",
                        },
                        {
                          min: 3,
                          message:
                            "Kullanıcı Adı Min 3 Karakter Uzunluğunda Olmalıdır.",
                        },
                        ({ getFieldValue }) => ({
                          async validator(_, value) {
                            if (!value) {
                              return Promise.resolve();
                            }
                            if (await getDbUser(currentUser._id, value)) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Kullanıcı Adınız Benzersiz Olmalıdır!")
                            );
                          },
                        }),
                      ]}
                      name={"username"}
                      label="Kullanıcı Adı"
                    >
                      <Input placeholder="Kullanıcı Adı.." />
                    </Form.Item>
                    <Form.Item
                      name={"email"}
                      label="Email"
                      rules={[
                        { required: true, message: "Zorunlu Alan" },
                        {
                          type: "email",
                          message: "Lütfen geçerli bir email adresi giriniz.",
                        },
                      ]}
                    >
                      <Input placeholder="Email.." />
                    </Form.Item>
                    <Form.Item
                      name={"oldPassword"}
                      label="Eski Parola"
                      rules={[
                        {
                          min: 6,
                          message:
                            "Parolanız en az 6 karakter uzunluğunda olmalıdır.",
                        },
                      ]}
                    >
                      <Input placeholder="Eski Parolanız.." type="password" />
                    </Form.Item>
                    <Form.Item
                      name={"newPassword"}
                      label="Yeni Parola"
                      rules={[
                        {
                          min: 6,
                          message:
                            "Parolanız en az 6 karakter uzunluğunda olmalıdır.",
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue("oldPassword")) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Eski parolanızı girmelisiniz!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input placeholder="Yeni Parola.." type="password" />
                    </Form.Item>
                    <Form.Item
                      name={"newPasswordRepeat"}
                      label="Yeni Parola Tekrar"
                      dependencies={["password"]}
                      hasFeedback
                      rules={[
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (getFieldValue("newPassword") && !value) {
                              return Promise.reject(
                                new Error("Yeni parolanızı giriniz.")
                              );
                            }
                            if (
                              !value ||
                              getFieldValue("newPassword") === value
                            ) {
                              return Promise.resolve();
                            }
                            return Promise.reject(
                              new Error("Parolalar Eşleşmiyor!")
                            );
                          },
                        }),
                      ]}
                    >
                      <Input
                        placeholder="Yeni Parola Tekrar.."
                        type="password"
                      />
                    </Form.Item>
                    <Form.Item
                      name={"payment"}
                      label="Varsayılan Ödeme Yönteminiz"
                    >
                      <Radio.Group>
                        <Radio value={"credit card"}>Kredi Kartı</Radio>
                        <Radio value={"door"}>Kapıda Ödeme</Radio>
                        <Radio value={"havale"}>Havale</Radio>
                      </Radio.Group>
                    </Form.Item>
                  </div>
                  <button
                    className={styles.primary_button}
                    style={{ width: "250px" }}
                  >
                    Kaydet
                  </button>
                </Form>
              </div>
            )}
            {tab == 2 && (
              <div className={styles.hesabim__content_address}>
                <AddressModal
                  isModalOpen={isModalOpen}
                  setIsModalOpen={setIsModalOpen}
                  cities={cities ? cities : []}
                  currentAddress={currentAddress}
                  setLoading={setLoading}
                  modalKey={modalKey}
                  currentUser={currentUser}
                  setCurrentUser={setCurrentUser}
                />
                <div className={styles.hesabim__content_address_title}>
                  <h3>Adres Bilgilerim</h3>
                  <div onClick={() => showModal()}>
                    <AiOutlinePlusCircle /> Yeni Adres Ekle
                  </div>
                </div>
                <div className={styles.hesabim__content_address_content}>
                  {currentUser?.addresses?.map((address, i) => (
                    <AddressCard
                      address={address}
                      cities={cities}
                      key={i}
                      setLoading={setLoading}
                      setCurrentUser={setCurrentUser}
                      currentUser={currentUser}
                      showModal={showModal}
                    />
                  ))}
                </div>
                {router.query.address ? (
                  <Link href={"/cart"}>
                    <button className={styles.primary_button}>
                      Sepete Git
                    </button>
                  </Link>
                ) : (
                  ""
                )}
              </div>
            )}
            {tab == 3 && (
              <div className={styles.hesabim__content_orders}>
                {orders.length > 0 ? (
                  orders?.map((order, i) => <OrderCard key={i} order={order} />)
                ) : (
                  <h4>Henüz Siparişiniz Bulunmamaktadır</h4>
                )}
              </div>
            )}
            {tab == 4 && (
              <div className={styles.hesabim__content_comments}>
                <div className={styles.hesabim__content_comments_title}>
                  <Table
                    columns={columns}
                    expandable={{
                      expandedRowRender: (record) => (
                        <p
                          style={{
                            margin: 0,
                          }}
                        >
                          {record.description}
                        </p>
                      ),
                      rowExpandable: (record) =>
                        record.name !== "Not Expandable",
                    }}
                    dataSource={data}
                  />
                </div>
              </div>
            )}
            {tab == 5 && (
              <div className={styles.hesabim__content_wishlist}>
                <Table columns={columns1} dataSource={data1} />
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const session = await getServerSession(context.req, context.res, authOptions);

  if (!session) {
    return {
      redirect: {
        destination: "/signIn",
      },
    };
  }
  await db.connectDb();
  const user = await User.findById(session?.user?.id)
    .populate({ path: "wishlist.product", model: Product })
    .lean();
  const orders = await Order.find({})
    .populate({ path: "user", model: User })
    .sort({ createdAt: -1 })
    .lean();
  const reviews = [];
  const products = await Product.find({
    "reviews.email": session?.user.email,
  }).lean();
  products.map((prod) =>
    prod.reviews?.map(
      (rev) =>
        rev.email == session?.user.email &&
        reviews.push({
          review: rev,
          product: { name: prod.name, image: prod.images[0] },
        })
    )
  );
  delete user.password;
  delete user.__v;
  await db.disconnectDb();
  return {
    props: {
      user: JSON.parse(JSON.stringify(user)),
      orders: JSON.parse(JSON.stringify(orders)),
      reviews: JSON.parse(JSON.stringify(reviews)),
    },
  };
}
