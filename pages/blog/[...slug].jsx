import db from "@/utils/db";
import { Checkbox, Form, Input } from "antd";
import { AiOutlineCalendar, AiOutlineTag, AiOutlineUser } from "react-icons/ai";
import Image from "next/image";
import Blog from "@/models/Blog";
import styles from "@/styles/singleArticle.module.scss";
import NavigatorBar from "@/components/navigatorBar";
import BlogSearch from "@/components/blog/search";
import Head from "next/head";
import CommentCard from "@/components/blog/commentCard";
import Inputs from "@/components/input";

export default function SingleArticle({ article }) {
  const onFinish = (values) => {
    console.log("Success:", values);
  };

  const onFinishFailed = (errorInfo) => {
    console.log("Failed:", errorInfo);
  };
  return (
    <>
      <Head>
        <title> {article.title} </title>
      </Head>
      <div className={styles.singleArticle}>
        <div className={styles.container}>
          <NavigatorBar />
          <div className={styles.singleArticle__grid}>
            <div className={styles.singleArticle__content}>
                <div className={styles.singleArticle__content_img}>

              <Image
                src={`${article.img}.jpg`}
                height="300"
                width={800}
                alt="tekli makale"
                />
                </div>
              <p>
                <span>
                  {" "}
                  <AiOutlineUser /> {article.author}
                </span>
                <span>
                  {" "}
                  <AiOutlineTag />
                  {article.category}
                </span>
                <span>
                  {" "}
                  <AiOutlineCalendar />
                  {article.date.split("T")[0] +
                    " " +
                    article.date.split("T")[1].slice(0, 8)}
                </span>
              </p>
              <div className={styles.title}>{article.title}</div>
              <p>{article.content}</p>
              <div className={styles.singleArticle__content_buttons}>
                <button>Yemek</button>
                <button>Bakla</button>
                <button>Meyve</button>
              </div>
              <div className={styles.singleArticle__comments}>
                <div className={styles.singleArticle__comments_title}>
                  "{article.title}" İçin {comments.length} Yorum
                </div>
                {comments.map((comment, i) => (
                  <CommentCard key={i} comment={comment} />
                ))}
                <div className={styles.singleArticle__comments_form}>
                  <div className={styles.singleArticle__comments_form_title}>
                    Bir Yorum Ekle...
                  </div>
                  <Form
                    name="article_comments"
                    initialValues={{ remember: true }}
                    onFinish={onFinish}
                    onFinishFailed={onFinishFailed}
                    autoComplete="off"
                  >
                    <Form.Item
                      name="comment"
                      rules={[
                        {
                          required: true,
                          message: "Lütfen Yorumunu Gir.",
                        },
                      ]}
                    >
                      <Input.TextArea rows={5} placeholder="Yorumun *" />
                    </Form.Item>
                    <div className={styles.singleArticle__comments_form_üclü}>
                      <Form.Item
                        name="name"
                        rules={[
                          {
                            required: true,
                            message: "Lütfen İsmini Gir",
                          },
                        ]}
                      >
                        <Inputs placeholder="İsim *" />
                      </Form.Item>
                      <Form.Item
                        name="email"
                        rules={[
                          {
                            required: true,
                            message: "Lütfen Emailini Gir",
                          },
                        ]}
                      >
                        <Inputs placeholder="Email *" />
                      </Form.Item>
                      <Form.Item name="website">
                        <Inputs placeholder="Websiten" />
                      </Form.Item>
                    </div>

                    <button className={styles.primary_button}>
                      Yorum Ekle
                    </button>
                  </Form>
                </div>
              </div>
            </div>
            <div className={styles.singleArticle__sidebar}>
              <BlogSearch />
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

const comments = [
  {
    name: "Cevher KARAMAN",
    img: "/images/customer/customer1.jpeg",
    date: "12.12.2022 00:02:15",
    comment:
      "Proaktif olarak tasavvur edilen multimedya tabanlı uzmanlık ve çapraz medya büyüme stratejileri. Üstün iş birliği ve fikir paylaşımı olmadan kaliteli entelektüel sermayeyi sorunsuz bir şekilde görselleştirin. Bakım yapılabilir ürünlerden sonra kurulu temel portalları bütünsel olarak onaylayın.",
    parent: "0",
  },
  {
    name: "Resul ÖZTÜRK",
    img: "/images/customer/customer1.jpeg",
    date: "12.12.2022 00:02:15",
    comment:
      "If you hear a cat hissing, spitting or growling, stay away, as that indicates it is frightened or angry and might react in an aggressive manner if you get too close.",
    parent: "1",
  },
  {
    name: "Yücel AKSOY",
    img: "/images/customer/customer1.jpeg",
    date: "12.12.2022 00:02:15",
    comment:
      "Proaktif tahakküm sağlamak için kazan-kazan hayatta kalma stratejilerini masaya getirin. Günün sonunda, ileriye dönük olarak, X kuşağından evrimleşen yeni bir normal, aerodinamik bir bulut çözümüne doğru ilerliyor.",
    parent: "0",
  },
];

export async function getServerSideProps({ query }) {
  const { slug } = query;
  await db.connectDb();
  const singleArticle = await Blog.findOne({ slug }).lean();
  await db.disconnectDb();
  return {
    props: {
      article: JSON.parse(JSON.stringify(singleArticle)),
    },
  };
}
