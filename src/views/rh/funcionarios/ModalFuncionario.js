import React, { useEffect, useState } from 'react'
import {
  CModal,
  CModalHeader,
  CModalTitle,
  CModalBody,
  CModalFooter,
  CFormInput,
  CFormSelect,
  CButton,
} from '@coreui/react'
import supabase from '../../../supaBaseClient'

const ModalFuncionario = ({ visible, onClose, onSaved, funcionario, departamentos, cargos }) => {
  const [form, setForm] = useState({
    nome: '',
    email: '',
    telefone: '',
    data_nascimento: '',
    cargo_id: '',
    departamento_id: '',
    salario_base: '',
    data_admissao: '',
    status: 'ativo',
  })

  useEffect(() => {
    if (funcionario) {
      setForm({
        nome: funcionario.nome || '',
        email: funcionario.email || '',
        telefone: funcionario.telefone || '',
        data_nascimento: funcionario.data_nascimento || '',
        cargo_id: funcionario.cargo_id || '',
        departamento_id: funcionario.departamento_id || '',
        salario_base: funcionario.salario_base || '',
        data_admissao: funcionario.data_admissao || '',
        status: funcionario.status || 'ativo',
      })
    } else {
      setForm((f) => ({ ...f, status: 'ativo' }))
    }
  }, [funcionario])

  const handle = (e) => setForm({ ...form, [e.target.name]: e.target.value })

  const salvar = async () => {
    const payload = {
      ...form,
      salario_base: form.salario_base ? Number(form.salario_base) : 0,
    }
    if (funcionario?.id) {
      await supabase.from('funcionarios').update(payload).eq('id', funcionario.id)
    } else {
      await supabase.from('funcionarios').insert(payload)
    }
    onSaved()
    onClose()
  }

  return (
    <CModal visible={visible} onClose={onClose} alignment="center">
      <CModalHeader>
        <CModalTitle>{funcionario ? 'Editar' : 'Novo'} Funcionário</CModalTitle>
      </CModalHeader>
      <CModalBody>
        <div className="vstack gap-2">
          <CFormInput name="nome" label="Nome *" value={form.nome} onChange={handle} />
          <CFormInput name="email" label="Email" value={form.email} onChange={handle} />
          <CFormInput name="telefone" label="Telefone" value={form.telefone} onChange={handle} />
          <CFormInput
            type="date"
            name="data_nascimento"
            label="Data de Nascimento"
            value={form.data_nascimento || ''}
            onChange={handle}
          />
          <CFormSelect
            name="departamento_id"
            label="Departamento"
            value={form.departamento_id || ''}
            onChange={handle}
          >
            <option value="">Selecione</option>
            {departamentos.map((d) => (
              <option key={d.id} value={d.id}>
                {d.nome}
              </option>
            ))}
          </CFormSelect>
          <CFormSelect name="cargo_id" label="Cargo" value={form.cargo_id || ''} onChange={handle}>
            <option value="">Selecione</option>
            {cargos.map((c) => (
              <option key={c.id} value={c.id}>
                {c.nome}
              </option>
            ))}
          </CFormSelect>
          <CFormInput
            type="number"
            name="salario_base"
            label="Salário Base"
            value={form.salario_base}
            onChange={handle}
          />
          <CFormInput
            type="date"
            name="data_admissao"
            label="Data de Admissão *"
            value={form.data_admissao || ''}
            onChange={handle}
          />
          <CFormSelect name="status" label="Status" value={form.status} onChange={handle}>
            <option value="ativo">Ativo</option>
            <option value="afastado">Afastado</option>
            <option value="desligado">Desligado</option>
          </CFormSelect>
        </div>
      </CModalBody>
      <CModalFooter>
        <CButton color="secondary" onClick={onClose}>
          Cancelar
        </CButton>
        <CButton color="primary" onClick={salvar}>
          Salvar
        </CButton>
      </CModalFooter>
    </CModal>
  )
}
export default ModalFuncionario
