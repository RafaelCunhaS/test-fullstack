import { FiUser } from 'react-icons/fi'
import styles from './styles.module.scss'

export default function ClientHeader() {
  return (
    <h2 className={styles.container}>
      <span>
        <FiUser size={30} />
      </span>
      Painel de clientes
      <hr />
    </h2>
  )
}
