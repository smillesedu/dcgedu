import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import ModalFiltrosCursos from './ModalFiltrosCursos'
import ModalCurso from './ModalCurso'
import { ModalConfirmacao, PaginationWrapper } from '../../../components'

const GestaoCursosPage = () => {
  const [cursos, setCursos] = useState([])
  const [cursoEditando, setCursoEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [cursoParaExcluir, setCursoParaExcluir] = useState(null)

  useEffect(() => {
    fetchCursos()
  }, [])

  const fetchCursos = async (filters = {}) => {
    let query = supabase.from('cursos').select(`
      id,
      nome,
      descricao,
      carga_horaria,
      created_at
    `)

    if (filters.startDate) {
      query = query.gte('created_at', filters.startDate)
    }
    if (filters.endDate) {
      query = query.lte('created_at', filters.endDate)
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
      console.error('Erro ao buscar cursos:', error)
    } else {
      setCursos(data || [])
    }
  }

  const deletarCurso = async (id) => {
    const { error } = await supabase.from('cursos').delete().eq('id', id)
    if (error) {
      console.error('Erro ao deletar curso:', error)
    } else {
      setCursos((prev) => prev.filter((curso) => curso.id !== id))
    }
  }

  const abrirModalNovo = () => setCursoEditando(null)
  const abrirModalEditar = (curso) => setCursoEditando(curso)

  const confirmarExclusao = (curso) => {
    setCursoParaExcluir(curso)
    setShowConfirm(true)
  }

  const handleConfirmDelete = () => {
    if (cursoParaExcluir) {
      deletarCurso(cursoParaExcluir.id)
    }
    setShowConfirm(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Gestão de Cursos</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltrosCursos onFiltrar={fetchCursos} />
        </CContainer>

        <CRow className="my-4">
          <CCol xs={6} md={4} className="ms-auto text-end">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalCurso"
              onClick={abrirModalNovo}
            >
              Novo Curso
            </button>
          </CCol>
        </CRow>

        <CCard>
          <CCardBody>
            <PaginationWrapper data={cursos} itemsPerPage={5}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Descrição</th>
                      <th>Carga Horária</th>
                      <th>Data Criação</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((curso) => (
                      <tr key={curso.id}>
                        <td>{curso.id}</td>
                        <td>{curso.nome}</td>
                        <td>{curso.descricao || '-'}</td>
                        <td>{curso.carga_horaria || '-'}</td>
                        <td>{new Date(curso.created_at).toLocaleDateString()}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              className="btn btn-primary btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#modalCurso"
                              onClick={() => abrirModalEditar(curso)}
                            >
                              <i className="fa fa-edit" /> Editar
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => confirmarExclusao(curso)}
                            >
                              <i className="fa fa-trash" /> Excluir
                            </button>
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              )}
            </PaginationWrapper>

            <ModalCurso cursoEditando={cursoEditando} onSalvo={() => fetchCursos()} />
            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Curso"
              message={`Tem certeza que deseja excluir o curso "${cursoParaExcluir?.nome}"?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GestaoCursosPage
