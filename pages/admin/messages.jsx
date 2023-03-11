import styles from "@/styles/messages.module.scss";
import { Table } from "antd";
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
    width : "10%",
    render: (status) =>
      status ? (
        <img width={50} height="50" src="/images/verified.png" alt="doğrulama resmi" />
      ) : (
        <img width={50} height="50" src="/images/unverified.png" alt="doğrulama resmi" />
      ),
  },
];
const data = [
  {
    key: "1",
    name: "Resul ÖZTÜRK",
    email: "res@admin.com",
    telno: "05415134790",
    subject: "Fasulle Fiyatları",
    message: "Bu Fasulle Çok Düşük Fiyata",
    status: false,
  },
  {
    key: "2",
    name: "Cevher KARAMAN",
    email: "cevo@admin.com",
    telno: "05414114141",
    subject: "Bu siteden naylon kova satabilir miyiz?",
    message: "Çok kar ederiz herkes ayağımıza gelir",
    status: false,
  },
  {
    key: "3",
    name: "Fatih ÖZHAN",
    email: "fatihozhan27@gmail.com ",
    telno: "05367701238",
    subject: "Bağlam",
    message: "Ben ne diyom sen ne diyon cesursun be gizlemiyon",
    status: false,
  },
];

export default function Messages() {
  const onChange = (pagination, filters, sorter, extra) => {
    console.log("params", pagination, filters, sorter, extra);
  };

  return (
    <div className={styles.messages}>
      <div className={styles.messages__title}>
        <h3>Mesajlar</h3>
      </div>
      <Table columns={columns} dataSource={data} onChange={onChange} bordered />
    </div>
  );
}
