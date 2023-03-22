import styles from "@/styles/adminProducts.module.scss";
import { useRouter } from "next/router";
import { Form, Popconfirm, Table, Typography } from "antd";
import { useState } from "react";
import db from "@/utils/db";
import Product from "@/models/Product";
import Category from "@/models/Category";
import axios from "axios";
import Loader from "@/components/loader";
import { toast } from "react-toastify";

export default function Products({ products }) {
  const originData = [];
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  products.map((product) =>
    originData.push({
      key: product._id,
      fotograf: (
        <img
          src={product.images[0]}
          alt="ürün resmi"
          width={50}
          height="50"
        ></img>
      ),
      urunAdi: product.name,
      urunKodu: product.code,
      aciklama: product.description,
      fiyat: product.price + "₺",
      // indirim : 0,
      stok: product.stock,
      kategori: product.category.name,
      etiketler: product.details.map((detail) =>
        detail.name == "tags" ? detail.value + " " : ""
      ),
    })
  );
  const deleteProduct = async (key) => {
    try {
      setLoading(true);
      await axios
        .delete("/api/products", { data: { key } })
        .then((info) => {
          toast.success(info.data.message);
          info.data.success &&
            setData(originData.filter((product) => product.key != key));
        })
        .catch((data) => {
          toast.error(
            typeof data.response.data == "string"
              ? data.response.data
              : data.response.data.message
          );
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };

  const columns = [
    {
      title: "Fotoğraf",
      dataIndex: "fotograf",
      width: "5%",
    },
    {
      title: "Ürün Adı",
      dataIndex: "urunAdi",
      width: "8%",
    },
    {
      title: "Ürün Kodu",
      dataIndex: "urunKodu",
      width: "8%",
    },
    {
      title: "Açıklama",
      dataIndex: "aciklama",
      width: "20%",
    },
    {
      title: "Fiyat",
      dataIndex: "fiyat",
      width: "8%",
    },
    /*     {
      title: "İndirim",
      dataIndex: "indirim",
      width: "25%",
    }, */
    {
      title: "Stok Durumu",
      dataIndex: "stok",
      width: "8%",
    },
    {
      title: "Kategori",
      dataIndex: "kategori",
      width: "10%",
    },
    {
      title: "Etiketler",
      dataIndex: "etiketler",
      width: "10%",
    },
    {
      title: "İşlemler",
      dataIndex: "operation",
      width: "18%",
      render: (_, record) => {
        return (
          <>
            <Typography.Link
              onClick={() => {
                router.push(`/admin/createProduct?duzenle=${record.key}`);
              }}
            >
              Düzenle
            </Typography.Link>
            <Popconfirm
              style={{ fontFamily: "Space Grotesk" }}
              title="Silmek İstedinize Emin Misiniz?"
              onConfirm={() => deleteProduct(record.key)}
              okText="Evet"
              cancelText="Hayır"
            >
              <Typography.Link
                style={{
                  marginLeft: "10px",
                  color: "red",
                }}
              >
                Sil
              </Typography.Link>
            </Popconfirm>
          </>
        );
      },
    },
  ];

  return (
    <div className={styles.coupons}>
      <h3>Ürünler</h3>
      {loading && <Loader />}
      <div className={styles.coupons__table}>
        <Form form={form} component={false}>
          <Table
            bordered
            dataSource={data}
            columns={columns}
            rowClassName="editable-row"
          />
        </Form>
      </div>
    </div>
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const products = await Product.find({})
    ?.populate({ path: "category", model: Category })
    ?.sort({ createdAt: -1 })
    .lean();
  await db.disconnectDb();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
    },
  };
}
