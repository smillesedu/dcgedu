import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import { AppBreadcrumb, PaginationWrapper } from '../../../components'
import ModalFiltros from './ModalFiltros'


const EmissaoDocumentosPage = () => {
  const [alunos, setAlunos] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    fetchAlunos()
  }, [])

  const fetchAlunos = async (filters = {}) => {
    setLoading(true)
    let query = supabase.from('alunos').select(`
      id,
      nome,
      matricula,
      turma:turmas ( id, nome ),
      status
    `)

    // Filtros básicos
    if (filters.nome) {
      query = query.ilike('nome', `%${filters.nome}%`)
    }
    if (filters.matricula) {
      query = query.ilike('matricula', `%${filters.matricula}%`)
    }
    if (filters.turmaId) {
      query = query.eq('turma.id', filters.turmaId)
    }

    const { data, error } = await query
    if (error) {
      console.error('Erro ao buscar alunos:', error)
    } else {
      setAlunos(data || [])
    }
    setLoading(false)
  }

  const handleFiltrar = (filters) => {
    fetchAlunos(filters)
  }

  const emitirDocumento = (aluno, tipo) => {
    // Aqui você conecta com sua API para gerar PDF
    console.log(`Emitindo ${tipo} para o aluno:`, aluno)
    alert(`Documento "${tipo}" emitido para ${aluno.nome}`)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Emissão de Documentos Escolares</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltros
            onFiltrar={handleFiltrar}
            campos={[
              { label: 'Nome do Aluno', name: 'nome' },
              { label: 'Matrícula', name: 'matricula' },
              { label: 'Turma', name: 'turmaId', tipo: 'select', opcoes: [] }, // Carregar turmas do banco se necessário
            ]}
          />
        </CContainer>

        <CCard className="my-4">
          <CCardBody>
            {loading && <p>Carregando alunos...</p>}
            {!loading && (
              <PaginationWrapper data={alunos} itemsPerPage={5}>
                {(paginaAtual) => (
                  <table className="table table-bordered table-striped">
                    <thead className="table-dark">
                      <tr>
                        <th>#</th>
                        <th>Nome</th>
                        <th>Matrícula</th>
                        <th>Turma</th>
                        <th>Status</th>
                        <th>Ações</th>
                      </tr>
                    </thead>
                    <tbody>
                      {paginaAtual.map((aluno) => (
                        <tr key={aluno.id}>
                          <td>{aluno.id}</td>
                          <td>{aluno.nome}</td>
                          <td>{aluno.matricula}</td>
                          <td>{aluno.turma?.nome ?? '-'}</td>
                          <td>{aluno.status ?? '-'}</td>
                          <td>
                            <div className="dropdown">
                              <button
                                className="btn btn-secondary btn-sm dropdown-toggle"
                                type="button"
                                data-bs-toggle="dropdown"
                                aria-expanded="false"
                              >
                                Emitir
                              </button>
                              <ul className="dropdown-menu">
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() => emitirDocumento(aluno, 'Histórico Escolar')}
                                  >
                                    <i className="fa fa-file-text"></i> Histórico Escolar
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() =>
                                      emitirDocumento(aluno, 'Declaração de Matrícula')
                                    }
                                  >
                                    <i className="fa fa-file-text"></i> Declaração de Matrícula
                                  </button>
                                </li>
                                <li>
                                  <button
                                    className="dropdown-item"
                                    onClick={() =>
                                      emitirDocumento(aluno, 'Certificado de Conclusão')
                                    }
                                  >
                                    <i className="fa fa-certificate"></i> Certificado de Conclusão
                                  </button>
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
            )}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default EmissaoDocumentosPage
