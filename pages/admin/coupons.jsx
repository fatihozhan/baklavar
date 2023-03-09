import styles from "@/styles/coupons.module.scss";
import { DatePicker } from "antd";
import { Form, InputNumber, Popconfirm, Table, Typography, Input } from "antd";
import { useState } from "react";
const { Search } = Input;
const { RangePicker } = DatePicker;
const originData = [];
for (let i = 0; i < 5; i++) {
  originData.push({
    key: i.toString(),
    coupon: "FARECE",
    discount: 45,
    dates: "Fri Mar 10 2023 12:13:45 - Fri Mar 17 2023 11:12:51",
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

export default function Coupons() {
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
      title: "Kupon",
      dataIndex: "coupon",
      width: "25%",
      editable: true,
    },
    {
      title: "İndirim Miktarı",
      dataIndex: "discount",
      width: "25%",
      editable: true,
    },
    {
      title: "Tarihler",
      dataIndex: "dates",
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
      <h3>Kuponlar</h3>
      <div
        className={styles.coupons__entry}
        style={{ display: "flex", gap: "20px", flexDirection: "column" }}
      >
        <Search placeholder="Kupon Kodu..." enterButton="Kupon" size="large" />
        <Search
          placeholder="İndirim Miktarı..."
          enterButton="İndirim"
          size="large"
          type="number"
          min={0}
          max={100}
        />
      </div>
      <div className={styles.coupons__dates} style={{ marginTop: "20px" }}>
        <h6>Başlama ve Bitiş Tarihlerini Seçiniz</h6>
        <RangePicker
          onChange={(e) => handleChange(e)}
          format={"DD-MM-YYYY:hh-mm"}
          showTime
          size="large"
          placeholder={["Başlama Tarihi", "Bitiş Tarihi"]}
        />
      </div>
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
