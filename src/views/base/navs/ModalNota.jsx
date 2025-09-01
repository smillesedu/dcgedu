import React, { useEffect, useState } from 'react'
import {
  CButton,
  CForm,
  CFormInput,
  CFormSelect,
  CModal,
  CModalBody,
  CModalFooter,
  CModalHeader,
  CModalTitle,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'

const ModalNota = ({ visible, setVisible, notaEditando, onSalvo }) => {
  const [avaliacoes, setAvaliacoes] = useState([])
  const [alunos, setAlunos] = useState([])

  const [formData, setFormData] = useState({
    aluno_id: '',
    avaliacao_id: '',
    nota: '',
    observacao: '',
  })

  useEffect(() => {
    fetchAvaliacoes()
    fetchAlunos()
  }, [])

  useEffect(() => {
    if (notaEditando) {
      setFormData({
        aluno_id: notaEditando.aluno?.id || '',
        avaliacao_id: notaEditando.avaliacao?.id || '',
        nota: notaEditando.nota || '',
        observacao: notaEditando.observacao || '',
      })
      setVisible(true)
    } else {
      setFormData({ aluno_id: '', avaliacao_id: '', nota: '', observacao: '' })
    }
  }, [notaEditando])

  const fetchAvaliacoes = async () => {
    const { data, error } = await supabase
      .from('avaliacoes')
      .select('id, tipo, data_avaliacao')
      .order('data_avaliacao', { ascending: true })
    if (!error) setAvaliacoes(data || [])
  }

  const fetchAlunos = async () => {
    const { data, error } = await supabase.from('alunos').select('id, nome')
    if (!error) setAlunos(data || [])
  }

  const handleSave = async () => {
    if (!formData.aluno_id || !formData.avaliacao_id || formData.nota === '') {
      alert('Preencha todos os campos obrigatórios!')
      return
    }

    let response
    if (notaEditando) {
      response = await supabase
        .from('notas')
        .update({
          aluno_id: formData.aluno_id,
          avaliacao_id: formData.avaliacao_id,
          nota: formData.nota,
          observacao: formData.observacao,
        })
        .eq('id', notaEditando.id)
    } else {
      response = await supabase.from('notas').insert([formData])
    }

    if (response.error) {
      console.error('Erro ao salvar nota:', response.error)
    } else {
      onSalvo()
      setVisible(false)
      setFormData({ aluno_id: '', avaliacao_id: '', nota: '', observacao: '' })
    }
  }

  return (
    <>
      <CModal visible={visible} onClose={() => setVisible(false)}>
        <CModalHeader>
          <CModalTitle>{notaEditando ? 'Editar Nota' : 'Nova Nota'}</CModalTitle>
        </CModalHeader>
        <CModalBody>
          <CForm>
            <CFormSelect
              label="Aluno"
              value={formData.aluno_id}
              onChange={(e) => setFormData({ ...formData, aluno_id: e.target.value })}
            >
              <option value="">Selecione</option>
              {alunos.map((a) => (
                <option key={a.id} value={a.id}>
                  {a.nome}
                </option>
              ))}
            </CFormSelect>

            <CFormSelect
              label="Avaliação"
              value={formData.avaliacao_id}
              onChange={(e) => setFormData({ ...formData, avaliacao_id: e.target.value })}
              className="mt-3"
            >
              <option value="">Selecione</option>
              {avaliacoes.map((av) => (
                <option key={av.id} value={av.id}>
                  {av.tipo} - {av.data_avaliacao}
                </option>
              ))}
            </CFormSelect>

            <CFormInput
              label="Nota"
              type="number"
              value={formData.nota}
              onChange={(e) => setFormData({ ...formData, nota: e.target.value })}
              className="mt-3"
            />

            <CFormInput
              label="Observação"
              type="text"
              value={formData.observacao}
              onChange={(e) => setFormData({ ...formData, observacao: e.target.value })}
              className="mt-3"
            />
          </CForm>
        </CModalBody>
        <CModalFooter>
          <CButton color="secondary" onClick={() => setVisible(false)}>
            Cancelar
          </CButton>
          <CButton color="primary" onClick={handleSave}>
            {notaEditando ? 'Salvar Alterações' : 'Cadastrar Nota'}
          </CButton>
        </CModalFooter>
      </CModal>
    </>
  )
}

export default ModalNota
