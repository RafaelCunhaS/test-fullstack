import { IDataForm } from '../../interfaces'
import styles from './styles.module.scss'
import { useNavigate, useParams } from 'react-router-dom'
import { findClient, updateClient } from '../../services/clientResources'
import { useEffect, useState } from 'react'
import ClientHeader from '../../components/ClientHeader'
import { removeMasks } from '../../utils/masks'
import ClientForm from '../../components/ClientForm'

export default function ClientUpdate() {
  const params = useParams()
  const [notFound, setNotFound] = useState(false)
  const navigate = useNavigate()
  const [clientData, setClientData] = useState<IDataForm>({
    name: '',
    email: '',
    cpf: '',
    phonenumber: '',
    status: 'Ativo'
  })

  useEffect(() => {
    const fetchData = async () => {
      if (params.id) {
        const data: IDataForm = await findClient(params.id)
        if (data !== null) {
          setClientData(data)
        } else setNotFound(true)
      }
    }
    fetchData()
  }, [params.id])

  const onSubmit = async (dataForm: IDataForm) => {
    const data = removeMasks(dataForm)
    if (params.id) {
      await updateClient(params.id, data)
      navigate('/')
    }
  }

  return (
    <main className={styles.container}>
      <ClientHeader />
      <div className={styles.subtext}>
        <h3>Atualizar cliente</h3>
        <p>Informe os campos a seguir para atualizar cliente:</p>
      </div>
      {!notFound ? (
        <ClientForm onSubmit={onSubmit} clientData={clientData} />
      ) : (
        <h1 className={styles.notFound}>Cliente não encontrado</h1>
      )}
    </main>
  )
}
