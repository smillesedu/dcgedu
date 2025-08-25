import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import { DocsComponents, DocsExample } from 'src/components'
import supabase from '../../../supaBaseClient'
import ModalAluno from './ModalAluno'
import ModalFiltros from './ModalFiltros'
import { AppBreadcrumb, ModalConfirmacao, PaginationWrapper } from '../../../components'

const Accordion = () => {
  const [alunos, setAlunos] = useState([])
  const [alunoEditando, setAlunoEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [alunoParaExcluir, setAlunoParaExcluir] = useState(null)

  const confirmarExclusao = (aluno) => {
    setAlunoParaExcluir(aluno)
    setShowConfirm(true)
  }

  const handleConfirmDelete = () => {
    if (alunoParaExcluir) {
      deletarAluno(alunoParaExcluir.id)
    }
    setShowConfirm(false)
  }

  // Se precisar popular selects do modal
  const [tipoClientes] = useState([])
  const [municipios] = useState([])

  useEffect(() => {
    fetchAlunos()
  }, [])

  const fetchAlunos = async (filters = {}) => {
    let query = supabase.from('alunos').select(
      `
        id,
        nome,
        data_nascimento,
        email,
        telefone,
        status,
        endereco:endereco (
          casa_numero,
          rua,
          bairro,
          municipio,
          provincia
        ),
        responsavel:responsaveis (
          id,
          nome,
          telefone
        )
      `,
    )

    // Exemplos de filtros: ajuste conforme suas colunas reais
    if (filters.startDate) {
      query = query.gte('data_nascimento', filters.startDate)
    }
    if (filters.endDate) {
      query = query.lte('data_nascimento', filters.endDate)
    }
    if (filters.keyFilter && filters.keyFilter !== 'null' && filters.search) {
      query = query.ilike(filters.keyFilter, `%${filters.search}%`)
    }
    if (filters.orderBy) {
      query = query.order(filters.orderBy, { ascending: true })
    }
    if (filters.perPage) {
      const end = Number(filters.perPage) - 1
      query = query.range(0, end)
    }

    const { data, error } = await query
    if (error) {
      console.error('Erro ao buscar alunos:', error)
    } else {
      setAlunos(data || [])
    }
  }

  const deletarAluno = async (id) => {
    const { error } = await supabase.from('alunos').delete().eq('id', id)
    if (error) {
      console.error('Erro ao deletar aluno:', error)
    } else {
      setAlunos((prev) => prev.filter((aluno) => aluno.id !== id))
    }
  }

  // Abrir modal apenas ajustando estado; a abertura visual é por data attributes
  const abrirModalNovo = () => {
    setAlunoEditando(null)
  }

  const abrirModalEditar = (aluno) => {
    setAlunoEditando(aluno)
  }

  const handleFiltrar = (filters) => {
    fetchAlunos(filters)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Gestão de Alunos</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltros
            onFiltrar={handleFiltrar}
            tipoClientes={tipoClientes}
            municipios={municipios}
          />
        </CContainer>
        <CRow className="my-4"></CRow>
        <CRow className="my-4">
          <CCol md={8}></CCol>
          <CCol xs={6} md={4} className="d-flex justify-content-end gap-2">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalAluno"
              onClick={abrirModalNovo}
            >
              Registrar Aluno
            </button>
          </CCol>
        </CRow>

        <CCard className="my-4">
          <CCardBody>
            <PaginationWrapper data={alunos} itemsPerPage={3}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nome Completo</th>
                      <th scope="col">Data de Nascimento</th>
                      <th scope="col">E-mail</th>
                      <th scope="col">Telefone</th>
                      <th scope="col">Status Acadêmico</th>
                      <th scope="col">Endereço</th>
                      <th scope="col">Responsáveis</th>
                      <th scope="col">Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((aluno) => (
                      <tr key={aluno.id}>
                        <td>{aluno.id}</td>
                        <td>{aluno.nome}</td>
                        <td>{aluno.data_nascimento}</td>
                        <td>{aluno.email}</td>
                        <td>{aluno.telefone}</td>
                        <td>{aluno.status ?? '-'}</td>
                        <td>
                          {aluno.endereco
                            ? `${aluno.endereco.rua ?? ''}, Nº ${aluno.endereco.casa_numero ?? ''}, ${aluno.endereco.bairro ?? ''}`
                            : '-'}
                        </td>
                        <td>{aluno?.responsavel?.nome || '-'}</td>
                        <td>
                          <div className="dropdown">
                            <button
                              className="btn btn-secondary btn-sm dropdown-toggle"
                              type="button"
                              id={`dropdownMenu-${aluno.id}`}
                              data-bs-toggle="dropdown"
                              aria-expanded="false"
                            >
                              Ações
                            </button>

                            <ul
                              className="dropdown-menu"
                              aria-labelledby={`dropdownMenu-${aluno.id}`}
                            >
                              {(() => {
                                const acoes = []

                                // Exemplo: ação só se aluno não tiver acesso ainda
                                if (!aluno.temAcesso) {
                                  acoes.push({
                                    label: 'Dar Acesso',
                                    icon: 'fa-edit',
                                    onClick: () => {
                                      iniAluno(aluno)
                                      darAcesso()
                                    },
                                  })
                                }

                                // Exemplo: ação sempre disponível
                                acoes.push({
                                  label: 'Editar Aluno',
                                  icon: 'fa-edit',
                                  onClick: () => {
                                    abrirModalEditar(aluno)
                                  },
                                  modalTarget: '#modalAluno',
                                })

                                acoes.push({
                                  label: 'Excluir Aluno',
                                  icon: 'fa-trash',
                                  onClick: () => confirmarExclusao(aluno),
                                })

                                // Exemplo: ação baseada no responsável
                                if (aluno.responsavel && aluno.responsavel.email) {
                                  acoes.push({
                                    label: 'Enviar Email ao Responsável',
                                    icon: 'fa-envelope',
                                    onClick: () => enviarEmail(aluno.responsavel.email),
                                  })
                                }

                                // Renderização das ações
                                return acoes.map((acao, idx) => (
                                  <li key={idx}>
                                    <button
                                      className="dropdown-item btn-sm"
                                      onClick={acao.onClick}
                                      {...(acao.modalTarget
                                        ? {
                                            'data-bs-toggle': 'modal',
                                            'data-bs-target': acao.modalTarget,
                                          }
                                        : {})}
                                    >
                                      <i className={`fa ${acao.icon}`}></i> {acao.label}
                                    </button>
                                  </li>
                                ))
                              })()}
                            </ul>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </PaginationWrapper>

            {/* Modal do Aluno (já existente) */}
            <ModalAluno alunoEditando={alunoEditando} onSalvo={() => fetchAlunos()} />
            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Aluno"
              message={`Tem certeza que deseja excluir o aluno "${alunoParaExcluir?.nome}"?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default Accordion
