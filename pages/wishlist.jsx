import NavigatorBar from '@/components/navigatorBar'
import styles from '@/styles/wishlist.module.scss'

export default function Wishlist() {
  return (
    <div className={styles.wishlist}>
        <NavigatorBar/>
        <div className={styles.container}>
            <div className={styles.wishlist__content}>
                <div className={styles.wishlist__content_empty}>
                    <p>Henüz istek listesinde ürününüz bulunmamaktadır.</p>
                </div>
            </div>
        </div>
    </div>
  )
}
