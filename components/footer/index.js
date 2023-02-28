import styles from "./styles.module.scss";
import Link from "next/link";
import {
  GrInstagram,
  GrSkype,
  GrTwitter,
  GrFacebookOption,
  GrMail
} from "react-icons/gr";
import {HiMapPin} from 'react-icons/hi2'
import Image from "next/image";

export default function Footer() {
  return (
    <div className={styles.footer}>
      <div className={styles.container}>
      <div className={`${styles.footer__top}`}>
        <div className={styles.footer__top_left}>
          <ul>
            <li>Hesabım</li>
            <li>Sepetim</li>
            <li>Kişisel Bilgiler</li>
            <li>Wishlist</li>
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
          <h2>LOGO</h2>
          <p>
            Çevrimiçi market alışverişi ve teslimatı Baklavar'da. Meyve, ekmek,
            tahıl, sebze satın alın.
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
            <Link href="">Servislerimiz</Link>
            <Link href="">Firmamız Hakkında</Link>
            <Link href="">En Son Haberler</Link>
            <Link href="">Takımımızla Tanışın</Link>
            <Link href="">Ürünlerimiz</Link>
          </div>
          <div>
            <h2>Hesap</h2>
            <Link href="">Hesabınız</Link>
            <Link href="">Kargo Değerlendirmeleri</Link>
            <Link href="">Bağışlar</Link>
            <Link href="">Kargo Bilgileri</Link>
          </div>
          <div>
            <h2>Hakkımızda</h2>
            <Link href="">Firmamız Hakkında</Link>
            <Link href="">Takımımız</Link>
            <Link href="">İletişim</Link>
            <Link href="">Haberler ve Etkinlikler</Link>
            <Link href="">Sipariş Takibi</Link>
          </div>
        </div>
        <div className={styles.footer__main_right}>
            <h1>Bizimle iletişime geçmekten veya aramaktan çekinmeyin!</h1>
            <p>
                <HiMapPin/> Nevşehir Üniversitesi Teknopark Fios Yazılım Sanayi ve Ticaret A.Ş. Nevşehir / Merkez / Türkiye 50000
            </p>
            <p>
                <GrMail/> iletisim@baklavar.com
            </p>
        </div>
      </div>
      <div className={styles.footer__bottom}>
        <p>Copyright by Fatih ÖZHAN. All Right Reserved.</p>
      </div>
      </div>
    </div>
  );
}
