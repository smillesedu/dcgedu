import React, { useEffect, useState } from 'react'
import {
  CButton,
  CForm,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'

const ModalFiltrosNotas = ({ onFiltrar }) => {
  const [visible, setVisible] = useState(false)
  const [turmas, setTurmas] = useState([])
  const [disciplinas, setDisciplinas] = useState([])
  const [alunos, setAlunos] = useState([])

  const [filters, setFilters] = useState({
    turmaId: '',
    disciplinaId: '',
    alunoId: '',
  })

  useEffect(() => {
    fetchTurmas()
    fetchDisciplinas()
    fetchAlunos()
  }, [])

  const fetchTurmas = async () => {
    const { data, error } = await supabase.from('turmas').select('id, nome')
    if (!error) setTurmas(data || [])
  }

  const fetchDisciplinas = async () => {
    const { data, error } = await supabase.from('disciplinas').select('id, nome')
    if (!error) setDisciplinas(data || [])
  }

  const fetchAlunos = async () => {
    const { data, error } = await supabase.from('alunos').select('id, nome')
    if (!error) setAlunos(data || [])
  }

  const handleFiltrar = () => {
    onFiltrar(filters)
    setVisible(false)
  }

  return (
    <>
      <CButton color="primary" onClick={() => setVisible(true)}>
        Filtros
      </CButton>

      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>Filtrar Notas</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormSelect
              label="Turma"
              value={filters.turmaId}
              onChange={(e) => setFilters({ ...filters, turmaId: e.target.value })}
            >
              <option value="">Todas</option>
              {turmas.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.nome}
                </option>
              ))}
            </CFormSelect>

            <CFormSelect
              label="Disciplina"
              value={filters.disciplinaId}
              onChange={(e) => setFilters({ ...filters, disciplinaId: e.target.value })}
              className="mt-3"
            >
              <option value="">Todas</option>
              {disciplinas.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.nome}
                </option>
              ))}
            </CFormSelect>

            <CFormSelect
              label="Aluno"
              value={filters.alunoId}
              onChange={(e) => setFilters({ ...filters, alunoId: e.target.value })}
              className="mt-3"
            >
              <option value="">Todos</option>
              {alunos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nome}
                </option>
              ))}
            </CFormSelect>
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleFiltrar}>
            Filtrar
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalFiltrosNotas
