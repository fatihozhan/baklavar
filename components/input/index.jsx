import styles from './styles.module.scss'
import {Input} from 'antd'

export default function Inputs({placeholder, name, type}) {
  return (
    <div className={styles.customInput}>
        <Input placeholder={placeholder} name={name} type={type} />
    </div>
  )
}
