import styles from "@/styles/siparisler.module.scss";
import Image from "next/image";
import { Table } from "antd";
import Order from "@/models/Order";
import db from "@/utils/db";
import User from "@/models/User";

export default function Siparisler({ orders }) {
  const expandedRowRender = (record) => {
    let userData = [
      {
        key: record.userData._id,
        fotograf: (
          <Image
            src={record.userData.image}
            height="70"
            width={70}
            alt="userResmi"
          />
        ),
        kullanici: record.userData.name,
        email: record.userData.email,
        kargoDetaylari: "Teslim Edilmedi",
      },
    ];
    let productData = [];
    record.productData.map((prod) =>
      productData.push({
        key : prod._id,
        fotograf: (
          <Image src={prod.image} height="70" width={70} alt="userResmi" />
        ),
        urunAdi : prod.name,
        boyut : "-",
        miktar : prod.qty,
        fiyat : prod.price + "₺"
      })
    );
    const userColumns = [
      {
        title: "Fotoğraf",
        dataIndex: "fotograf",
        key: "fotograf",
        responsive: ["lg"],
      },
      {
        title: "Kullanıcı",
        dataIndex: "kullanici",
        key: "kullanici",
      },
      {
        title: "Email",
        dataIndex: "email",
        key: "email",
      },
      {
        title: "Kargo Detayları",
        dataIndex: "kargoDetaylari",
        key: "kargoDetaylari",
      },
    ];
    const columnsOrder = [
      {
        title: "Fotoğraf",
        dataIndex: "fotograf",
        key: "fotograf",
      },
      {
        title: "Ürün Adı",
        dataIndex: "urunAdi",
        key: "urunAdi",
      },
      {
        title: "Boyutu",
        dataIndex: "boyut",
        key: "boyut",
      },
      {
        title: "Miktar",
        dataIndex: "miktar",
        key: "miktar",
      },
      {
        title: "Fiyat",
        dataIndex: "fiyat",
        key: "fiyat",
      },
    ];
    return (
      <>
        <Table columns={userColumns} dataSource={userData} pagination={false} />
        <Table
          columns={columnsOrder}
          dataSource={productData}
          pagination={false}
        />
      </>
    );
  };

  const columns = [
    {
      title: "Sipariş No:",
      dataIndex: "siparisNo",
      key: "siparisNo",
    },
    {
      title: "Ödeme Yöntemi",
      dataIndex: "odeme",
      key: "odeme",
      responsive: ["lg"],
    },
    {
      title: "Ödeme Durumu",
      dataIndex: "odemeDurumu",
      key: "odemeDurumu",
    },
    {
      title: "Teslimat Durumu",
      dataIndex: "teslimatDurumu",
      key: "teslimatDurumu",
    },
    /*    {
      title: "Kupon",
      dataIndex: "kupon",
      key: "kupon",
      responsive: ["lg"],
    }, */
    {
      title: "Total",
      dataIndex: "total",
      key: "total",
    },
  ];
  const data = [];
  orders.map((order) => {
    data.push({
      key: order._id,
      siparisNo: order._id,
      odeme: order.paymentMethod,
      odemeDurumu: order.isPaid ? "Ödendi" : "Ödenmedi",
      teslimatDurumu: "Teslim Edilmedi",
      total: order.total + "₺",
      productData: order.products,
      userData: order.user,
    });
  });
  return (
    <div className={styles.siparisler}>
      <h3>Siparişler</h3>
      <Table
        bordered={true}
        columns={columns}
        expandable={{
          expandedRowRender,
        }}
        dataSource={data}
      />
    </div>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const orders = await Order.find({})
    .populate({ path: "user", model: User })
    ?.sort({ createdAt: -1 })
    .lean();
  await db.disconnectDb();
  return {
    props: {
      orders: JSON.parse(JSON.stringify(orders)),
    },
  };
}
