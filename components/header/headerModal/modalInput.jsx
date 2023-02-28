import { Input } from "antd";
import styles from "./styles.module.scss";

export default function ModalInput({ icon, placeholder, type, name, onChange, style }) {
  return (
    <div className={styles.modal__input}>
      <Input
        size="large"
        placeholder={placeholder}
        prefix={icon}
        bordered={false}
        type={type}
        name={name}
        onChange={onChange}
        style={style}
      />
    </div>
  );
}
