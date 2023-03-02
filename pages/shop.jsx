import styles from "../styles/shop.module.scss";
import { products } from "../pages/index";
import { BsFillGrid1X2Fill, BsListTask } from "react-icons/bs";
import { Input, Slider, Select, Tag, Pagination } from "antd";
import NavigatorBar from "../components/navigatorBar";
import { useEffect, useState } from "react";
import ProductCard from "@/components/productCart";
export default function Shop() {
  const [load, setLoad] = useState(false);
  useEffect(() => {
    setLoad(true);
  }, []);

  return (
    <div className={styles.shop}>
      <NavigatorBar />
      <div className={styles.shop__wrapper}>
        <div className={styles.container}>
          <div className={styles.shop__search}>
            <Input placeholder="Birşeyler Arayın..." />
            <div className={styles.shop__search_draggable}>
              <h3> Fiyata Göre Filtrele </h3>
              <Slider
                trackStyle={{ backgroundColor: "#136450" }}
                range={{ draggableTrack: true }}
                defaultValue={[0, 500]}
                name="price"
                tooltip={
                  load && {
                    open: true,
                    placement: "bottom",
                    formatter: (v) => v + " ₺",
                  }
                }
              />
            </div>
            <div className={styles.shop__search_category}>
              <h3> Ürün Kategorileri </h3>
              <Select
                placeholder="Bir Kategori Seçin..."
                className={styles.shop__search_category_select}
                dropdownStyle={{fontFamily : "Space Grotesk", backgroundColor : "#f7f7f7"}}
                style={{
                  width: "100%",
                  fontFamily: "Space Grotesk",
                }}
                options={[
                  {
                    value: "fasulye",
                    label: "Fasulye",
                  },
                  {
                    value: "nohut",
                    label: "Nohut",
                  },
                  {
                    value: "mercimek",
                    label: "Mercimek",
                  },
                  {
                    value: "disabled",
                    label: "Disabled",
                    disabled: true,
                  },
                ]}
              />
            </div>
            <div className={styles.shop__search_color}>
              <h3>Renk</h3>
              {colors.map((renk, i) => (
                <div key={i}>
                  <a href="">
                    {renk} ({load && Math.floor(Math.random() * 100) + 1})
                  </a>
                </div>
              ))}
            </div>
            <div className={styles.shop__search_tags}>
              <h3>Popular Etiketler</h3>
              <div>
                {tags.map((tag, i) => (
                  <Tag key={i} color="#f0fcf9" style={{ color: "#136450", fontWeight : "600", border : "1px solid #136450", fontSize : "0.8rem" }}>
                    {tag}
                  </Tag>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.shop__content}>
            <div className={styles.shop__content_top}>
              <div className={styles.shop__content_top_l}>
                <div className={styles.shop__content_top_l_svgs}>

                <BsFillGrid1X2Fill className="active" />
                <BsListTask />
                </div>
                <p>30 Sonuçtan 1-12 Arası Gösteriliyor</p>
              </div>
              <div className={styles.shop__content_top_r}>
                <Select
                  defaultValue="default"
                  dropdownStyle={{backgroundColor : "#f7f7f7", fontFamily : "Space Grotesk"}}
                  popupClassName="select"
                  bordered="false"
                  style={{
                    width: 250,
                    fontFamily: "Space Grotesk",
                    borderColor : "#f7f7f7"
                  }}
                  options={[
                    {
                      value: "default",
                      label: "Varsayılan Sıralama",
                    },
                    {
                      value: "popular",
                      label: "Popülerliğe Göre Sıralama",
                    },
                    {
                      value: "rating",
                      label: "En Çok Değerlendirilenlere Göre",
                    },
                    {
                      value: "latest",
                      label: "Son Gelen Ürünlere Göre",
                    },
                    {
                      value: "low-to-high",
                      label: "Fiyata Göre : Artan",
                    },
                    {
                      value: "high-to-low",
                      label: "Fiyata Göre : Azalan",
                    },
                    {
                      value: "disabled",
                      label: "Disabled",
                      disabled: true,
                    },
                  ]}
                />
              </div>
            </div>
            <div className={styles.shop__content_body}>
              {products.map((product, i) => (
                <ProductCard key={i} product={product} />
              ))}
            </div>
            <div className={styles.shop__content_body_pagination}>

            <Pagination itemRender={(page => console.log(page) )} defaultCurrent={1} total={50} />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

const colors = ["Mavi", "Siyah", "Yeşil", "Sarı", "Beyaz", "Kırmızı"];
const tags = [
  "Yemek",
  "Taze",
  "Meyve",
  "Sağlıklı",
  "Bitkisel",
  "Salata",
  "Organik",
  "Vegan",
  "Hepsi",
];
