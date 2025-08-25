import React, { useState } from 'react'
import {
  CButton,
  CTable,
  CTableBody,
  CTableDataCell,
  CTableHead,
  CTableHeaderCell,
  CTableRow,
} from '@coreui/react'
import supabase from '../../../../supaBaseClient'

const TemplateDocumentos = ({ templates, onAtualizar }) => {
  const [novoTemplate, setNovoTemplate] = useState('')

  const adicionarTemplate = async () => {
    if (!novoTemplate) return
    await supabase.from('personalizacao_templates').insert({ nome: novoTemplate })
    setNovoTemplate('')
    onAtualizar()
  }

  return (
    <div>
      <div className="mb-3 d-flex">
        <input
          className="form-control me-2"
          placeholder="Nome do template"
          value={novoTemplate}
          onChange={(e) => setNovoTemplate(e.target.value)}
        />
        <CButton color="primary" onClick={adicionarTemplate}>
          Adicionar
        </CButton>
      </div>

      <CTable striped hover>
        <CTableHead>
          <CTableRow>
            <CTableHeaderCell>ID</CTableHeaderCell>
            <CTableHeaderCell>Nome</CTableHeaderCell>
          </CTableRow>
        </CTableHead>
        <CTableBody>
          {templates.map((t) => (
            <CTableRow key={t.id}>
              <CTableDataCell>{t.id}</CTableDataCell>
              <CTableDataCell>{t.nome}</CTableDataCell>
            </CTableRow>
          ))}
        </CTableBody>
      </CTable>
    </div>
  )
}

export default TemplateDocumentos
