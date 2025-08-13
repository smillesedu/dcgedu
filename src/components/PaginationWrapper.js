
import React, { useState } from 'react'
import { CPagination, CPaginationItem } from '@coreui/react'

const PaginationWrapper = ({ data = [], itemsPerPage = 10, children }) => {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(data.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const paginatedData = data.slice(startIndex, startIndex + itemsPerPage)

  return (
    <>
      {/* Renderiza o conteúdo (tabela, lista, etc.) */}
      {children(paginatedData)}

      {/* Paginação */}
      {totalPages > 1 && (
        <CPagination className="mt-3" aria-label="Paginação de alunos">
          <CPaginationItem
            disabled={currentPage === 1}
            onClick={() => setCurrentPage((prev) => prev - 1)}
          >
            Anterior
          </CPaginationItem>

          {[...Array(totalPages)].map((_, index) => {
            const page = index + 1
            return (
              <CPaginationItem
                key={page}
                active={page === currentPage}
                onClick={() => setCurrentPage(page)}
              >
                {page}
              </CPaginationItem>
            )
          })}

          <CPaginationItem
            disabled={currentPage === totalPages}
            onClick={() => setCurrentPage((prev) => prev + 1)}
          >
            Próxima
          </CPaginationItem>
        </CPagination>
      )}
    </>
  )
}

export default PaginationWrapper
