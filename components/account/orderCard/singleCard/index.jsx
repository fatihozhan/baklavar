import styles from './styles.module.scss'
import Image from 'next/image'
import {TiTick} from 'react-icons/ti'
import {RxCross2} from 'react-icons/rx'

export default function SingleCard({product}) {
  return (
    <div className={styles.singleCard}>
        <div className={styles.singleCard__content}>
            <div>
              {/*  <TiTick/> */} <RxCross2/> <p>Teslim Edilmedi</p>
            </div>
            <div>
                <Image src={product.image} alt="product resmi" height={60} width="50" />
            </div>
            <div></div>
        </div>
    </div>
  )
}
