import styles from "./styles.module.scss";
import {
  AiFillDashboard,
  AiFillPlusCircle,
  AiFillMessage,
} from "react-icons/ai";
import { RiCoupon5Fill } from "react-icons/ri";
import {
  MdCategory,
  MdArrowBackIosNew,
  MdArrowForwardIos,
} from "react-icons/md";
import { FaThList } from "react-icons/fa";
import { ImUsers } from "react-icons/im";
import { FcSalesPerformance } from "react-icons/fc";
import { IoReorderFour } from "react-icons/io5";
import { Input } from "antd";
import Image from "next/image";
import { useState } from "react";

export default function AdminLayout({ children }) {
  const [expand, setExpand] = useState(false);
  return (
    <div className={styles.adminLayout}>
      <div
        onClick={() => setExpand(!expand)}
        className={expand ? styles.arrowShort : styles.arrow}
      >
        {expand ? <MdArrowForwardIos /> : <MdArrowBackIosNew />}
      </div>
      <div
        className={`${styles.adminLayout__sidebar} ${
          expand ? styles.short : ""
        }`}
      >
        <div className={styles.adminLayout__sidebar_top}>
          <div>
            <Image
              src={"/images/favicon.png"}
              height="50"
              width={"50"}
              alt="site logosu"
            />
            <h5> Baklavar</h5>
          </div>
          <div>
            <Image
              src={"/images/customer/customer1.jpeg"}
              height="50"
              width={"50"}
              alt="user resmi"
            />
            <h5>Fatih ÖZHAN</h5>
          </div>
        </div>
        <div className={styles.adminLayout__sidebar_search}>
          <Input.Search placeholder="Ara..." />
        </div>
        <div className={styles.adminLayout__sidebar_menu}>
          <div className={styles.adminLayout__sidebar_menu_item}>
            <AiFillDashboard /> <b> Dashboard</b>
          </div>
          <div className={styles.adminLayout__sidebar_menu_item}>
            <FcSalesPerformance /> <b> Satışlar</b>
          </div>
          <div className={styles.adminLayout__sidebar_menu_item}>
            <IoReorderFour /> <b> Siparişler</b>
          </div>
          <div className={styles.adminLayout__sidebar_menu_item}>
            <ImUsers /> <b> Kullanıcılar</b>
          </div>
          <div className={styles.adminLayout__sidebar_menu_item}>
            <AiFillMessage /> <b> Mesajlar</b>
          </div>
          <h5>Ürünler</h5>
          <div className={styles.adminLayout__sidebar_menu_item}>
            <FaThList /> <b> Tüm Ürünler</b>
          </div>
          <div className={styles.adminLayout__sidebar_menu_item}>
            <AiFillPlusCircle /> <b> Yeni Ürün</b>
          </div>
          <h5>Kategoriler</h5>
          <div className={styles.adminLayout__sidebar_menu_item}>
            <MdCategory /> <b> Kategoriler </b>
          </div>
          <div className={styles.adminLayout__sidebar_menu_item}>
            <MdCategory /> <b> Alt Kategoriler</b>
          </div>
          <h5>Kuponlar</h5>
          <div className={styles.adminLayout__sidebar_menu_item}>
            <RiCoupon5Fill /> <b> Kuponlar</b>
          </div>
        </div>
      </div>
      <main style={expand ? { marginLeft : "70px"}: { marginLeft : "270px"}} >{children}</main>
    </div>
  );
}
