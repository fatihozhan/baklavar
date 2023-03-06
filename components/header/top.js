import { Input, Select, Popover } from "antd";
import Link from "next/link";
import { useSpring, animated } from "@react-spring/web";
import Image from "next/image";
import Modal from "./headerModal";
import { BsApple, BsHandbag } from "react-icons/bs";
import { ImSpoonKnife } from "react-icons/im";
import { FaRegEye, FaLeaf } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import AltKategori from "./altKategori/altKategori";
import { MdPhone, MdOutlineKeyboardArrowRight } from "react-icons/md";
import { GoThreeBars } from "react-icons/go";
import { GiButterflyFlower, GiLindenLeaf, GiJellyBeans } from "react-icons/gi";
import { CiUser } from "react-icons/ci";
import styles from "./styles.module.scss";
import { useState } from "react";
const { Option } = Select;

export default function Top() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [open, setOpen] = useState(false);
  const [open1, setOpen1] = useState(false);
  const [open2, setOpen2] = useState(false);
  const [open3, setOpen3] = useState(false);
  const [toggle, setToggle] = useState(false);

  const content = (
    <div className={styles.popover}>
      <div className={styles.popover__wrapper}>
        <div>
          <FaRegEye />
          <Image
            src={"/images/products/tomatoes.jpg"}
            width="100"
            height={100}
            alt="domatesi resmi"
          />
        </div>
        <div>
          <p>Domatesler Domatesler 10 Numara domatesler</p>
          <p>
            1 x <b> ₺80.00 </b>
          </p>
        </div>
      </div>
      <div className={styles.popover__subtotal}>
        SUBTOTAL : <b> ₺80.00</b>
      </div>
      <div className={styles.popover__buttons}>
        <Link href="/cart">
          <button className={styles.primary_button}>Sepete Git</button>
        </Link>
        <button className={styles.primary_button}>Sipariş Ver</button>
      </div>
    </div>
  );

  const kategoriyeGoreAl = (
    <>
      <div className={styles.byCategories}>
        <ul>
          <li
            onMouseOver={() => setOpen(true)}
            onMouseLeave={() => setOpen(false)}
          >
            <div>
              <BsApple /> Taze Sebzeler
            </div>
            <div>
              <MdOutlineKeyboardArrowRight />
            </div>
            {open && <AltKategori subCategories={tazeSebzeler} />}
          </li>
          <li
            onMouseOver={() => setOpen1(true)}
            onMouseLeave={() => setOpen1(false)}
          >
            <div>
              <ImSpoonKnife />
              Et Ürünleri
            </div>
            <div>
              <MdOutlineKeyboardArrowRight />
            </div>
            {open1 && <AltKategori subCategories={etUrunleri} />}
          </li>
          <li>
            <div>
              <GiJellyBeans />
              Kiler Ürünleri
            </div>
          </li>
          <li
            onMouseOver={() => setOpen2(true)}
            onMouseLeave={() => setOpen2(false)}
          >
            <div>
              <FaLeaf /> Sezonluk Kutu
            </div>
            <div>
              <MdOutlineKeyboardArrowRight />
            </div>
            {open2 && <AltKategori subCategories={sezonlukKutu} />}
          </li>
          <li>
            <GiLindenLeaf />
            Günlük Ürünler & Yumurta
          </li>
          <li
            onMouseOver={() => setOpen3(true)}
            onMouseLeave={() => setOpen3(false)}
          >
            <div>
              <GiButterflyFlower />
              Ekmek & Yağ
            </div>
            <div>
              <MdOutlineKeyboardArrowRight />
            </div>
            {open3 && <AltKategori subCategories={ekmekYag} />}
          </li>
        </ul>
      </div>
    </>
  );
  const alisveris = (
    <div className={styles.navbar__left_popover}>
      <ul>
        <li>
          <Link href={"/shop"}>Ana Alışveriş</Link>
        </li>
        <li>Tekli Ürün</li>
        <li>Hesabım</li>
        <Link href="/cart">
          <li>Sepetim</li>
        </Link>
        <li>Siparişlerim</li>
      </ul>
    </div>
  );

  const pages = (
    <div className={styles.navbar__left_popover}>
      <ul>
        <Link href={"/iletisim"}>

        <li>İletişim</li>
        </Link>
        <li>Wishlist</li>
      </ul>
    </div>
  );
  const menuAnimation = useSpring({
    height: toggle ? "200px" : "0px",
    opacity: toggle ? 1 : 0,
  });

  return (
    <>
      <div className={styles.mobileTop}>
        <div className={styles.mobileTop__logo}>
          <h2 className={styles.top__logo}>LOGO</h2>
          <GoThreeBars onClick={() => setToggle((prev) => !prev)} />
        </div>
        {toggle && (
          <div
            className={`${styles.mobileTop__navbar}`}
            style={{ marginBottom: "40px" }}
          >
            <animated.div style={menuAnimation}>
              <ul>
                <li>
                  <Link href={"/"}>Anasayfa</Link>
                </li>
                <li>
                  <Link href={"/about"}>Hakkımızda</Link>
                </li>
                <li>
                  <Link href={"/shop"}>Alışveriş</Link>
                </li>
                <Link href="/blog">
                  <li>Blog</li>
                </Link>
                <Link href={"/media"}>
                  <li>Medya</li>
                </Link>
                <li>Sayfalar</li>
              </ul>
            </animated.div>
          </div>
        )}
      </div>
      <div className={styles.container}>
        <div className={styles.top}>
          <Modal isModalOpen={isModalOpen} setIsModalOpen={setIsModalOpen} />
          <div className={styles.top__logo}>
            <h2>LOGO</h2>
          </div>
          <div className={styles.top__search}>
            <Input.Group compact style={{ fontFamily: "Space Grotesk" }}>
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
              <p
                onClick={() => setIsModalOpen(true)}
                style={{ cursor: "pointer" }}
              >
                Hesap & Listeler
              </p>
            </div>
          </div>
          <div className={styles.top__cart}>
            <div className={styles.top__cart_icon}>
              <span>1</span>
              <BsHandbag />
            </div>
            <Popover content={content}>
              <Link href="/cart">
                <div style={{ cursor: "pointer" }}>
                  <p>Sepetim</p>
                  <p>₺0.00</p>
                </div>
              </Link>
            </Popover>
          </div>
        </div>
      </div>
      <div className={styles.container}>
        <div className={styles.navbar}>
          <div className={styles.navbar__left}>
            <div>
              <Popover content={kategoriyeGoreAl}>
                <div>
                  <GoThreeBars />
                  Kategoriye Göre Al
                  <IoIosArrowDown />
                </div>
              </Popover>
              <ul>
                <li>
                  <Link href={"/"}>Anasayfa</Link>
                </li>
                <li>
                  <Link href={"/about"}>Hakkımızda</Link>
                </li>
                <Popover content={alisveris}>
                  <li>
                    <Link href={"/shop"}>
                      Alışveriş <span>Yeni</span>
                    </Link>
                  </li>
                </Popover>
                <Link href="/blog">
                  <li>Blog</li>
                </Link>
                <Link href={"/media"}>
                  <li>Medya</li>
                </Link>
                <Popover content={pages}>
                  <li>Sayfalar</li>
                </Popover>
              </ul>
            </div>
          </div>
          <div className={styles.navbar__right}>
            <MdPhone /> <a href="tel: +905367701238">+90536 770 12 38 </a>
            <button className={styles.secondary_button}>Teklif Al</button>
          </div>
        </div>
      </div>
    </>
  );
}

