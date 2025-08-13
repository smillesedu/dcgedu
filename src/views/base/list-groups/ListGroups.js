// src/views/turmas/GestaoTurmasPage.jsx
import React, { useEffect, useState } from 'react'
import { CCard, CCardBody, CCardHeader, CCol, CContainer, CRow } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import ModalFiltrosTurmas from './ModalFiltrosTurmas'
import ModalTurma from './ModalTurma'
import { ModalConfirmacao, PaginationWrapper } from '../../../components'

const GestaoTurmasPage = () => {
  const [turmas, setTurmas] = useState([])
  const [turmaEditando, setTurmaEditando] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)
  const [turmaParaExcluir, setTurmaParaExcluir] = useState(null)

  useEffect(() => {
    fetchTurmas()
  }, [])

  const fetchTurmas = async (filters = {}) => {
    let query = supabase.from('turmas').select(`
      id,
      nome,
      ano_letivo,
      turno,
      curso:curso_id(nome),
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
      console.error('Erro ao buscar turmas:', error)
    } else {
      setTurmas(data || [])
    }
  }

  const deletarTurma = async (id) => {
    const { error } = await supabase.from('turmas').delete().eq('id', id)
    if (error) {
      console.error('Erro ao deletar turma:', error)
    } else {
      setTurmas((prev) => prev.filter((turma) => turma.id !== id))
    }
  }

  const abrirModalNova = () => setTurmaEditando(null)
  const abrirModalEditar = (turma) => setTurmaEditando(turma)

  const confirmarExclusao = (turma) => {
    setTurmaParaExcluir(turma)
    setShowConfirm(true)
  }

  const handleConfirmDelete = () => {
    if (turmaParaExcluir) {
      deletarTurma(turmaParaExcluir.id)
    }
    setShowConfirm(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCardHeader className="my-4">
          <strong>Gestão de Turmas</strong>
        </CCardHeader>

        <CContainer className="px-4">
          <ModalFiltrosTurmas onFiltrar={fetchTurmas} />
        </CContainer>

        <CRow className="my-4">
          <CCol xs={6} md={4} className="ms-auto text-end">
            <button
              className="btn btn-success"
              data-bs-toggle="modal"
              data-bs-target="#modalTurma"
              onClick={abrirModalNova}
            >
              Nova Turma
            </button>
          </CCol>
        </CRow>

        <CCard>
          <CCardBody>
            <PaginationWrapper data={turmas} itemsPerPage={5}>
              {(paginaAtual) => (
                <table className="table table-bordered table-striped">
                  <thead className="table-dark">
                    <tr>
                      <th>ID</th>
                      <th>Nome</th>
                      <th>Ano Letivo</th>
                      <th>Turno</th>
                      <th>Curso</th>
                      <th>Data Criação</th>
                      <th>Ações</th>
                    </tr>
                  </thead>
                  <tbody>
                    {paginaAtual.map((turma) => (
                      <tr key={turma.id}>
                        <td>{turma.id}</td>
                        <td>{turma.nome}</td>
                        <td>{turma.ano_letivo}</td>
                        <td>{turma.turno}</td>
                        <td>{turma.curso?.nome || '-'}</td>
                        <td>{new Date(turma.created_at).toLocaleDateString()}</td>
                        <td>
                          <div className="btn-group">
                            <button
                              className="btn btn-primary btn-sm"
                              data-bs-toggle="modal"
                              data-bs-target="#modalTurma"
                              onClick={() => abrirModalEditar(turma)}
                            >
                              <i className="fa fa-edit" /> Editar
                            </button>
                            <button
                              className="btn btn-danger btn-sm"
                              onClick={() => confirmarExclusao(turma)}
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

            <ModalTurma turmaEditando={turmaEditando} onSalvo={() => fetchTurmas()} />
            <ModalConfirmacao
              show={showConfirm}
              onClose={() => setShowConfirm(false)}
              onConfirm={handleConfirmDelete}
              title="Excluir Turma"
              message={`Tem certeza que deseja excluir a turma "${turmaParaExcluir?.nome}"?`}
            />
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default GestaoTurmasPage
