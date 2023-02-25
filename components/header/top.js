import { Input, Select } from "antd";
import Modal from './headerModal'
import { BsSearch, BsHandbag } from "react-icons/bs";
import { CiUser } from "react-icons/ci";
import styles from "./styles.module.scss";
import { useState } from "react";
const { Option } = Select;

export default function Top() {
  const [isModalOpen, setIsModalOpen] = useState(false)
  return (
    <div className={styles.top}>
      <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
      <div className={styles.top__logo}>
        <h2>LOGO</h2>
      </div>
      <div className={styles.top__search}>
        <Input.Group compact style={{ fontFamily: "Space Grotesk"}}>
          <Select
            bordered={false}
            defaultValue="Kategori"
            style={{ width: "30%" }}
          >
            <Option value="nohut">Nohut</Option>
            <Option value="fasulye">Fasulye</Option>
          </Select>
          <Input.Search
            bordered={false}
            style={{ width: "70%" }}
            placeholder="Ürün Ara.."
            options={[{ value: "text 1" }, { value: "text 2" }]}
            
          />
        </Input.Group>
      </div>
      <div className={styles.top__user}>
        <div className={styles.top__user_icon}>
          <CiUser />
        </div>
        <div className={styles.top__user_infos}>
          <p>Hoş Geldin.. Giriş Yap</p>
          <p onClick={()=> setIsModalOpen(true)} style={{cursor : "pointer"}}>Hesap & Listeler</p>
        </div>
      </div>
      <div className={styles.top__cart}>
        <div className={styles.top__cart_icon}>
          <span>0</span>
          <BsHandbag />
        </div>
        <div>
          <p>Sepetim</p>
          <p>₺0.00</p>
        </div>
      </div>
    </div>
  );
}
