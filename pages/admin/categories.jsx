import { Form, InputNumber, Popconfirm, Table, Typography, Input } from "antd";
import styles from "@/styles/categories.module.scss";
import { useEffect, useState } from "react";
import axios from "axios";
import Loader from "@/components/loader";
import { toast } from "react-toastify";
import db from "@/utils/db";
import Category from "@/models/Category";

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
              message: `Lütfen Kategori Adı Giriniz!`,
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

export default function Categories({ categories }) {
  let originData = [];
  categories.map((category) =>
    originData.push({ key: category._id, name: category.name })
  );
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const [loading, setLoading] = useState(false);
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
        // newData.splice(index, 1, {
        //   ...item,
        //   ...row,
        // });
        try {
          setLoading(true);
          await axios
            .post("/api/categories/updateCategory", {
              key: item.key,
              name: row.name,
            })
            .then((data) => {
              let newData = [];
              data.data.categories.map((category) =>
                newData.unshift({ key: category._id, name: category.name })
              );
              console.log(newData);
              setData(newData);
              toast.success(data.data.message);
              setEditingKey("");
            })
            .catch((data) => toast.error(data.response.data.message));
          setLoading(false);
        } catch (error) {
          setLoading(false);
          console.log(error);
        }
      } else {
        newData.push(row);
        setData(newData);
        setEditingKey("");
      }
    } catch (errInfo) {
      console.log("Validate Failed:", errInfo);
    }
  };
  const handleDelete = async (key) => {
    try {
      setLoading(true);
      await axios
        .delete("/api/categories/updateCategory", { data: { key } })
        .then((gelen) => {
          let newData = [];
          gelen.data.category.map((data) =>
            newData.push({ key: data._id, name: data.name })
          );
          setData(newData);
          toast.success(gelen.data.message);
        })
        .catch((data) => toast.error(data.response.data.message));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const columns = [
    {
      title: "Kategori Adı",
      dataIndex: "name",
      width: "75%",
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
              onConfirm={() => handleDelete(record.key)}
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
  const onFinish = async (values) => {
    try {
      setLoading(true);
      await axios
        .post("/api/categories/addCategory", { values })
        .then((gelen) => {
          toast.success(gelen.data.message);
          let newData = [];
          gelen.data.category.map((data) =>
            newData.unshift({ key: data._id, name: data.name })
          );
          setData(newData);
        })
        .catch((data) => toast.error(data.response.data.message));
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  return (
    <div className={styles.categories}>
      {loading && <Loader />}
      <div className={styles.categories__top}>
        <h3>Kategoriler</h3>
        <Search
          placeholder="Kategori Ekle..."
          enterButton="Kaydet"
          style={{ marginBottom: "20px" }}
          size="large"
          onSearch={onFinish}
        />
      </div>
      <Form form={form} onFinish={onFinish} component={false}>
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
  );
}

export async function getServerSideProps(context) {
  await db.connectDb();
  const categories = await Category.find({})?.sort({ createdAt: -1 }).lean();
  await db.disconnectDb();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
    },
  };
}
