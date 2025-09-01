import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import ModalVisualizarDocumento from './ModalVisualizarDocumento'
import ModalFiltrosBoletins from './ModalFiltrosBoletins'
import { PaginationWrapper, ModalConfirmacao } from '../../../components'

const BoletinsDocumentos = () => {
  const [documentos, setDocumentos] = useState([])
  const [documentoSelecionado, setDocumentoSelecionado] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [documentoParaExcluir, setDocumentoParaExcluir] = useState(null)
  const [filters, setFilters] = useState({})

  useEffect(() => {
    fetchDocumentos()
  }, [])

  const fetchDocumentos = async (filtros = {}) => {
    let query = supabase.from('documentos_alunos').select(`
      id,
      aluno:aluno_id(nome),
      tipo,
      titulo,
      arquivo_url,
      data_envio
    `)

    if (filtros.tipo) query = query.eq('tipo', filtros.tipo)
    if (filtros.search) query = query.ilike('titulo', `%${filtros.search}%`)
    if (filtros.startDate) query = query.gte('data_envio', filtros.startDate)
    if (filtros.endDate) query = query.lte('data_envio', filtros.endDate)

    const { data, error } = await query
    if (error) {
      console.error('Erro ao buscar documentos:', error)
    } else {
      setDocumentos(data || [])
    }
  }

  const abrirModalVisualizar = (documento) => {
    setDocumentoSelecionado(documento)
  }

  const confirmarExclusao = (documento) => {
    setDocumentoParaExcluir(documento)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (documentoParaExcluir) {
      const { error } = await supabase.from('documentos_alunos').delete().eq('id', documentoParaExcluir.id)
      if (!error) {
        setDocumentos((prev) => prev.filter((d) => d.id !== documentoParaExcluir.id))
      }
    }
    setShowConfirm(false)
  }

  const handleFiltrar = (filtros) => {
    setFilters(filtros)
    fetchDocumentos(filtros)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Acesso a Boletins e Documentos</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltrosBoletins onFiltrar={handleFiltrar} />
        </CContainer>

        <CCard className="my-4">
          <CCardBody>
            <PaginationWrapper data={documentos} itemsPerPage={5}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Aluno</th>
                      <th>Tipo</th>
                      <th>Título</th>
                      <th>Data de Envio</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((doc) => (
                      <tr key={doc.id}>
                        <td>{doc.id}</td>
                        <td>{doc.aluno?.nome}</td>
                        <td>{doc.tipo}</td>
                        <td>{doc.titulo}</td>
                        <td>{new Date(doc.data_envio).toLocaleDateString()}</td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
                              type="button"
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Ações
                            </button>
                            <ul className="dropdown-menu">
                              <li>
                                <button
                                  className="dropdown-item btn-sm"
                                  onClick={() => abrirModalVisualizar(doc)}
                                >
                                  <i className="fa fa-eye"></i> Visualizar
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item btn-sm text-danger"
                                  onClick={() => confirmarExclusao(doc)}
                                >
                                  <i className="fa fa-trash"></i> Excluir
                                </button>
                              </li>
                              <li>
                                <a
                                  className="dropdown-item btn-sm"
                                  href={doc.arquivo_url}
                                  target="_blank"
                                  rel="noopener noreferrer"
                                >
                                  <i className="fa fa-download"></i> Baixar
                                </a>
                              </li>
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </PaginationWrapper>

            {/* Modal de visualização */}
            <ModalVisualizarDocumento documento={documentoSelecionado} />

            {/* Modal de confirmação de exclusão */}
            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Documento"
              message={`Tem certeza que deseja excluir o documento "${documentoParaExcluir?.titulo}"?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default BoletinsDocumentos
