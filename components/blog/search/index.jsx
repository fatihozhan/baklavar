import styles from "@/styles/blog.module.scss";
import Image from "next/image";
import Inputs from "@/components/input";
import { blogInfo } from "@/pages/blog/index";

export default function BlogSearch() {
  return (
    <div className={styles.blog__search}>
      <Image
        src={"/images/blog/sidebar1.png"}
        height="200"
        width={"300"}
        alt="sidebar1"
      />
      <h3>Yiyecek Blogglerları</h3>
      <p>
        Organik gıdalar, uygun sağlık almak için güvenebileceğimiz tek
        kaynaktır.
      </p>
      <Inputs placeholder={"Ara..."} />
      <h3>En Son Postlar</h3>
      <div className={styles.blog__search_card}>
        {blogInfo.map((article, i) => (
          <div key={i} className={styles.blog__search_card_s}>
            <Image
              src={`${article.img}.jpg`}
              height="100"
              width={"100"}
              alt="little card"
            />
            <div className={styles.blog__search_card_s_l}>
              <h6>{article.title}</h6>
              <p>{article.date}</p>
            </div>
          </div>
        ))}
      </div>
      <h3>Blog Kategorileri</h3>
      <span>Meyveler(10)</span>
      <span>Baklalar(15)</span>
      <span>Tahıllar(18)</span>
      <h3>Post Etiketleri</h3>
      <div className={styles.blog__search_buttons}>
        <button>Havuş</button>
        <button>Fasulle</button>
        <button>Nohut</button>
        <button>Mercimek</button>
        <button>Vegan</button>
        <button>Salata</button>
        <button>Sağlıklı</button>
        <button>Organik</button>
      </div>
    </div>
  );
}
