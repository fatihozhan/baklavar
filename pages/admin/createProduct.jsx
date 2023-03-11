import styles from "@/styles/createProduct.module.scss";
import {
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  theme,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";

export default function CreateProduct() {
  const { token } = theme.useToken();
  const [tags, setTags] = useState(["Tarladan", "Fasulle", "Bakla"]);
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState("");
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    console.log(newTags);
    setTags(newTags);
  };
  const showInput = () => {
    setInputVisible(true);
  };
  const handleInputChange = (e) => {
    setInputValue(e.target.value);
  };
  const handleInputConfirm = () => {
    if (inputValue && tags.indexOf(inputValue) === -1) {
      setTags([...tags, inputValue]);
    }
    setInputVisible(false);
    setInputValue("");
  };
  const forMap = (tag) => {
    const tagElem = (
      <Tag
        closable
        onClose={(e) => {
          e.preventDefault();
          handleClose(tag);
        }}
      >
        {tag}
      </Tag>
    );
    return (
      <span
        key={tag}
        style={{
          display: "inline-block",
        }}
      >
        {tagElem}
      </span>
    );
  };
  const tagChild = tags.map(forMap);
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };
  const onFinish = (values) => console.log(values);

  return (
    <div className={styles.createProduct}>
      <div className={styles.createProduct__title}>
        <h3>Yeni Ürün</h3>
        <Form
          layout="vertical"
          onFinish={onFinish}
          name="addproduct"
          initialValues={{
            name: "",
            description: "",
            category: "tahıl",
            code: "SKU-",
          }}
        >
          <Form.Item
            label="Ürün Adı"
            name={"name"}
            rules={[
              { required: true, message: "Zorunlu Alan", min: "3", max: "30" },
            ]}
          >
            <Input placeholder="Ürün Adı..." />
          </Form.Item>
          <Form.Item
            label="Açıklama"
            name={"description"}
            rules={[
              { required: true, message: "Zorunlu Alan", min: "3", max: "150" },
            ]}
          >
            <Input placeholder="Açıklama..." />
          </Form.Item>
          <Form.Item
            label="Stok Durumu"
            rules={[
              { required: true,  type:"number", message: "Stok Bilgisi Girilmesi Zorunludur" },
            ]}
            name="stock"
          >
            <InputNumber
              placeholder="Stok Adedi"
              min={0}
              style={{ width: "100%" }}
            />
          </Form.Item>
          <Form.Item
            label="Kategori"
            rules={[{ required: true, message: "Kategori girilmelidir" }]}
            name="category"
          >
            <Select defaultValue={"tahıl"}>
              <Select.Option value="baklagil"> Baklagil </Select.Option>
              <Select.Option value="tahıl"> Tahıl </Select.Option>
              <Select.Option value="kurumeyve"> Kuru Meyve </Select.Option>
            </Select>
          </Form.Item>
          <Form.Item
            label="Ürün Kodu"
            name={"code"}
            rules={[
              { required: true, message: "Zorunlu Alan", min: "3", max: "30" },
            ]}
          >
            <Input placeholder="Ürün Kodu" />
          </Form.Item>
          <Form.Item
            label="Upload"
            onChange={(e) => console.log(e)}
            valuePropName="fileList"
          >
            <Upload listType="picture-card">
              <div>
                <PlusOutlined />
                <div style={{ marginTop: 8 }}>Upload</div>
              </div>
            </Upload>
          </Form.Item>
          <Form.Item
            label="Etiketler"
            name={"tags"}
            
          >
            <>
              <div
                style={{
                  marginBottom: 16,
                }}
              >
                {tagChild}
              </div>
              {inputVisible ? (
                <Input
                  ref={inputRef}
                  type="text"
                  size="small"
                  style={{
                    width: 78,
                  }}
                  value={inputValue}
                  onChange={handleInputChange}
                  onBlur={handleInputConfirm}
                  onPressEnter={handleInputConfirm}
                />
              ) : (
                <Tag onClick={showInput} style={tagPlusStyle}>
                  <PlusOutlined /> Yeni Etiket
                </Tag>
              )}
            </>
          </Form.Item>
          <Form.Item
            label="Faydalı Bilgiler"
            name="benefits"
            valuePropName="checked"
            rules={[
              { required: true, message: "Zorunlu Alan"},
            ]}
          >
            <Checkbox.Group>
              <Checkbox value={"vitamina"}>Vitamin A</Checkbox>
              <Checkbox value={"vitaminb"}>Vitamin B</Checkbox>
              <Checkbox value={"vitaminc"}>Vitamin C</Checkbox>
            </Checkbox.Group>
          </Form.Item>
          <button style={{width : "150px", padding : "5px"}} type="submit" className={styles.primary_button}>
            Kaydet
          </button>
        </Form>
      </div>
    </div>
  );
}
