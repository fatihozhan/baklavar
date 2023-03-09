import styles from "@/styles/adminProducts.module.scss";
import Image from 'next/image'
import { Form, InputNumber, Popconfirm, Table, Typography, Input } from "antd";
import { useState } from "react";
const originData = [];
for (let i = 0; i < 5; i++) {
  originData.push({
    key: i.toString(),
    fotograf: <img src={"/images/products/grapes.jpg"} alt="Ürün Resmi" width={50} height="50" />,
    urunAdi : "Dünyanın En İyi Fasullesi",
    urunKodu : "SKU-OKD9384",
    aciklama : "Lorem Ipsum Doler Set",
    fiyat : 12,
    indirim : 45,
    stok : 45,
    kategori : "Baklagil",
    etiketler : "bakla, fasulle, iyi",
  });
}
const EditableCell = ({
  editing,
  dataIndex,
  title,
  inputType,
  record,
  index,
  children,
  ...restProps
}) => {
  const inputNode = inputType === "number" ? <InputNumber /> : <Input />;
  return (
    <td {...restProps}>
      {editing ? (
        <Form.Item
          name={dataIndex}
          style={{
            margin: 0,
          }}
          rules={[
            {
              required: true,
              message: `Lütfen ${title} Giriniz!`,
            },
          ]}
        >
          {inputNode}
        </Form.Item>
      ) : (
        children
      )}
    </td>
  );
};

export default function Products() {
  const handleChange = (e) => console.log(e);

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const { Search } = Input;
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };
  const save = async (key) => {
    try {
      const row = await form.validateFields();
      const newData = [...data];
      const index = newData.findIndex((item) => key === item.key);
      if (index > -1) {
        const item = newData[index];
        newData.splice(index, 1, {
          ...item,
          ...row,
        });
        setData(newData);
        setEditingKey("");
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const columns = [
    {
      title: "Fotoğraf" ,
      dataIndex: "fotograf",
      width: "25%",
      editable: true,
    },
    {
      title: "Ürün Adı",
      dataIndex: "urunAdi",
      width: "25%",
      editable: true,
    },
    {
      title: "Ürün Kodu",
      dataIndex: "urunKodu",
      width: "25%",
      editable: true,
    },
    {
      title: "Açıklama",
      dataIndex: "aciklama",
      width: "25%",
      editable: true,
    },
    {
      title: "Fiyat",
      dataIndex: "fiyat",
      width: "25%",
      editable: true,
    },
    {
      title: "İndirim",
      dataIndex: "indirim",
      width: "25%",
      editable: true,
    },
    {
      title: "Stok Durumu",
      dataIndex: "stok",
      width: "25%",
      editable: true,
    },
    {
      title: "Kategori",
      dataIndex: "kategori",
      width: "25%",
      editable: true,
    },
    {
      title: "Etiketler",
      dataIndex: "etiketler",
      width: "25%",
      editable: true,
    },
    {
      title: "İşlemler",
      dataIndex: "operation",
      render: (_, record) => {
        const editable = isEditing(record);
        return editable ? (
          <span>
            <Typography.Link
              onClick={() => save(record.key)}
              style={{
                marginRight: 8,
              }}
            >
              Kaydet
            </Typography.Link>
            <Popconfirm
              style={{ fontFamily: "Space Grotesk" }}
              title="Çıkmak İstediğinize Emin Misiniz?"
              onConfirm={cancel}
              okText="Evet"
              cancelText="Hayır"
            >
              <a>Çık</a>
            </Popconfirm>
          </span>
        ) : (
          <>
            <Typography.Link
              disabled={editingKey !== ""}
              onClick={() => edit(record)}
            >
              Düzenle
            </Typography.Link>
            <Popconfirm
              style={{ fontFamily: "Space Grotesk" }}
              title="Silmek İstedinize Emin Misiniz?"
              onConfirm={() => console.log("first")}
              okText="Evet"
              cancelText="Hayır"
            >
              <Typography.Link
                disabled={editingKey !== ""}
                style={{
                  marginLeft: "10px",
                  color: `${editingKey !== "" ? "" : "red"}`,
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
  const mergedColumns = columns.map((col) => {
    if (!col.editable) {
      return col;
    }
    return {
      ...col,
      onCell: (record) => ({
        record,
        inputType: col.dataIndex === "age" ? "number" : "text",
        dataIndex: col.dataIndex,
        title: col.title,
        editing: isEditing(record),
      }),
    };
  });

  return (
    <div className={styles.coupons}>
      <h3>Ürünler</h3>
 
      <div className={styles.coupons__table}>
        <Form form={form} component={false}>
          <Table
            components={{
              body: {
                cell: EditableCell,
              },
            }}
            bordered
            dataSource={data}
            columns={mergedColumns}
            rowClassName="editable-row"
            pagination={{
              onChange: cancel,
            }}
          />
        </Form>
      </div>
    </div>
  );
}
