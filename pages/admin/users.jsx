import styles from "@/styles/users.module.scss";
import Image from "next/image";
import { Form, Table } from "antd";
import { useState } from "react";
import db from "@/utils/db";
import User from "@/models/User";
import axios from "axios";
import { toast } from "react-toastify";
import Loader from "@/components/loader";

export default function Users({ users }) {
  const columns = [
    {
      title: "Fotoğraf",
      dataIndex: "fotograf",
      width: "10%",
      responsive: ["lg"],
    },
    {
      title: "Ad Soyad",
      dataIndex: "adSoyad",
      width: "20%",
      editable: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      width: "20%",
      editable: true,
    },
    {
      title: "Doğrulama",
      dataIndex: "dogrulama",
      width: "20%",
    },
    {
      title: "Admin",
      dataIndex: "admin",
      width: "10%",
    },
    {
      title: "İşlemler",
      dataIndex: "operation",
    },
  ];
  const originData = [];
  users?.map((user) =>
    originData.push({
      key: user._id,
      fotograf: (
        <Image src={user.image} height={50} width="50" alt="User Resmi" />
      ),
      adSoyad: user.name,
      email: user.email,
      dogrulama: (
        <Image
          src={"/images/verified.png"}
          height="50"
          width={50}
          alt="Doğrulanmış Hesap"
        />
      ),
      admin: (
        <Image
          src={`${
            user.role == "admin"
              ? "/images/verified.png"
              : "/images/unverified.png"
          }`}
          style={{ cursor: "pointer" }}
          onClick={() => handleAdmin(user._id)}
          height="50"
          width={50}
          alt="Doğrulanmış Hesap"
        />
      ),
      operation: (
        <a onClick={() => handleDelete(user._id)} style={{ color: "red" }}>
          Sil
        </a>
      ),
    })
  );
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [loading, setLoading] = useState(false);
  const handleAdmin = async (id) => {
    try {
      const values = { id, isAdmin: true };
      setLoading(true);
      await axios.post("/api/users/updateUser", { values }).then((data) => {
        if (data.data.success) {
          toast.success(data.data.message);
          window.location.reload();
        }
      });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const handleDelete = async (id) => {
    try {
      setLoading(true);
      await axios
        .delete("/api/users/updateUser", {
          data: { id, deleteUser: true },
        })
        .then((data) => {
          if (data.data.success) {
            toast.success(data.data.message);
            setData((prev) => prev.filter((user) => user.key != id));
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

  return (
    <div className={styles.users}>
      {loading && <Loader />}
      <h3>Kullanıcılar</h3>
      <Form form={form} component={false}>
        <Table
          bordered
          dataSource={data}
          columns={columns}
          rowClassName="editable-row"
        />
      </Form>
    </div>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const users = await User.find({})?.sort({ createdAt: -1 });
  await db.disconnectDb();
  return {
    props: {
      users: JSON.parse(JSON.stringify(users)),
    },
  };
}
