import styles from "@/styles/users.module.scss";
import Image from "next/image";
import { Form, Input, InputNumber, Popconfirm, Table, Typography } from "antd";
import { useState } from "react";

const originData = [];
for (let i = 0; i < 5; i++) {
  originData.push({
    key: i.toString(),
    fotograf: (
      <img
        src="/images/customer/customer1.jpeg"
        height={50}
        width="50"
        alt="User Resmi"
      />
    ),
    adSoyad: "Fatih ÖZHAN",
    email: "fatihozhan27@gmail.com",
    dogrulama: (
      <img
        src={"/images/verified.png"}
        height="50"
        width={50}
        alt="Doğrulanmış Hesap"
      />
    ),
    admin: (
      <img
        src={"/images/unverified.png"}
        height="50"
        width={50}
        alt="Doğrulanmış Hesap"
      />
    ),
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
              message: `Lütfen ${title} Bilgisini Giriniz!`,
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

export default function Users() {
  const columns = [
    {
      title: "Fotoğraf",
      dataIndex: "fotograf",
      width: "10%",
      editable: false,
      responsive : ["lg"],
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
      editable: false,
    },
    {
      title: "Admin",
      dataIndex: "admin",
      width: "10%",
      editable: false,
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
              Save
            </Typography.Link>
            <Popconfirm
              title="Çıkmak İstediğinize Emin Misiniz?"
              onConfirm={cancel}
            >
              <a>Cancel</a>
            </Popconfirm>
          </span>
        ) : (
          <Typography.Link
            disabled={editingKey !== ""}
            onClick={() => edit(record)}
          >
            Edit
          </Typography.Link>
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

  const [form] = Form.useForm();
  const [data, setData] = useState(originData);
  const [editingKey, setEditingKey] = useState("");
  const isEditing = (record) => record.key === editingKey;
  const edit = (record) => {
    form.setFieldsValue({
      adSoyad: "",
      email: "",
      ...record,
    });
    setEditingKey(record.key);
  };
  const cancel = () => {
    setEditingKey("");
  };

  return (
    <div className={styles.users}>
      <h3>Kullanıcılar</h3>
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
