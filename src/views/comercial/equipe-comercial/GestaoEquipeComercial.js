import React, { useState, useEffect } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CButton } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import TabelaEquipe from './TabelaEquipe'
import ModalNovoMembro from './ModalNovoMembro'

const GestaoEquipeComercial = () => {
  const [equipe, setEquipe] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchEquipe()
  }, [])

  const fetchEquipe = async () => {
    const { data, error } = await supabase
      .from('equipe_comercial')
      .select('id, nome, meta_mensal, vendas_realizadas, comissao')
      .order('nome', { ascending: true })
    if (!error) setEquipe(data || [])
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Gestão de Equipe Comercial</strong>
            <CButton color="primary" onClick={() => setShowModal(true)}>
              Novo Membro
            </CButton>
          </CCardHeader>
          <CCardBody>
            <TabelaEquipe equipe={equipe} />
          </CCardBody>
        </CCard>
      </CCol>

      <ModalNovoMembro
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={fetchEquipe}
      />
    </CRow>
  )
}

export default GestaoEquipeComercial
