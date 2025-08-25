import React, { useEffect, useState } from 'react'
import supabase from '../../../supaBaseClient'
import FiltroNotificacoes from './FiltroNotificacoes'
import CardNotificacao from './CardNotificacao'
import { CCard, CCardBody, CCardHeader, CCol, CRow } from '@coreui/react'

const NotificacoesResponsavel = ({ responsavelId }) => {
  const [notificacoes, setNotificacoes] = useState([])
  const [loading, setLoading] = useState(false)

  useEffect(() => {
    buscarNotificacoes()
  }, [])

  const buscarNotificacoes = async (filtros = {}) => {
    setLoading(true)
    let query = supabase
      .from('notificacoes')
      .select('*')
      .eq('responsavel_id', responsavelId)
      .order('data_envio', { ascending: false })

    if (filtros.status && filtros.status !== 'todas') {
      query = query.eq('lida', filtros.status === 'lidas')
    }

    if (filtros.periodoDias) {
      const dataCorte = new Date()
      dataCorte.setDate(dataCorte.getDate() - filtros.periodoDias)
      query = query.gte('data_envio', dataCorte.toISOString())
    }

    const { data, error } = await query
    if (!error) setNotificacoes(data || [])
    setLoading(false)
  }

  const marcarComoLida = async (id) => {
    const { error } = await supabase.from('notificacoes').update({ lida: true }).eq('id', id)
    if (!error) {
      setNotificacoes((prev) => prev.map((n) => (n.id === id ? { ...n, lida: true } : n)))
    }
  }

  return (
    <CRow>
      <CCol xs={12}>
        <CCard className="my-4">
          <CCardHeader>
            <strong>📢 Notificações e Comunicados da Escola</strong>
          </CCardHeader>
          <CCardBody>
            <FiltroNotificacoes onFiltrar={buscarNotificacoes} />

            {loading && <p>Carregando...</p>}

            {!loading && notificacoes.length === 0 && (
              <p className="text-muted">Nenhuma notificação encontrada.</p>
            )}

            {notificacoes.map((n) => (
              <CardNotificacao key={n.id} notificacao={n} onMarcarComoLida={marcarComoLida} />
            ))}
          </CCardBody>
        </CCard>
      </CCol>
    </CRow>
  )
}

export default NotificacoesResponsavel
