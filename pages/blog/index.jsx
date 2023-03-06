import BlogCard from "@/components/blog/blogCard";
import NavigatorBar from "@/components/navigatorBar";
import styles from "@/styles/blog.module.scss";
import { Pagination } from "antd";
import BlogSearch from "@/components/blog/search";
import slugify from "slugify";

export default function Blog() {
  return (
    <div className={styles.blog}>
      <NavigatorBar />
      <div className={styles.container}>
        <div className={styles.blog__grid}>
          <div className={styles.blog__articles}>
            {blogInfo.map((article, i) => (
              <BlogCard article={article} key={i} />
            ))}
          </div>
          <BlogSearch />
          <div className={styles.blog__pagination}>
            <Pagination defaultCurrent={1} total={50} />
          </div>
        </div>
      </div>
    </div>
  );
}

export const blogInfo = [
  {
    author: "Resul ÖZTÜRK",
    category: "Meyve",
    title: "Beyin Gücünüzü Artıracak Yiyecekler",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa pariatur eligendi exercitationem, possimus dolor, tempore tenetur fugiat numquam, consequuntur nostrum dolore excepturi repudiandae veritatis blanditiis! Excepturi repellat illum distinctio culp Iste natus quae dolor reiciendis ex laboriosam unde? Nam atque pariatur qui ad commodi architecto voluptatum adipisci autem, sapiente enim quod? Cupiditate dignissimos a minus aperiam repellat, consequuntur pariatur repellendus!    Dolor rem mollitia deleniti aperiam beatae dicta id. Molestiae nulla maiores quas delectus dolorum, ipsa accusamus accusantium? Hic officiis eum laboriosam voluptatibus deleniti nisi eligendi, molestias iste veritatis iure optio?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, suscipit nihil cupiditate maiores voluptatem vel perferendis. Voluptate, doloremque est! Eaque quibusdam, doloremque recusandae totam enim distinctio dolores. Minus, eos iste.Dolorum temporibus provident quos sit, perferendis cupiditate distinctio atque obcaecati vel deserunt totam sapiente reprehenderit, aut et consequuntur corporis? Temporibus placeat saepe, quas distinctio aut laboriosam asperiores ut ipsam officia.Omnis incidunt iste nulla rerum sunt animi ratione nemo aliquid autem maiores voluptatem minus modi adipisci error nam, natus earum dolor quod accusantium! Eaque, nemo delectus impedit harum dolores alias.",
    img: "/images/blog/blog1",
    slug: slugify("Beyin Gücünüzü Artıracak Yiyecekler").toLowerCase(),
  },
  {
    author: "Resul ÖZTÜRK",
    category: "Meyve",
    title: "En Sağlıklı 14 Yapraklı Yeşil Sebze",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa pariatur eligendi exercitationem, possimus dolor, tempore tenetur fugiat numquam, consequuntur nostrum dolore excepturi repudiandae veritatis blanditiis! Excepturi repellat illum distinctio culp Iste natus quae dolor reiciendis ex laboriosam unde? Nam atque pariatur qui ad commodi architecto voluptatum adipisci autem, sapiente enim quod? Cupiditate dignissimos a minus aperiam repellat, consequuntur pariatur repellendus!    Dolor rem mollitia deleniti aperiam beatae dicta id. Molestiae nulla maiores quas delectus dolorum, ipsa accusamus accusantium? Hic officiis eum laboriosam voluptatibus deleniti nisi eligendi, molestias iste veritatis iure optio?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, suscipit nihil cupiditate maiores voluptatem vel perferendis. Voluptate, doloremque est! Eaque quibusdam, doloremque recusandae totam enim distinctio dolores. Minus, eos iste.Dolorum temporibus provident quos sit, perferendis cupiditate distinctio atque obcaecati vel deserunt totam sapiente reprehenderit, aut et consequuntur corporis? Temporibus placeat saepe, quas distinctio aut laboriosam asperiores ut ipsam officia.Omnis incidunt iste nulla rerum sunt animi ratione nemo aliquid autem maiores voluptatem minus modi adipisci error nam, natus earum dolor quod accusantium! Eaque, nemo delectus impedit harum dolores alias.",
    img: "/images/blog/blog2",
    slug: slugify("En Sağlıklı 14 Yapraklı Yeşil Sebze").toLowerCase(),
  },
  {
    author: "Resul ÖZTÜRK",
    category: "Meyve",
    title: "Meyveler Nasıl Güvenli Bir Şekilde Taşınır?",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa pariatur eligendi exercitationem, possimus dolor, tempore tenetur fugiat numquam, consequuntur nostrum dolore excepturi repudiandae veritatis blanditiis! Excepturi repellat illum distinctio culp Iste natus quae dolor reiciendis ex laboriosam unde? Nam atque pariatur qui ad commodi architecto voluptatum adipisci autem, sapiente enim quod? Cupiditate dignissimos a minus aperiam repellat, consequuntur pariatur repellendus!    Dolor rem mollitia deleniti aperiam beatae dicta id. Molestiae nulla maiores quas delectus dolorum, ipsa accusamus accusantium? Hic officiis eum laboriosam voluptatibus deleniti nisi eligendi, molestias iste veritatis iure optio?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, suscipit nihil cupiditate maiores voluptatem vel perferendis. Voluptate, doloremque est! Eaque quibusdam, doloremque recusandae totam enim distinctio dolores. Minus, eos iste.Dolorum temporibus provident quos sit, perferendis cupiditate distinctio atque obcaecati vel deserunt totam sapiente reprehenderit, aut et consequuntur corporis? Temporibus placeat saepe, quas distinctio aut laboriosam asperiores ut ipsam officia.Omnis incidunt iste nulla rerum sunt animi ratione nemo aliquid autem maiores voluptatem minus modi adipisci error nam, natus earum dolor quod accusantium! Eaque, nemo delectus impedit harum dolores alias.",
    img: "/images/blog/blog3",
    slug: slugify("Meyveler Nasıl Güvenli Bir Şekilde Taşınır?").toLowerCase(),
  },
  {
    author: "Resul ÖZTÜRK",
    category: "Meyve",
    title: "Mutfak Bitkileri ve Baharatların Sağlığa Faydaları",
    content:
      "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Culpa pariatur eligendi exercitationem, possimus dolor, tempore tenetur fugiat numquam, consequuntur nostrum dolore excepturi repudiandae veritatis blanditiis! Excepturi repellat illum distinctio culp Iste natus quae dolor reiciendis ex laboriosam unde? Nam atque pariatur qui ad commodi architecto voluptatum adipisci autem, sapiente enim quod? Cupiditate dignissimos a minus aperiam repellat, consequuntur pariatur repellendus!    Dolor rem mollitia deleniti aperiam beatae dicta id. Molestiae nulla maiores quas delectus dolorum, ipsa accusamus accusantium? Hic officiis eum laboriosam voluptatibus deleniti nisi eligendi, molestias iste veritatis iure optio?Lorem ipsum dolor, sit amet consectetur adipisicing elit. Sed, suscipit nihil cupiditate maiores voluptatem vel perferendis. Voluptate, doloremque est! Eaque quibusdam, doloremque recusandae totam enim distinctio dolores. Minus, eos iste.Dolorum temporibus provident quos sit, perferendis cupiditate distinctio atque obcaecati vel deserunt totam sapiente reprehenderit, aut et consequuntur corporis? Temporibus placeat saepe, quas distinctio aut laboriosam asperiores ut ipsam officia.Omnis incidunt iste nulla rerum sunt animi ratione nemo aliquid autem maiores voluptatem minus modi adipisci error nam, natus earum dolor quod accusantium! Eaque, nemo delectus impedit harum dolores alias.",
    img: "/images/blog/blog4",
    slug: slugify("Mutfak Bitkileri ve Baharatların Sağlığa Faydaları").toLowerCase(),
  },
];

