import { useEffect, useState } from 'react'
import { listClients } from '../../services/clientResources'
import { IDataForm } from '../../interfaces'
import { Button } from '../../components/Button'
import styles from './styles.module.scss'
import ClientCard from '../../components/ClientCard'
import { useNavigate } from 'react-router-dom'
import ClientHeader from '../../components/ClientHeader'
import { Pagination } from '../../components/Pagination'
import { LoadingSpinner } from '../../components/Loading'

export default function Home() {
  const [clients, setClients] = useState<IDataForm[]>([])
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    const fetchData = async () => {
      setIsLoading(true)
      const data = await listClients(currentPage - 1)
      if (data) {
        setTotalPages(data.totalPages)
        setClients(data.data)
        setIsLoading(false)
      }
    }
    fetchData()
  }, [currentPage])

  return (
    <main className={styles.container}>
      <ClientHeader />
      <div className={styles.subContainer}>
        <div className={styles.subtext}>
          <h3>Listagem de clientes</h3>
          <p>Escolha um cliente para visualizar os detalhes</p>
        </div>
        <Button title="Novo cliente" onClick={() => navigate('/create')} />
      </div>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <div>
          <ul className={styles.list}>
            {clients.map((client) => (
              <ClientCard key={client.id} client={client} />
            ))}
          </ul>
          <p className={styles.text}>Exibindo {clients.length} clientes</p>
          <Pagination
            setCurrentPage={(page) => setCurrentPage(page)}
            totalPages={totalPages}
            currentPage={currentPage}
          />
        </div>
      )}
    </main>
  )
}
