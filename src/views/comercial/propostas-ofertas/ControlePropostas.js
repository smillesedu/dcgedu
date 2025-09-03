import React, { useState, useEffect } from 'react'
import { CCard, CCardHeader, CCardBody, CRow, CCol, CButton } from '@coreui/react'
import supabase from '../../../supaBaseClient'
import TabelaPropostas from './TabelaPropostas'
import ModalNovaProposta from './ModalNovaProposta'

const ControlePropostas = () => {
  const [propostas, setPropostas] = useState([])
  const [showModal, setShowModal] = useState(false)

  useEffect(() => {
    fetchPropostas()
  }, [])

  const fetchPropostas = async () => {
    const { data, error } = await supabase
      .from('propostas')
      .select('id, lead:lead_id(nome), valor, desconto, status, validade')
      .order('id', { ascending: false })
    if (!error) setPropostas(data || [])
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader className="d-flex justify-content-between align-items-center">
            <strong>Controle de Propostas e Ofertas</strong>
            <CButton color="primary" onClick={() => setShowModal(true)}>
              Nova Proposta
            </CButton>
          </CCardHeader>
          <CCardBody>
            <TabelaPropostas propostas={propostas} />
          </CCardBody>
        </CCard>
      </CCol>

      <ModalNovaProposta
        visible={showModal}
        onClose={() => setShowModal(false)}
        onSave={fetchPropostas}
      />
    </CRow>
  )
}

export default ControlePropostas
