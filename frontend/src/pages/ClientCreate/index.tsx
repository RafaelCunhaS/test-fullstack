import { IDataForm } from '../../interfaces'
import styles from './styles.module.scss'
import { createClient } from '../../services/clientResources'
import ClientHeader from '../../components/ClientHeader'
import { removeMasks } from '../../utils/masks'
import ClientForm from '../../components/ClientForm'
import { useNavigate } from 'react-router-dom'

export default function ClientCreate() {
  const navigate = useNavigate()

  const onSubmit = async (dataForm: IDataForm) => {
    const data = removeMasks(dataForm)
    await createClient(data)
    navigate('/')
  }

  return (
    <main className={styles.container}>
      <ClientHeader />
      <div className={styles.subtext}>
        <h3>Novo cliente</h3>
        <p>Informe os campos a seguir para criar novo cliente:</p>
      </div>
      <ClientForm onSubmit={onSubmit} />
    </main>
  )
}
