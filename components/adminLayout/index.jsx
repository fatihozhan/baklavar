import styles from "./styles.module.scss";
import Link from "next/link";
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
import { useRouter } from "next/router";

export default function AdminLayout({ children }) {
  const [expand, setExpand] = useState(false);
  const { pathname } = useRouter();

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

        <div title="Dashboard" className={styles.adminLayout__sidebar_menu}>
          <Link href={"/admin/dashboard"} className={`${pathname.includes("dashboard") ? styles.active : ""}`}>
            <div className={styles.adminLayout__sidebar_menu_item}>
              <AiFillDashboard /> <b> Dashboard</b>
            </div>
          </Link>
          <Link href="/admin/sales" className={`${pathname.includes("sales") ? styles.active : ""}`}>
            <div
              title="Satışlar"
              className={styles.adminLayout__sidebar_menu_item}
            >
              <FcSalesPerformance /> <b> Satışlar</b>
            </div>
          </Link>
          <Link href="/admin/siparisler" className={`${pathname.includes("siparisler") ? styles.active : ""}`}>
            <div
              title="Siparişler"
              className={styles.adminLayout__sidebar_menu_item}
            >
              <IoReorderFour /> <b> Siparişler</b>
            </div>
          </Link>
          <Link href={"/admin/users"} className={`${pathname.includes("users") ? styles.active : ""}`}>
            <div
              title="Kullanıcılar"
              className={styles.adminLayout__sidebar_menu_item}
            >
              <ImUsers /> <b> Kullanıcılar</b>
            </div>
          </Link>
          <Link href={"/admin/messages"} className={`${pathname.includes("messages") ? styles.active : ""}`}>
            <div
              title="Mesajlar"
              className={styles.adminLayout__sidebar_menu_item}
            >
              <AiFillMessage /> <b> Mesajlar</b>
            </div>
          </Link>
          <h5>Ürünler</h5>
          <Link href={"/admin/products"} className={`${pathname.includes("products") ? styles.active : ""}`}>
            <div
              title="Tüm Ürünler"
              className={styles.adminLayout__sidebar_menu_item}
            >
              <FaThList /> <b> Tüm Ürünler</b>
            </div>
          </Link>
          <Link href={"/admin/createProduct"} className={`${pathname.includes("createProduct") ? styles.active : ""}`}>
            <div
              title="Yeni Ürün"
              className={styles.adminLayout__sidebar_menu_item}
            >
              <AiFillPlusCircle /> <b> Yeni Ürün</b>
            </div>
          </Link>
          <h5>Kategoriler</h5>
          <Link href={"/admin/categories"} className={`${pathname == "/admin/categories" ? styles.active : ""}`}>
            <div
              title="Kategoriler"
              className={styles.adminLayout__sidebar_menu_item}
            >
              <MdCategory /> <b> Kategoriler </b>
            </div>
          </Link>
          <Link href={"/admin/subcategories"} className={`${pathname.includes("subcategories") ? styles.active : ""}`}>
            <div
              title="Alt Kategoriler1"
              className={styles.adminLayout__sidebar_menu_item}
            >
              <MdCategory /> <b> Alt Kategoriler</b>
            </div>
          </Link>
          <h5>Kuponlar</h5>
          <Link href={"/admin/coupons"} className={`${pathname.includes("coupons") ? styles.active : ""}`}>
            <div
              title="Kuponlar"
              className={styles.adminLayout__sidebar_menu_item}
            >
              <RiCoupon5Fill /> <b> Kuponlar</b>
            </div>
          </Link>
        </div>
      </div>
      <main style={expand ? { marginLeft: "70px" } : { marginLeft: "270px" }}>
        {children}
      </main>
    </div>
  );
}
