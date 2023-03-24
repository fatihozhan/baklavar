import styles from "./styles.module.scss";
import Link from "next/link";
import {
  GrInstagram,
  GrSkype,
  GrTwitter,
  GrFacebookOption,
  GrMail,
} from "react-icons/gr";
import { HiMapPin } from "react-icons/hi2";
import Image from "next/image";
import BackToTop from "react-back-to-top-button";
import { IoIosArrowUp } from "react-icons/io";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
        <div className={`${styles.footer__top}`}>
          <div className={styles.footer__top_left}>
            <ul>
              <Link href="/hesabim">
                <li>Hesabım</li>
              </Link>
              <Link href={"/cart"}>
                <li>Sepetim</li>
              </Link>
              <Link href="/hesabim?tab=1">
                <li>Kişisel Bilgiler</li>
              </Link>
              <Link href={"/wishlist"}>
                <li>Wishlist</li>
              </Link>
            </ul>
          </div>
          <div className={styles.footer__top_right}>
            <GrFacebookOption />
            <GrTwitter />
            <GrSkype />
            <GrInstagram />
          </div>
        </div>
        <div className={styles.footer__main}>
          <div className={styles.footer__main_left}>
            <h2>RFC Bakliyat</h2>
            <p>
              Çevrimiçi market alışverişi ve teslimatı RFC Bakliyat Meyve,
              ekmek, tahıl, sebze satın alın.
            </p>
            <Image
              src={"/images/store.png"}
              height={43}
              width={300}
              alt="store resmi"
            />
          </div>
          <div className={styles.footer__main_middle}>
            <div>
              <h2>Hızlı Linkler</h2>
              <Link href="/about">Servislerimiz</Link>
              <Link href="/about">Firmamız Hakkında</Link>
              <Link href="/blog">En Son Haberler</Link>
              <Link href="/about">Takımımızla Tanışın</Link>
              <Link href="/shop">Ürünlerimiz</Link>
            </div>
            <div>
              <h2>Hesap</h2>
              <Link href="/my-account">Hesabınız</Link>
              <Link href="">Kargo Değerlendirmeleri</Link>
              <Link href="">Bağışlar</Link>
              <Link href="">Kargo Bilgileri</Link>
            </div>
            <div>
              <h2>Hakkımızda</h2>
              <Link href="/about">Firmamız Hakkında</Link>
              <Link href="/about">Takımımız</Link>
              <Link href="/iletisim">İletişim</Link>
              <Link href="/blog">Haberler ve Etkinlikler</Link>
            </div>
          </div>
          <div className={styles.footer__main_right}>
            <h1>Bizimle iletişime geçmekten veya aramaktan çekinmeyin!</h1>
            <p>
              <HiMapPin /> Nevşehir Üniversitesi Teknopark Fios Yazılım Sanayi
              ve Ticaret A.Ş. Nevşehir / Merkez / Türkiye 50000
            </p>
            <p>
              <GrMail /> iletisim@rfcbakliyat.com
            </p>
          </div>
        </div>
        <div className={styles.footer__bottom}>
          <p>Copyright by Fatih ÖZHAN. All Right Reserved.</p>
        </div>
      </div>
      <BackToTop
        showOnScrollUp
        showAt={100}
        speed={1500}
        easing="easeInOutQuint"
      >
        <span className={styles.backToTop}>
          <IoIosArrowUp />
        </span>
      </BackToTop>
    </div>
  );
}
