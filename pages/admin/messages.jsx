import styles from "@/styles/messages.module.scss";
import Message from "@/models/Message";
import db from "@/utils/db";
import { Table } from "antd";
import { useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@/components/loader";

export default function Messages({ messages }) {
  const columns = [
    {
      title: "Ad Soyad",
      dataIndex: "name",
      filters: [
        {
          text: "Joe",
          value: "Joe",
        },
        {
          text: "Category 1",
          value: "Category 1",
          children: [
            {
              text: "Yellow",
              value: "Yellow",
            },
            {
              text: "Pink",
              value: "Pink",
            },
          ],
        },
        {
          text: "Category 2",
          value: "Category 2",
          children: [
            {
              text: "Green",
              value: "Green",
            },
            {
              text: "Black",
              value: "Black",
            },
          ],
        },
      ],
      filterMode: "tree",
      filterSearch: true,
      onFilter: (value, record) => record.name.includes(value),
    },
    {
      title: "Email",
      dataIndex: "email",
    },
    {
      title: "Telefon No.",
      dataIndex: "telno",
    },
    {
      title: "Konu",
      dataIndex: "subject",
    },
    {
      title: "Mesaj",
      dataIndex: "message",
    },
    {
      title: "Ulaşıldı Mı?",
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
  messages?.map((message) =>
    originData.push({
      key: message._id,
      name: message.name,
      email: message.email,
      telno: message.phone,
      subject: message.subject,
      message: message.message,
      status: { stat: message.isReached, id: message._id },
    })
  );
  const [data, setData] = useState(originData);
  const [loading, setLoading] = useState(false);
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };
  const handleReach = async (id) => {
    try {
      setLoading(true);
      await axios
        .patch("/api/messages", { id })
        .then((data) => {
          if (data.data.success) {
            toast.success(data.data.message);
            setData((prev) =>
              prev?.map((message) => {
                if (message.key == id) {
                  if (message.status.stat) {
                    message.status.stat = false;
                  } else {
                    message.status.stat = true;
                  }
                  message.status.stat;
                  return message;
                } else {
                  return message;
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
        <h3>Mesajlar</h3>
      </div>
      <Table columns={columns} dataSource={data} onChange={onChange} bordered />
    </div>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const messages = await Message.find({})?.sort({ createdAt: -1 }).lean();
  await db.disconnectDb();
  return {
    props: {
      messages: JSON.parse(JSON.stringify(messages)),
    },
  };
}
