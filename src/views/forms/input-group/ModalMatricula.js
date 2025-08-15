import React, { useState, useEffect } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CButton,
  CFormInput,
  CFormSelect,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'

const ModalMatricula = ({ alunoEditando, turmas, cursos, onSalvo }) => {
  const [aluno, setAluno] = useState({
    nome: '',
    email: '',
    telefone: '',
    turma_id: '',
    curso_id: '',
    status: 'ativo',
  })

  useEffect(() => {
    if (alunoEditando) {
      setAluno({
        nome: alunoEditando.nome || '',
        email: alunoEditando.email || '',
        telefone: alunoEditando.telefone || '',
        turma_id: alunoEditando.turma?.id || '',
        curso_id: alunoEditando.curso?.id || '',
        status: alunoEditando.status || 'ativo',
      })
    } else {
      setAluno({
        nome: '',
        email: '',
        telefone: '',
        turma_id: '',
        curso_id: '',
        status: 'ativo',
      })
    }
  }, [alunoEditando])

  const handleChange = (e) => {
    setAluno({ ...aluno, [e.target.name]: e.target.value })
  }

  const handleSalvar = async () => {
    if (alunoEditando) {
      const { error } = await supabase.from('alunos').update(aluno).eq('id', alunoEditando.id)
      if (!error) onSalvo()
    } else {
      const { error } = await supabase.from('alunos').insert(aluno)
      if (!error) onSalvo()
    }
  }

  return (
    <CModal visible={true} onClose={onSalvo}>
      <CModalHeader>
        <CModalTitle>{alunoEditando ? 'Editar Matrícula' : 'Nova Matrícula'}</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <CFormInput label="Nome" name="nome" value={aluno.nome} onChange={handleChange} />
        <CFormInput
          label="Email"
          name="email"
          type="email"
          value={aluno.email}
          onChange={handleChange}
        />
        <CFormInput
          label="Telefone"
          name="telefone"
          value={aluno.telefone}
          onChange={handleChange}
        />
        <CFormSelect label="Curso" name="curso_id" value={aluno.curso_id} onChange={handleChange}>
          <option value="">Selecione</option>
          {cursos.map((c) => (
            <option key={c.id} value={c.id}>
              {c.nome}
            </option>
          ))}
        </CFormSelect>
        <CFormSelect label="Turma" name="turma_id" value={aluno.turma_id} onChange={handleChange}>
          <option value="">Selecione</option>
          {turmas.map((t) => (
            <option key={t.id} value={t.id}>
              {t.nome}
            </option>
          ))}
        </CFormSelect>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onSalvo}>
          Fechar
        </CButton>
        <CButton color="primary" onClick={handleSalvar}>
          Salvar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}

export default ModalMatricula
