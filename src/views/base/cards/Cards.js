import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import { AppBreadcrumb, ModalConfirmacao, PaginationWrapper } from '../../../components'
import ModalFiltros from './ModalFiltros'

const HistoricoEscolarPage = () => {
  const [historico, setHistorico] = useState([])
  const [historicoFiltrado, setHistoricoFiltrado] = useState([])
  const [registroParaExcluir, setRegistroParaExcluir] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    fetchHistorico()
  }, [])

  const fetchHistorico = async () => {
    const { data, error } = await supabase
      .from('historico_escolar') // tabela exemplo
      .select(
        `
        id,
        ano_letivo,
        serie,
        disciplina:disciplinas ( nome ),
        professor:professores ( nome ),
        nota_final,
        media_anual,
        situacao,
        boletim_url,
        aluno:alunos ( id, nome )
      `,
      )
      .order('ano_letivo', { ascending: false })

    if (error) {
      console.error('Erro ao buscar histórico:', error)
    } else {
      setHistorico(data || [])
      setHistoricoFiltrado(data || [])
    }
  }

  const onFiltrar = (filters) => {
    let filtradas = [...historicos]

    // Filtro por intervalo de anos
    if (filters.startDate) {
      filtradas = filtradas.filter((h) => Number(h.ano_letivo) >= Number(filters.startDate))
    }
    if (filters.endDate) {
      filtradas = filtradas.filter((h) => Number(h.ano_letivo) <= Number(filters.endDate))
    }

    // Filtro por série
    if (filters.serie) {
      const termo = filters.serie.toLowerCase()
      filtradas = filtradas.filter((h) => h.serie?.toLowerCase().includes(termo))
    }

    // Filtro por disciplina
    if (filters.disciplina) {
      const termo = filters.disciplina.toLowerCase()
      filtradas = filtradas.filter((h) => h.disciplina?.toLowerCase().includes(termo))
    }

    // Filtro por situação
    if (filters.situacao) {
      filtradas = filtradas.filter(
        (h) => h.situacao?.toLowerCase() === filters.situacao.toLowerCase(),
      )
    }

    // Pesquisa rápida por chave selecionada
    if (filters.search && filters.keyFilter !== 'null') {
      const termo = filters.search.toLowerCase()
      filtradas = filtradas.filter((h) => {
        switch (filters.keyFilter) {
          case 'aluno':
            return h.aluno?.nome?.toLowerCase().includes(termo)
          case 'disciplina':
            return h.disciplina?.toLowerCase().includes(termo)
          case 'situacao':
            return h.situacao?.toLowerCase().includes(termo)
          default:
            return true
        }
      })
    }

    setHistoricosFiltrados(filtradas) // atualiza a lista filtrada
  }

  const confirmarExclusao = (registro) => {
    setRegistroParaExcluir(registro)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (registroParaExcluir) {
      const { error } = await supabase
        .from('historico_escolar')
        .delete()
        .eq('id', registroParaExcluir.id)

      if (error) {
        console.error('Erro ao excluir registro:', error)
      } else {
        setHistorico((prev) => prev.filter((h) => h.id !== registroParaExcluir.id))
        setHistoricoFiltrado((prev) => prev.filter((h) => h.id !== registroParaExcluir.id))
      }
    }
    setShowConfirm(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Histórico Escolar e Boletins</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltros onFiltrar={onFiltrar} />
        </CContainer>

        <CCard className="my-4">
          <CCardBody>
            <PaginationWrapper data={historicoFiltrado} itemsPerPage={5}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>Ano</th>
                      <th>Série</th>
                      <th>Aluno</th>
                      <th>Disciplina</th>
                      <th>Professor</th>
                      <th>Nota Final</th>
                      <th>Média Anual</th>
                      <th>Situação</th>
                      <th>Boletim</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((h) => (
                      <tr key={h.id}>
                        <td>{h.ano_letivo}</td>
                        <td>{h.serie}</td>
                        <td>{h.aluno?.nome ?? '-'}</td>
                        <td>{h.disciplina?.nome ?? '-'}</td>
                        <td>{h.professor?.nome ?? '-'}</td>
                        <td>{h.nota_final ?? '-'}</td>
                        <td>{h.media_anual ?? '-'}</td>
                        <td>
                          <span
                            className={`badge ${h.situacao === 'Aprovado' ? 'bg-success' : 'bg-danger'}`}
                          >
                            {h.situacao}
                          </span>
                        </td>
                        <td>
                          {h.boletim_url ? (
                            <a
                              href={h.boletim_url}
                              target="_blank"
                              rel="noreferrer"
                              className="btn btn-sm btn-primary"
                            >
                              Ver Boletim
                            </a>
                          ) : (
                            '-'
                          )}
                        </td>
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
                                  onClick={() => {
                                    /* lógica para editar */
                                  }}
                                >
                                  <i className="fa fa-edit"></i> Editar
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item btn-sm"
                                  onClick={() => confirmarExclusao(h)}
                                >
                                  <i className="fa fa-trash"></i> Excluir
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

            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Registro"
              message={`Tem certeza que deseja excluir o registro de "${registroParaExcluir?.aluno?.nome}" na disciplina "${registroParaExcluir?.disciplina?.nome}"?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default HistoricoEscolarPage
