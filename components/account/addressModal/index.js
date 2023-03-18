import { Modal, Select, Form, Input, InputNumber } from "antd";
import styles from "@/styles/hesabim.module.scss";
import { useRef, useState } from "react";
import axios from "axios";
import { toast } from "react-toastify";

export default function AddressModal({
  isModalOpen,
  setIsModalOpen,
  cities,
  setLoading,
  currentUser,
  setCurrentUser,
  currentAddress,
  modalKey,
}) {
  const formRef = useRef(null);
  const [selectedCity, setSelectedCity] = useState("");
  const initialValues = {
    name: currentAddress ? currentAddress.firstName : "",
    surname: currentAddress ? currentAddress.lastName : "",
    phone: currentAddress ? currentAddress.phoneNumber : "",
    city: currentAddress ? currentAddress.city : "",
    ilce: currentAddress ? currentAddress.state : "",
    mahalle: currentAddress ? currentAddress.mahalle : "",
    zipCode: currentAddress ? currentAddress.zipCode : "",
    adres: currentAddress ? currentAddress.address1 : "",
    baslik: currentAddress ? currentAddress.title : "",
  };

  const addressSubmit = async (addresses) => {
    const values = { addresses };
    try {
      setLoading(true);
      values.email = currentUser.email;
      await axios
        .post("/api/users/updateUser", {
          values,
        })
        .then((data) => {
          setTimeout(() => {
            setIsModalOpen(false);
          }, 1000);
          formRef.current.resetFields();
          setLoading(false);
          setCurrentUser(data.data.user);
          toast.success(data.data.message);
        })
        .catch((data) => {
          setLoading(false);
          toast.error(data.response.data.message);
          console.log(data);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const updateAddress = async (addressUpdate) => {
    addressUpdate._id = currentAddress._id;
    const values = { addressUpdate };
    try {
      setLoading(true);
      values.email = currentUser.email;
      await axios
        .post("/api/users/updateUser", {
          values,
        })
        .then((data) => {
          setTimeout(() => {
            setIsModalOpen(false);
          }, 1000);
          formRef.current.resetFields();
          setLoading(false);
          setCurrentUser(data.data.user);
          toast.success(data.data.message);
        })
        .catch((data) => {
          setLoading(false);
          toast.error(
            data.response.data != {}
              ? data.response.data
              : data.response.data.message
          );
          console.log(data);
        });
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <Modal
        title={currentAddress ? "Adresi Düzenle" : "Adres Ekle"}
        className={styles.hesabim__content_address_modal}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={false}
        key={modalKey}
      >
        <Form
          layout="vertical"
          ref={formRef}
          onFinish={currentAddress ? updateAddress : addressSubmit}
          initialValues={initialValues}
        >
          <div style={{ display: "flex", gap: "15px" }}>
            <Form.Item
              rules={[{ required: true, message: "Zorunlu Alan" }]}
              style={{ flex: "1" }}
              name={"name"}
              label="Ad"
            >
              <Input />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Zorunlu Alan" }]}
              style={{ flex: "1" }}
              name={"surname"}
              label="Soyad"
            >
              <Input />
            </Form.Item>
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            <Form.Item
              rules={[{ required: true, message: "Zorunlu Alan" }]}
              style={{ flex: "1" }}
              name={"phone"}
              label="Telefon"
            >
              <Input type="tel" placeholder="0500-000-67-00" />
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Zorunlu Alan" }]}
              style={{ flex: "1" }}
              name={"city"}
              label="Şehir"
            >
              <Select
                className={styles.selects}
                onChange={(e) =>{
                  setSelectedCity(cities.find((city) => city.il_adi == e))
                }
                }
              >
                {cities &&
                  cities?.map((city) => (
                    <Select.Option key={city.alan_kodu} value={city.il_adi}>
                      {JSON.parse(JSON.stringify(city.il_adi))}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
          </div>
          <div style={{ display: "flex", gap: "15px" }}>
            <Form.Item
              rules={[{ required: true, message: "Zorunlu Alan" }]}
              style={{ flex: "1" }}
              name={"ilce"}
              label="ilçe"
            >
              <Select className={styles.selects} disabled={!selectedCity}>
                {selectedCity.ilceler &&
                  selectedCity?.ilceler.map((ilce) => (
                    <Select.Option key={ilce.ilce_kodu} value={ilce.ilce_adi}>
                      {ilce.ilce_adi}
                    </Select.Option>
                  ))}
              </Select>
            </Form.Item>
            <Form.Item
              rules={[{ required: true, message: "Zorunlu Alan" }]}
              style={{ flex: "1" }}
              name={"mahalle"}
              label="Mahalle"
            >
              <Input />
            </Form.Item>
          </div>
          <Form.Item
            rules={[{ required: true, message: "Zorunlu Alan" }]}
            name={"zipCode"}
            label="Posta Kodu"
          >
            <InputNumber style={{ width: "100%" }} />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Zorunlu Alan" }]}
            label="Adres"
            name={"adres"}
          >
            <Input.TextArea rows={4} placeholder="Cadde, Sokak, Kapı No:" />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "Zorunlu Alan" }]}
            label="Adres Başlığı"
            name={"baslik"}
          >
            <Input />
          </Form.Item>
          <button className={styles.primary_button}>
            {currentAddress ? "Güncelle" : "Kaydet"}
          </button>
        </Form>
      </Modal>
    </div>
  );
}
