import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'
import { CCard, CCardBody, CCardHeader, CRow, CCol } from '@coreui/react'
import LeadFilters from './LeadFilters'
import LeadsTable from './LeadsTable'
import LeadForm from './LeadForm'
import LeadDetailsModal from './LeadDetailsModal'
import { ModalConfirmacao, PaginationWrapper } from '../../../components'

const GestaoLeads = () => {
  const [leads, setLeads] = useState([])
  const [filtros, setFiltros] = useState({ nome: '', origem: '', status: '' })
  const [leadEditando, setLeadEditando] = useState(null)
  const [showForm, setShowForm] = useState(false)
  const [leadSelecionado, setLeadSelecionado] = useState(null)
  const [showConfirm, setShowConfirm] = useState(false)

  useEffect(() => {
    fetchLeads()
  }, [])

  const fetchLeads = async () => {
    let query = supabase.from('leads').select('*').order('created_at', { ascending: false })

    if (filtros.nome) query = query.ilike('nome', `%${filtros.nome}%`)
    if (filtros.origem) query = query.eq('origem', filtros.origem)
    if (filtros.status) query = query.eq('status', filtros.status)

    const { data, error } = await query
    if (!error) setLeads(data)
  }

  const handleDelete = async (id) => {
    await supabase.from('leads').delete().eq('id', id)
    fetchLeads()
    setShowConfirm(false)
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="mb-4">
          <CCardHeader>
            <strong>Gestão de Leads e Oportunidades</strong>
          </CCardHeader>
          <CCardBody>
            <LeadFilters filtros={filtros} setFiltros={setFiltros} onFiltrar={fetchLeads} />

            <div className="text-end mb-3">
              <button
                className="btn btn-success"
                onClick={() => {
                  setLeadEditando(null)
                  setShowForm(true)
                }}
              >
                Novo Lead
              </button>
            </div>

            <PaginationWrapper data={leads} itemsPerPage={5}>
              {(paginaAtual) => (
                <LeadsTable
                  leads={paginaAtual}
                  onEdit={(lead) => {
                    setLeadEditando(lead)
                    setShowForm(true)
                  }}
                  onView={(lead) => setLeadSelecionado(lead)}
                  onDelete={(lead) => {
                    setLeadSelecionado(lead)
                    setShowConfirm(true)
                  }}
                />
              )}
            </PaginationWrapper>
          </CCardBody>
        </CCard>
      </CCol>

      {/* Modal Form */}
      {showForm && (
        <LeadForm lead={leadEditando} onClose={() => setShowForm(false)} onSaved={fetchLeads} />
      )}

      {/* Modal Detalhes */}
      {leadSelecionado && (
        <LeadDetailsModal lead={leadSelecionado} onClose={() => setLeadSelecionado(null)} />
      )}

      {/* Modal Confirmação */}
      <ModalConfirmacao
        show={showConfirm}
        onClose={() => setShowConfirm(false)}
        onConfirm={() => handleDelete(leadSelecionado?.id)}
        title="Excluir Lead"
        message={`Tem certeza que deseja excluir o lead "${leadSelecionado?.nome}"?`}
      />
    </CRow>
  )
}

export default GestaoLeads
