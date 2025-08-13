import React, { useState, useEffect } from 'react'
import { CButton, CCard, CCardBody, CCardHeader, CCol, CRow, CContainer } from '@coreui/react'
import ModalAula from './ModalAula'
import ModalFiltrosAula from './ModalFiltrosAula'
import supabase from '../../../supaBaseClient'

const GestaoAulasPage = () => {
  const [aulas, setAulas] = useState([])
  const [modalAberto, setModalAberto] = useState(false)
  const [aulaEditando, setAulaEditando] = useState(null)

  // Dados para selects
  const [turmas, setTurmas] = useState([])
  const [disciplinas, setDisciplinas] = useState([])
  const [professores, setProfessores] = useState([])

  useEffect(() => {
    fetchAulas()
    fetchSelects()
  }, [])

  const fetchAulas = async (filters = {}) => {
    let query = supabase.from('aulas').select('*')
    if (filters.turma_id) query = query.eq('turma_id', filters.turma_id)
    if (filters.disciplina_id) query = query.eq('disciplina_id', filters.disciplina_id)
    if (filters.professor_id) query = query.eq('professor_id', filters.professor_id)
    if (filters.status) query = query.eq('status', filters.status)

    const { data, error } = await query
    if (error) console.error(error)
    else setAulas(data)
  }

  const fetchSelects = async () => {
    const { data: turmas } = await supabase.from('turmas').select('*')
    const { data: disciplinas } = await supabase.from('disciplinas').select('*')
    const { data: professores } = await supabase.from('professores').select('*')
    setTurmas(turmas || [])
    setDisciplinas(disciplinas || [])
    setProfessores(professores || [])
  }

  const abrirModalNovo = () => {
    setAulaEditando(null)
    setModalAberto(true)
  }

  const abrirModalEditar = (aula) => {
    setAulaEditando(aula)
    setModalAberto(true)
  }

  return (
    <CContainer className="my-4">
      <CRow className="mb-3">
        <CCol>
          <CButton color="success" onClick={abrirModalNovo}>
            Nova Aula
          </CButton>
        </CCol>
      </CRow>

      <ModalFiltrosAula onFiltrar={fetchAulas} turmas={turmas} disciplinas={disciplinas} professores={professores} />

      <CCard className="mt-4">
        <CCardHeader>Lista de Aulas</CCardHeader>
        <CCardBody>
          <table className="table table-bordered table-striped">
            <thead className="table-dark">
              <tr>
                <th>#</th>
                <th>Turma</th>
                <th>Disciplina</th>
                <th>Professor</th>
                <th>Data</th>
                <th>Horário</th>
                <th>Sala</th>
                <th>Status</th>
                <th>Ações</th>
              </tr>
            </thead>
            <tbody>
              {aulas.map((aula) => (
                <tr key={aula.id}>
                  <td>{aula.id}</td>
                  <td>{aula.turma_id}</td>
                  <td>{aula.disciplina_id}</td>
                  <td>{aula.professor_id}</td>
                  <td>{aula.data_aula}</td>
                  <td>
                    {aula.hora_inicio} - {aula.hora_fim}
                  </td>
                  <td>{aula.sala}</td>
                  <td>{aula.status}</td>
                  <td>
                    <CButton size="sm" color="info" onClick={() => abrirModalEditar(aula)}>
                      Editar
                    </CButton>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </CCardBody>
      </CCard>

      {modalAberto && (
        <ModalAula
          aulaEditando={aulaEditando}
          turmas={turmas}
          disciplinas={disciplinas}
          professores={professores}
          onSalvo={() => {
            setModalAberto(false)
            fetchAulas()
          }}
        />
      )}
    </CContainer>
  )
}

export default GestaoAulasPage
