import NavigatorBar from "@/components/navigatorBar";
import { Rate } from "antd";
import Image from "next/image";
import styles from "../../styles/product.module.scss";
import { useRef, useState } from "react";
import { Input, Form } from "antd";
import ProductCard from "@/components/product/productCart";
import ProductInfos from "@/components/product/productPageInfos";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import axios from "axios";
import Loader from "@/components/loader";
import { toast } from "react-toastify";
import { getToken } from "next-auth/jwt";
import User from "@/models/User";
import ProductModal from "@/components/product/productModal";
import { useSelector } from "react-redux";

export default function SingleProduct({
  product,
  products,
  relatedProduct,
  user,
}) {
  const [tab, setTab] = useState(1);
  const [currentImg, setCurrentImg] = useState(product.images[0]);
  const [rate, setRate] = useState(4);
  const formRef = useRef(null);
  const [loading, setLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState("");
  const cart = useSelector((state) => state.cartSlice.cart);

  const handleModal = (id) => {
    setProductId(id);
    setIsModalOpen(true);
  };

  const onFinish = async (values) => {
    try {
      setLoading(true);
      values.rating = rate;
      values.reviewBy = values.name;
      values.id = product._id;
      values.image = user.image;
      delete values.name;
      await axios
        .patch("/api/products", { values })
        .then((data) => {
          toast.success(data.data.message);
          formRef.current.resetFields();
        })
        .catch((data) => toast.error(data.response.data.message));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div className={styles.product}>
      <NavigatorBar title={product.name} />
      {loading && <Loader />}
      <ProductModal
        productId={productId}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        cart={cart}
        user={user}
        products={products}
      />
      <div className={styles.container}>
        <div className={styles.product__general}>
          <div className={styles.product__img}>
            <div className={styles.product__img_top}>
              <Image src={currentImg} width="600" height={"600"} alt="grape" />
            </div>
            <div className={styles.product__img_bottom}>
              {product.images?.map((img, i) => (
                <Image
                  key={i}
                  onClick={() => setCurrentImg(img)}
                  src={img}
                  width="90"
                  height={"90"}
                  alt="grape"
                />
              ))}
            </div>
          </div>
          <ProductInfos user={user} product={product} />
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
              Yorumlar ({product.reviews.filter((rev) => rev.approved).length})
            </button>
          </div>
          {tab == 1 && (
            <div className={styles.product__details_description}>
              {product?.description}
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
              {product.reviews.length > 0 ? (
                product.reviews.map(
                  (review) =>
                    review.approved && (
                      <div
                        key={review._id}
                        className={styles.product__details_reviews_comment}
                      >
                        <Image
                          src={review.image}
                          height="50"
                          width={50}
                          alt="customer resmi"
                        />
                        <div
                          className={
                            styles.product__details_reviews_comment_info
                          }
                        >
                          <Rate disabled defaultValue={review.rating} />
                          <div>
                            <h4>{review.reviewBy}</h4>
                            <span>
                              -
                              {review.createdAt
                                ? review.createdAt.split("T")[0] +
                                  " " +
                                  review.createdAt.split("T")[1].slice(0, 5)
                                : ""}
                            </span>
                          </div>
                          <p>{review.review}</p>
                        </div>
                      </div>
                    )
                )
              ) : (
                <h4>Henüz hiç yorum yapılmamış</h4>
              )}

              <div className={styles.product__details_reviews_form}>
                <h4>Bir yorum da sen ekle!</h4>
                <p>
                  E mail adresin yayınlanmayacaktır. Zorunlu alanlar * ile
                  işaretlenmiştir.
                </p>
                <h5>
                  <b> * </b> Puanın :
                </h5>
                <Rate onChange={(value) => setRate(value)} defaultValue={4.5} />
                <Form
                  ref={formRef}
                  name="review"
                  onFinish={onFinish}
                  initialValues={{ name: user?.name, email: user?.email }}
                  layout="vertical"
                >
                  <Form.Item
                    label="Yorumun"
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
                    label="Ad Soyad"
                    name="name"
                    rules={[
                      {
                        required: true,
                        message: "Lütfen adınızı giriniz!",
                      },
                    ]}
                  >
                    <Input
                      className={styles.customInput}
                      disabled={user?.name}
                      type="text"
                    />
                  </Form.Item>
                  <Form.Item
                    label="Email"
                    name="email"
                    rules={[
                      {
                        required: true,
                        message: "Lütfen Emailinizi giriniz!",
                      },
                      {
                        type: "email",
                        message: "Lütfen geçerli bir email adresi giriniz.",
                      },
                    ]}
                  >
                    <Input
                      className={styles.customInput}
                      disabled={user?.email}
                    />
                    {/* <div className={styles.customInput}>
                    </div> */}
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
                      <button className={styles.primary_button} type="submit">
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
            {relatedProduct?.map((product) => (
              <ProductCard
                handleModal={handleModal}
                key={product._id}
                product={product}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  const { query, req } = context;
  const token = await getToken({ req, secret: process.env.SECRET_KEY, secureCookie : process.env.NODE_ENV == "production" });
  await db.connectDb();
  const products = await Product.find({}).lean();
  const product = await Product.findById(query.slug)
    .populate({ path: "category", model: Category })
    .lean();
  const relatedProduct = await Product.find({
    category: product.category._id,
  }).lean();

  let allowedUser = {};
  if (token) {
    const user = await User.findOne({ email: token?.email }).lean();

    allowedUser = {
      name: token?.name,
      email: token?.email,
      image: token?.picture,
      wishlist: user?.wishlist,
    };
  }

  await db.disconnectDb();
  return {
    props: {
      product: JSON.parse(JSON.stringify(product)),
      products: JSON.parse(JSON.stringify(products)),
      relatedProduct: JSON.parse(JSON.stringify(relatedProduct)),
      user: JSON.parse(JSON.stringify(allowedUser)),
    },
  };
}
