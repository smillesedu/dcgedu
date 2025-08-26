import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import { AppBreadcrumb, ModalConfirmacao, PaginationWrapper } from '../../../components'
import ModalFiltros from './ModalFiltros'
import ModalMatricula from './ModalMatricula'

const MatriculasPage = () => {
  const [matriculas, setMatriculas] = useState([])
  const [matriculasFiltradas, setMatriculasFiltradas] = useState([])
  const [matriculaParaExcluir, setMatriculaParaExcluir] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    fetchMatriculas()
  }, [])

  const fetchMatriculas = async () => {
    const { data, error } = await supabase
      .from('matriculas')
      .select(`
        id,
        data_matricula,
        aluno:alunos ( id, nome ),
        turma:turmas (
          id,
          nome,
          curso:cursos ( nome, descricao ),
          professor:professores (
            nome,
            email,
            telefone,
            disciplina:disciplinas ( nome )
          )
        )
      `)

    if (error) {
      console.error('Erro ao buscar matrículas:', error)
    } else {
      setMatriculas(data || [])
      setMatriculasFiltradas(data || [])
    }
  }


  const onFiltrar = (filters) => {
    let filtradas = [...matriculas]

    // Filtro por data
    if (filters.startDate) {
      filtradas = filtradas.filter(m => new Date(m.data_matricula) >= new Date(filters.startDate))
    }
    if (filters.endDate) {
      filtradas = filtradas.filter(m => new Date(m.data_matricula) <= new Date(filters.endDate))
    }

    // Filtro por pesquisa
    if (filters.search && filters.keyFilter !== 'null') {
      const termo = filters.search.toLowerCase()
      filtradas = filtradas.filter(m => {
        switch (filters.keyFilter) {
          case 'id':
            return String(m.id).includes(termo)
          case 'nome':
            return m.aluno?.nome?.toLowerCase().includes(termo)
          case 'turma':
            return m.turma?.nome?.toLowerCase().includes(termo)
          case 'curso':
            return m.turma?.curso?.nome?.toLowerCase().includes(termo)
          default:
            return true
        }
      })
    }

    setMatriculasFiltradas(filtradas)
  }

  const confirmarExclusao = (matricula) => {
    setMatriculaParaExcluir(matricula)
    setShowConfirm(true)
  }

  const handleConfirmDelete = async () => {
    if (matriculaParaExcluir) {
      const { error } = await supabase
        .from('matriculas')
        .delete()
        .eq('id', matriculaParaExcluir.id)

      if (error) {
        console.error('Erro ao excluir matrícula:', error)
      } else {
        setMatriculas(prev => prev.filter(m => m.id !== matriculaParaExcluir.id))
        setMatriculasFiltradas(prev => prev.filter(m => m.id !== matriculaParaExcluir.id))
      }
    }
    setShowConfirm(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4 d-flex justify-content-between align-items-center">
          <strong>Matrícula e Rematrícula</strong>
          {/* Botão para abrir o modal */}
          <button
            className="btn btn-primary btn-sm"
            data-bs-toggle="modal"
            data-bs-target="#modalMatricula"
          >
            <i className="fa fa-plus"></i> Nova Matrícula
          </button>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltros onFiltrar={onFiltrar} />
        </CContainer>

        <CCard className="my-4">
          <CCardBody>
            {/* tabela de matrículas */}
            <PaginationWrapper data={matriculasFiltradas} itemsPerPage={5}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>#</th>
                      <th>Aluno</th>
                      <th>Turma</th>
                      <th>Curso</th>
                      <th>Professor</th>
                      <th>Disciplina</th>
                      <th>Data da Matrícula</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((m) => (
                      <tr key={m.id}>
                        <td>{m.id}</td>
                        <td>{m.aluno?.nome ?? '-'}</td>
                        <td>{m.turma?.nome ?? '-'}</td>
                        <td>{m.turma?.curso?.nome ?? '-'}</td>
                        <td>{m.turma?.professor?.nome ?? '-'}</td>
                        <td>{m.turma?.professor?.disciplina?.nome ?? '-'}</td>
                        <td>{m.data_matricula}</td>
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
                                  onClick={() => {/* lógica editar depois */}}
                                >
                                  <i className="fa fa-edit"></i> Editar
                                </button>
                              </li>
                              <li>
                                <button
                                  className="dropdown-item btn-sm"
                                  onClick={() => confirmarExclusao(m)}
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
              title="Excluir Matrícula"
              message={`Tem certeza que deseja excluir a matrícula do aluno "${matriculaParaExcluir?.aluno?.nome}"?`}
            />

            {/* Renderizar o modal de matrícula aqui */}
            <ModalMatricula onSalvo={fetchMatriculas} />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default MatriculasPage