const tazeSebzeler = [
  {
    title: "Meyveler",
    sub1: "Zeytinler",
    sub2: "Mantarlar",
    sub3: "Kivi",
    sub4: "Kirazlar",
    img: "lemon.jpg",
  },
  {
    title: "Sebzeler",
    sub1: "Yeşil Fasulye",
    sub2: "Brokoli",
    sub3: "Brüksel Lahanası",
    sub4: "Patates",
    img: "vegetables.jpg",
  },
  {
    title: "Organik",
    sub1: "Ispanak",
    sub2: "Avakado",
    sub3: "Çilek",
    sub4: "Kereviz",
    img: "tomatoes.jpg",
  },
];
const etUrunleri = [
  {
    title: "Meyveler",
    sub1: "Zeytinler",
    sub2: "Mantarlar",
    sub3: "Kivi",
    sub4: "Kirazlar",
    img: "lemon.jpg",
  },
  {
    title: "Sebzeler",
    sub1: "Yeşil Fasulye",
    sub2: "Brokoli",
    sub3: "Brüksel Lahanası",
    sub4: "Patates",
    img: "vegetables.jpg",
  },
  {
    title: "Organik",
    sub1: "Ispanak",
    sub2: "Avakado",
    sub3: "Çilek",
    sub4: "Kereviz",
    img: "tomatoes.jpg",
  },
];
const sezonlukKutu = [
  {
    title: "Meyveler",
    sub1: "Zeytinler",
    sub2: "Mantarlar",
    sub3: "Kivi",
    sub4: "Kirazlar",
    img: "lemon.jpg",
  },
  {
    title: "Sebzeler",
    sub1: "Yeşil Fasulye",
    sub2: "Brokoli",
    sub3: "Brüksel Lahanası",
    sub4: "Patates",
    img: "vegetables.jpg",
  },
  {
    title: "Organik",
    sub1: "Ispanak",
    sub2: "Avakado",
    sub3: "Çilek",
    sub4: "Kereviz",
    img: "tomatoes.jpg",
  },
];
const ekmekYag = [
  {
    title: "Meyveler",
    sub1: "Zeytinler",
    sub2: "Mantarlar",
    sub3: "Kivi",
    sub4: "Kirazlar",
    img: "lemon.jpg",
  },
  {
    title: "Sebzeler",
    sub1: "Yeşil Fasulye",
    sub2: "Brokoli",
    sub3: "Brüksel Lahanası",
    sub4: "Patates",
    img: "vegetables.jpg",
  },
  {
    title: "Organik",
    sub1: "Ispanak",
    sub2: "Avakado",
    sub3: "Çilek",
    sub4: "Kereviz",
    img: "tomatoes.jpg",
  },
];
