import { PaginationProps } from '../../interfaces'
import styles from './styles.module.scss'

export function Pagination({ totalPages, setCurrentPage, currentPage }: PaginationProps) {
  const pages = []

  for (let i = 1; i <= totalPages; i++) {
    pages.push(i)
  }

  return (
    <div className={styles.container}>
      {pages.map((page, index) => {
        return (
          <button
            key={index}
            data-testid={`pagination-button-${index}`}
            onClick={() => setCurrentPage(page)}
            className={styles.pageButton}
            style={page === currentPage ? { borderColor: '#000', color: '#000' } : {}}
          >
            {page}
          </button>
        )
      })}
    </div>
  )
}
