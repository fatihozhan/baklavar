import styles from "@/styles/messages.module.scss";
import Product from "@/models/Product";
import db from "@/utils/db";
import { Rate, Table } from "antd";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@/components/loader";
import Image from "next/image";

export default function Comments({ comments }) {
  const columns = [
    {
      title: "Fotoğraf",
      dataIndex: "image",
    },
    {
      title: "Ad Soyad",
      dataIndex: "name",
    },
    {
      title: "Ürün",
      dataIndex: "product",
    },
    {
      title: "Puanlama",
      dataIndex: "rating",
    },
    {
      title: "Yorum",
      dataIndex: "review",
    },
    {
      title: "Tarih",
      dataIndex: "date",
    },
    {
      title: "Onay?",
      dataIndex: "status",
      width: "10%",
      render: (status) =>
        status.stat ? (
          <img
            width={50}
            height="50"
            src="/images/verified.png"
            alt="doğrulama resmi"
            style={{ cursor: "pointer" }}
            onClick={() => handleReach(status.id)}
          />
        ) : (
          <img
            width={50}
            height="50"
            style={{ cursor: "pointer" }}
            src="/images/unverified.png"
            alt="doğrulama resmi"
            onClick={() => handleReach(status.id)}
          />
        ),
    },
  ];
  const originData = [];
  comments?.map((comment) => {
    comment.reviews.map((com) => {
      originData.push({
        key: com._id,
        image: (
          <Image src={com.image} height="70" width={70} alt="userResmi" />
        ),
        name: com.reviewBy,
        product: comment.name,
        rating: <Rate disabled defaultValue={com.rating} />,
        review: com.review,
        date: com.createdAt.split("T")[0] + "-" + com.createdAt.split("T")[1].slice(0,5),
        status: {
          stat: com.approved,
          id: com._id,
        },
      });
    });
  });
  const [data, setData] = useState(originData);
  const [loading, setLoading] = useState(false);
  const handleReach = async (id) => {
    try {
      setLoading(true);
      await axios
        .put("/api/messages", { id })
        .then((data) => {
          if (data.data.success) {
            toast.success(data.data.message);
            setData((prev) =>
              prev?.map((comment) => {
                if (comment.key == id) {
                  if (comment.status.stat) {
                    comment.status.stat = false;
                  } else {
                    comment.status.stat = true;
                  }
                  return comment;
                } else {
                  return comment;
                }
              })
            );
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
    <div className={styles.messages}>
      {loading && <Loader />}
      <div className={styles.messages__title}>
        <h3>Yorumlar</h3>
      </div>
      <Table columns={columns} dataSource={data} bordered />
    </div>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const messages = await Product.find({}, "reviews name")
    ?.sort({ reviews: -1 })
    .lean();
  await db.disconnectDb();
  return {
    props: {
      comments: JSON.parse(JSON.stringify(messages)),
    },
  };
}
