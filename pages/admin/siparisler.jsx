import styles from "@/styles/siparisler.module.scss";
import Image from 'next/image'
import { DownOutlined } from "@ant-design/icons";
import { Badge, Dropdown, Space, Table } from "antd";

const expandedRowRender = () => {
  const columns = [
    {
      title: "Fotoğraf",
      dataIndex: "fotograf",
      key: "fotograf",
    },
    {
      title: "Kullanıcı",
      dataIndex: "kullanici",
      key: "kullanici",
    },
    {
      title: "Email",
      dataIndex : "email",
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
      dataIndex : "boyut",
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
  const data2 = [];
  for (let i = 0; i < 1; ++i) {
    data2.push({
      key: i.toString(),
      fotograf: <Image src="/images/products/grapes.jpg" height={50} width="50" alt="Kullanıcı Resmi" />,
      urunAdi: "Kuru Üzümün Kurutulmuşunun Kurusu",
      boyut: "5 Kg",
      miktar: "3",
      fiyat: "34.00₺",
    });
  }
  const data = [];
  for (let i = 0; i < 1; ++i) {
    data.push({
      key: i.toString(),
      fotograf: <Image src="/images/customer/customer1.jpeg" height={50} width="50" alt="Kullanıcı Resmi" />,
      kullanici: "Cevher KARAMAN",
      email: "Cevo123@baklavar.com",
      kargoDetaylari: "Bekliyor",
    });
  }
  return (<> <Table columns={columns} dataSource={data} pagination={false} /> <Table columns={columnsOrder} dataSource={data2} pagination={false} /> </>);
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
  {
    title: "Kupon",
    dataIndex: "kupon",
    key: "kupon",
  },
  {
    title: "Total",
    dataIndex: "total",
    key: "total",
  },
];
const data = [];
for (let i = 0; i < 3; ++i) {
  data.push({
    key: i.toString(),
    siparisNo: "4FD56SA4F3D5S4A3F5D",
    odeme: "Kredi Kartı",
    odemeDurumu: "Ödendi",
    teslimatDurumu: "Teslim Edilmedi",
    kupon: "FARECE",
    total: "34.00 ₺",
  });
}

export default function Siparisler() {
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
