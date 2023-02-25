import { BiArrowToBottom } from "react-icons/bi";
import styles from "./styles.module.scss";

export default function Navbar() {
  return (
    <>
      <div className={styles.navbar}>
        <div className={styles.navbar__left}>
          <ul>
            <li>USD <BiArrowToBottom/></li>
            <li>ENGLISH <BiArrowToBottom/></li>
          </ul>
        </div>
        <div className={styles.navbar__right}>
          <ul>
            <li>CONTACT</li>
            <li>MY ACCOUNT</li>
            <li>WHISHLIST</li>
            <li>SHOPPING CART</li>
            <li>CHECKOUT</li>
          </ul>
        </div>
      </div>
    </>
  );
}
