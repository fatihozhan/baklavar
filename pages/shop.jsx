import styles from "../styles/shop.module.scss";
import { BsFillGrid1X2Fill, BsListTask } from "react-icons/bs";
import { Input, Slider, Select, Tag, Pagination } from "antd";
import NavigatorBar from "../components/navigatorBar";
import { useEffect, useState } from "react";
import ProductCard from "@/components/product/productCart";
import ProductModal from "@/components/product/productModal";
import { useSelector } from "react-redux/";
import db from "@/utils/db";
import Product from "@/models/Product";
import { getServerSession } from "next-auth";
import { authOptions } from "./api/auth/[...nextauth]";
import Category from "@/models/Category";
import { useRouter } from "next/router";
export default function Shop({ products, user, categories, countProducts }) {
  const [load, setLoad] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [productId, setProductId] = useState(0);
  const [selectedTags, setSelectedTags] = useState([]);
  const [searchInput, setSearchInput] = useState("");
  const { CheckableTag } = Tag;
  const router = useRouter();
  useEffect(() => {
    setLoad(true);
  }, []);
  const handleModal = (id) => {
    setProductId(id);
    setIsModalOpen(true);
  };
  const cart = useSelector((state) => state.cartSlice.cart);

  const {
    search = "all",
    category = "all",
    price = "all",
    sort = "all",
    color = "all",
    tagses = "all",
  } = router.query;
  const filterSearch = ({
    category,
    sort,
    price,
    color,
    search,
    tagses,
    page,
  }) => {
    const { query } = router;
    if (search) query.search = search;
    if (page) query.page = page;
    if (sort) query.sort = sort;
    if (tagses) query.tagses = tagses;
    if (color) query.color = color;
    if (price) query.price = price;
    if (category) query.category = category;
    router.push({
      pathname: router.pathname,
      query: query,
    });
  };
  const handleSlider = (values) => {
    filterSearch({ price: values });
  };
  const handlePage = (value) => {
    filterSearch({ page: value });
  };
  const handleSearch = () => {
    searchInput != ""
      ? filterSearch({ search: searchInput })
      : filterSearch({ search: "all" });
  };
  const handleCategory = (value) => {
    value != ""
      ? filterSearch({ category: value })
      : filterSearch({ category: "all" });
  };
  const handleColor = (value) => {
    filterSearch({ color: value });
  };

  const handleOrder = (value) => {
    filterSearch({ sort: value });
  };
  const handleTags = (tag) => {
    setSelectedTags(tag);
    filterSearch({ tagses: tag });
  };
  return (
    <div className={styles.shop}>
      <NavigatorBar />
      <ProductModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        productId={productId}
        products={products}
        cart={cart}
        user={user}
      />
      <div className={styles.shop__wrapper}>
        <div className={styles.container}>
          <div className={styles.shop__search}>
            <Input
              placeholder="Birşeyler Arayın..."
              onPressEnter={handleSearch}
              onChange={(e) => setSearchInput(e.target.value)}
            />
            <div className={styles.shop__search_draggable}>
              <h3> Fiyata Göre Filtrele </h3>
              <Slider
                trackStyle={{ backgroundColor: "#136450" }}
                range={{ draggableTrack: true }}
                defaultValue={[0, 500]}
                max={500}
                onAfterChange={handleSlider}
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
                onChange={handleCategory}
                dropdownStyle={{
                  fontFamily: "Space Grotesk",
                  backgroundColor: "#f7f7f7",
                }}
                style={{
                  width: "100%",
                  fontFamily: "Space Grotesk",
                }}
              >
                <Select.Option value="all">Hepsi...</Select.Option>
                {categories?.map((category) => (
                  <Select.Option key={category._id} value={category._id}>
                    {category.name}
                  </Select.Option>
                ))}
              </Select>
            </div>
            <div className={styles.shop__search_color}>
              <h3>Renk</h3>
              {colors.map((renk, i) => (
                <div key={i}>
                  <a
                    style={{ cursor: "pointer" }}
                    onClick={() => handleColor(renk)}
                  >
                    {renk} ()
                  </a>
                </div>
              ))}
            </div>
            <div className={styles.shop__search_tags}>
              <h3>Popular Etiketler</h3>
              <div>
                {tags.map((tag, i) => (
                  <CheckableTag
                    key={i}
                    color="#f0fcf9"
                    style={{
                      color: "#136450",
                      fontWeight: "600",
                      border: "1px solid #136450",
                      fontSize: "0.8rem",
                    }}
                    checked={selectedTags.includes(tag)}
                    onChange={(checked) => handleTags(tag, checked)}
                  >
                    {tag}
                  </CheckableTag>
                ))}
              </div>
            </div>
            <button
              className={styles.primary_button}
              onClick={() => router.push("/shop")}
            >
              Temizle
            </button>
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
                  dropdownStyle={{
                    backgroundColor: "#f7f7f7",
                    fontFamily: "Space Grotesk",
                  }}
                  popupClassName="select"
                  onChange={handleOrder}
                  bordered="false"
                  style={{
                    width: 250,
                    fontFamily: "Space Grotesk",
                    borderColor: "#f7f7f7",
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
                  ]}
                />
              </div>
            </div>
            <div className={styles.shop__content_body}>
              {products?.map((product, i) => (
                <ProductCard
                  key={i}
                  handleModal={() => handleModal(product._id)}
                  product={product}
                  cart={cart}
                />
              ))}
            </div>
            <div className={styles.shop__content_body_pagination}>
              <Pagination
                onChange={handlePage}
                defaultCurrent={1}
                total={countProducts}
              />
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

export async function getServerSideProps(ctx) {
  const { query } = ctx;
  const page = query.page || 1;
  const category = query.category || "";
  const price = query.price || "";
  const color = query.color || "";
  const sort = query.sort || "";
  const search = query.search || "";
  const tagses = query.tagses || "";
  const tagFilter =
    tagses && tagses != "all"
      ? { "details.value": { $regex: tagses, $options: "i" } }
      : {};

  const order =
    sort == "popular"
      ? { numReviews: 1 }
      : sort == "low-to-high"
      ? { price: -1 }
      : sort == "high-to-low"
      ? { price: 1 }
      : sort == "rating"
      ? { numReviews: 1 }
      : sort == "latest"
      ? { createdAt: 1 }
      : { _id: -1 };
  const colorFilter =
    color && color != "all"
      ? {
          "details.value": {
            $regex: color,
            $options: "i",
          },
        }
      : {};
  const queryFilter =
    search && search != "all"
      ? {
          name: {
            $regex: search,
            $options: "i",
          },
        }
      : {};
  const categoryFilter = category && category != "all" ? { category } : {};
  const priceFilter =
    price && price != "all"
      ? { price: { $gte: Number(price[0]), $lte: Number(price[1]) } }
      : {};
  const session = await getServerSession(ctx.req, ctx.res, authOptions);
  await db.connectDb();
  const products = await Product.find({
    ...priceFilter,
    ...categoryFilter,
    ...queryFilter,
    ...colorFilter,
  })
    ?.populate({ path: "category", model: Category })
    ?.skip(10 * (page - 1))
    ?.limit(10)
    .sort(order)
    .lean();
  const countProducts = await Product.countDocuments({
    ...priceFilter,
    ...categoryFilter,
    ...queryFilter,
    ...colorFilter,
  });
  const categories = await Category.find({})?.sort({ createdAt: -1 }).lean();
  await db.disconnectDb();
  return {
    props: {
      products: JSON.parse(JSON.stringify(products)),
      user: user ? JSON.parse(JSON.stringify(session?.user)) : null,
      categories: JSON.parse(JSON.stringify(categories)),
      countProducts,
    },
  };
}
