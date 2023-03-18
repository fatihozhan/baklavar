import SingleCard from "./singleCard";
import styles from "./styles.module.scss";

export default function OrderCard({ order }) {
  return (
    <div className={styles.card}>
      <div className={styles.card__title}>
        <div>
          <h5>Sipariş Tarihi</h5>
          <p> {order.createdAt.split("T")[0]} - {
            order.createdAt.split("T")[1].slice(0,5)
          } </p>
        </div>
        <div>
          <h5>Sipariş Özeti</h5>
          <p> {order.products.length} Ürün </p>
        </div>
        <div>
          <h5>Alıcı</h5>
          <p> {order.user.name} </p>
        </div>
        <div>
          <h5>Tutar</h5>
          <p> {order.total} ₺</p>
        </div>
      </div>
      <div className={styles.card__content}>
        {order.products.map((product, i) => (
          <SingleCard product={product} key={i} />
        ))}
      </div>
    </div>
  );
}
