import styles from "@/styles/createProduct.module.scss";
import {
  Checkbox,
  Form,
  Input,
  InputNumber,
  Select,
  Tag,
  Modal,
  theme,
  message,
  Upload,
} from "antd";
import { PlusOutlined } from "@ant-design/icons";
import { useEffect, useRef, useState } from "react";
import db from "@/utils/db";
import Category from "@/models/Category";
import Loader from "@/components/loader";
import axios from "axios";
import { toast } from "react-toastify";
import Product from "@/models/Product";
import { useRouter } from "next/router";

export default function CreateProduct({ categories, product }) {
  const { token } = theme.useToken();
  const router = useRouter();
  let productTags = product
    ? product.details.filter((detail) =>
        detail.name == "tags" ? detail.value : null
      )
    : null;
  let productBenefits = product
    ? product.details
        .filter((b) => (b.name == "benefits" ? b : ""))
        .map((b) => b.value)
    : null;

  const [tags, setTags] = useState(
    productTags
      ? productTags.map((t) => t.value)
      : ["Tarladan", "Fasulle", "Bakla"]
  );
  const [inputVisible, setInputVisible] = useState(false);
  const [inputValue, setInputValue] = useState(tags);
  const [loading, setLoading] = useState(false);
  const inputRef = useRef(null);
  useEffect(() => {
    if (inputVisible) {
      inputRef.current?.focus();
    }
  }, [inputVisible]);
  const handleClose = (removedTag) => {
    const newTags = tags.filter((tag) => tag !== removedTag);
    setTags(newTags);
  };
  //-------------Picture--------------
  const getBase64 = (file) =>
    new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);
      reader.onload = () => resolve(reader.result);
      reader.onerror = (error) => reject(error);
    });
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState(
    product && product.images.length > 0
      ? product.images.map((image, i) => {
          return { url: image, uid: i.toString(), status: "done" };
        })
      : []
  );
  const uploadButton = (
    <div>
      <PlusOutlined />
      <div
        style={{
          marginTop: 8,
        }}
      >
        Upload
      </div>
    </div>
  );
  const handlePreview = async (file) => {
    if (!file.url && !file.preview) {
      file.preview = await getBase64(file.originFileObj);
    }
    setPreviewImage(file.url || file.preview);
    setPreviewOpen(true);
    setPreviewTitle(
      file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
    );
  };
  const handleChange = ({ fileList: newFileList }) => setFileList(newFileList);
  //---------------------------------
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
  const imgControl = async (e) => {
    const types = ["image/jpg", "image/png", "image/jpeg", "image/gif"];
    if (!types.includes(e.type)) {
      message.error("Desteklenmeyen Dosya Biçimi");
      return Upload.LIST_IGNORE;
    }
    if (e.size > 1500000) {
      message.error("Fotoğraf Yükleme Limiti Aşıldı.");
      return Upload.LIST_IGNORE;
    }
    return e;
  };
  const tagChild = tags.map(forMap);
  const tagPlusStyle = {
    background: token.colorBgContainer,
    borderStyle: "dashed",
  };
  const formRef = useRef(null);
  const onFinish = async (values) => {
    values.tags = tags;
    values.id = router.query.duzenle ? router.query.duzenle : null;

    values.pictures = [];
    for (let i = 0; i < fileList.length; i++) {
      if (fileList[i].url) {
        values.pictures.push(fileList[i]);
        continue;
      }
      values.pictures.push(
        await new Promise((resolve) => {
          const reader = new FileReader();
          reader.readAsDataURL(fileList[i].originFileObj);
          reader.onload = () => resolve(reader.result);
        })
      );
    }

    try {
      setLoading(true);
      await axios
        .post("/api/products/", { values })
        .then((data) => {
          {
            toast.success(data.data.message);
            formRef.current.resetFields();
            setFileList([]);
            router.query.duzenle && router.push("/admin/products");
          }
        })
        .catch((error) => {
          toast.error(error.response.data.message);
          console.log(error);
        });
      setLoading(false);
    } catch (error) {
      console.log(error);
      setLoading(false);
    }
  };
  const initialValues = {
    name: router.query.duzenle && product ? product.name : "",
    description: router.query.duzenle && product ? product.description : "",
    brand: router.query.duzenle && product ? product.brand : "",
    price: router.query.duzenle && product ? product.price : "",
    stock: router.query.duzenle && product ? product.stock : "",
    category: router.query.duzenle && product ? product.category : null,
    code: router.query.duzenle && product ? product.code : "SKU-",
    benefits: router.query.duzenle && product ? productBenefits : "",
  };

  return (
    <div className={styles.createProduct}>
      {loading && <Loader />}
      <div className={styles.createProduct__title}>
        {router.query.duzenle ? <h3>Ürün Düzenle</h3> : <h3>Yeni Ürün</h3>}
        <Form
          ref={formRef}
          initialValues={initialValues}
          layout="vertical"
          onFinish={onFinish}
          name="addproduct"
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
            label="Marka"
            name={"brand"}
            rules={[
              { required: true, message: "Zorunlu Alan", min: "3", max: "150" },
            ]}
          >
            <Input placeholder="Ürün Üreticisi" />
          </Form.Item>
          <Form.Item
            label="Fiyat ₺"
            name={"price"}
            rules={[{ required: true, message: "Zorunlu Alan" }]}
          >
            <InputNumber
              min={0}
              addonAfter="₺"
              style={{ width: "100%" }}
              placeholder="Ürün Fiyatı"
            />
          </Form.Item>
          <Form.Item
            label="Stok Durumu"
            rules={[
              {
                required: true,
                type: "number",
                message: "Stok Bilgisi Girilmesi Zorunludur",
              },
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
            className={`${styles.select} ${styles.createProduct__select}`}
          >
            <Select placeholder={"Bir Kategori Seçniz."}>
              {categories?.map((category) => (
                <Select.Option key={category._id} value={category._id}>
                  {category.name}
                </Select.Option>
              ))}
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
          <Form.Item label="Upload" name="image">
            <>
              <Upload
                listType="picture-card"
                fileList={fileList}
                name="file"
                onPreview={handlePreview}
                beforeUpload={imgControl}
                onChange={handleChange}
              >
                {fileList.length >= 8 ? null : uploadButton}
              </Upload>
              <Modal
                open={previewOpen}
                title={previewTitle}
                footer={null}
                onCancel={() => setPreviewOpen(false)}
              >
                <img
                  alt="example"
                  style={{
                    width: "100%",
                  }}
                  src={previewImage}
                />
              </Modal>
            </>
          </Form.Item>
          <Form.Item label="Etiketler" name={"tags"}>
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
            rules={[{ required: true, message: "Zorunlu Alan" }]}
          >
            <Checkbox.Group>
              {benefits.map((benefit, i) => (
                <Checkbox key={i} value={benefit}>
                  {benefit}
                </Checkbox>
              ))}
            </Checkbox.Group>
          </Form.Item>
          <button
            style={{ width: "150px", padding: "5px" }}
            type="submit"
            className={styles.primary_button}
          >
            Kaydet
          </button>
        </Form>
      </div>
    </div>
  );
}
const benefits = ["vitamina", "Vitamin B", "Vitamin C", "Vitamin D"];

export async function getServerSideProps(context) {
  await db.connectDb();
  const { query } = context;
  let product;
  if (query.duzenle) {
    product = await Product.findById(query.duzenle);
  }
  const categories = await Category.find({}).sort({ createdAt: -1 }).lean();
  await db.disconnectDb();
  return {
    props: {
      categories: JSON.parse(JSON.stringify(categories)),
      product: product ? JSON.parse(JSON.stringify(product)) : null,
    },
  };
}
