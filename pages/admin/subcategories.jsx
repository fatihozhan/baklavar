import {
  Form,
  InputNumber,
  Popconfirm,
  Table,
  Typography,
  Input,
  Select,
} from "antd";
import styles from "@/styles/subcategories.module.scss";
import { useState } from "react";

const originData = [];
for (let i = 0; i < 10; i++) {
  originData.push({
    key: i.toString(),
    name: "Fasulle",
    parentName: "Baklagil",
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
  const inputNode =
    dataIndex == "parentName" ? (
      <Select options={[{ value: "nohut", label: "Nohut" }]} />
    ) : inputType === "text" ? (
      <Input />
    ) : (
      <InputNumber />
    );
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
export default function SubCategories() {
  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [addItem , setAddItem] = useState({});
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const { Search } = Input;
  const edit = (record) => {
    form.setFieldsValue({
      name: "",
      parentName: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const handleDelete = (key) => {
    const newData = data.filter((item) => item.key !== key);
    setData(newData);
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
      title: "Kategori Adı",
      dataIndex: "name",
      width: "40%",
      editable: true,
    },
    {
      title: "Üst Kategori Adı",
      dataIndex: "parentName",
      width: "40%",
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
              title="Çıkmak İstemediğine Emin Misin?"
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
            <Typography.Link
              disabled={editingKey !== ""}
              style={{
                marginLeft: "10px",
                color: `${editingKey !== "" ? "#d4d4e8" : "red"} `,
              }}
            >
              <Popconfirm
                title="Silmek İstediğine Emin Misiniz?"
                onConfirm={() => handleDelete(record.key)}
                okText="Evet"
                cancelText="Hayır"
              >
                Sil
              </Popconfirm>
            </Typography.Link>
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
  const handleAdd = (e) => {
   console.log(e)
  };

  return (
    <div className={styles.categories}>
      <div className={styles.categories__top}>
        <h3>Alt Kategoriler</h3>
        <div
          style={{
            marginBottom: "20px",
            display: "flex",
            alignItems: "center",
            gap: "20px",
            justifyContent: "space-between",
          }}
        >
          <Select
            defaultValue={"Fasulye"}
            style={{ width: "33%", height: "41px" }}
            name="parentCategory"
            onChange={(e) => handleAdd(e)}
            options={[
              { value: "nohut", label: "Nohut" },
              { value: "fasulle", label: "Fasulle" },
            ]}
          />
          <Search
            placeholder="Alt Kategori Ekle..."
            enterButton="Kaydet"
            size="large"
            onChange={(e) => handleAdd(e)}
            style={{ width: "66%" }}
          />
        </div>
      </div>
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
  );
}
