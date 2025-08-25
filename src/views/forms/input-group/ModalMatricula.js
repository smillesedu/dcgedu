import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'

const ModalMatricula = ({ onClose, onSalvo, alunoEditando }) => {
  const [cursos, setCursos] = useState([])
  const [disciplinas, setDisciplinas] = useState([])
  const [form, setForm] = useState({
    aluno_id: alunoEditando?.id || '',
    curso_id: alunoEditando?.curso_id || '',
    disciplina_id: alunoEditando?.disciplina_id || '',
    data_matricula: alunoEditando?.data_matricula || '',
  })

  useEffect(() => {
    const fetchCursos = async () => {
      const { data } = await supabase.from('cursos').select('id,nome')
      setCursos(data || [])
    }
    const fetchDisciplinas = async () => {
      const { data } = await supabase.from('disciplinas').select('id,nome')
      setDisciplinas(data || [])
    }
    fetchCursos()
    fetchDisciplinas()
  }, [])

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value })
  }

  const handleSalvar = async () => {
    const { error } = await supabase.from('matriculas').upsert(form)
    if (!error) {
      onSalvo()
      onClose()
    } else {
      console.error(error)
    }
  }

  return (
    <CModal visible={true} onClose={onClose}>
      <CModalHeader>{alunoEditando ? 'Editar Matrícula' : 'Nova Matrícula'}</CModalHeader>
      <CModalBody>
        <CFormInput
          type="text"
          label="Aluno"
          name="aluno_id"
          value={form.aluno_id}
          onChange={handleChange}
          placeholder="ID do Aluno"
        />
        <CFormSelect name="curso_id" value={form.curso_id} onChange={handleChange} className="mt-2">
          <option value="">Selecione o Curso</option>
          {cursos.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </CFormSelect>
        <CFormSelect
          name="disciplina_id"
          value={form.disciplina_id}
          onChange={handleChange}
          className="mt-2"
        >
          <option value="">Selecione a Disciplina</option>
          {disciplinas.map((d) => (
            <option key={d.id} value={d.id}>
              {d.nome}
            </option>
          ))}
        </CFormSelect>
        <CFormInput
          type="date"
          label="Data da Matrícula"
          name="data_matricula"
          value={form.data_matricula}
          onChange={handleChange}
          className="mt-2"
        />
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={handleSalvar}>
          Salvar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalMatricula
