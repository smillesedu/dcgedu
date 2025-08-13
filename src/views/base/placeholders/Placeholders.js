// src/pages/academico/GestaoCalendarioPage.jsx
import React, { useEffect, useState } from 'react'
import {
  CCard,
  CCardBody,
  CCardHeader,
  CCol,
  CContainer,
  CRow,
  CButton,
} from '@coreui/react'
import FullCalendar from '@fullcalendar/react'
import dayGridPlugin from '@fullcalendar/daygrid'
import timeGridPlugin from '@fullcalendar/timegrid'
import interactionPlugin from '@fullcalendar/interaction'
import supabase from '../../../supaBaseClient'
import ModalEvento from './ModalEvento'
import ModalFiltrosCalendario from './ModalFiltrosCalendario'

const GestaoCalendarioPage = () => {
  const [eventos, setEventos] = useState([])
  const [filtros, setFiltros] = useState({ tipo: '', turma: '', startDate: '', endDate: '' })
  const [eventoEditando, setEventoEditando] = useState(null)
  const [showModalEvento, setShowModalEvento] = useState(false)

  // Buscar eventos do banco
  const fetchEventos = async (filtros = {}) => {
    let query = supabase.from('eventos').select('*')

    if (filtros.tipo) query = query.eq('tipo', filtros.tipo)
    if (filtros.turma) query = query.eq('turma_id', filtros.turma)
    if (filtros.startDate) query = query.gte('data_inicio', filtros.startDate)
    if (filtros.endDate) query = query.lte('data_fim', filtros.endDate)

    const { data, error } = await query
    if (error) {
      console.error('Erro ao buscar eventos:', error)
    } else {
      setEventos(
        data.map((e) => ({
          id: e.id,
          title: e.titulo,
          start: e.data_inicio,
          end: e.data_fim,
          backgroundColor: e.cor || '#3788d8',
          extendedProps: {
            tipo: e.tipo,
            turma_id: e.turma_id,
            descricao: e.descricao,
          },
        })),
      )
    }
  }

  useEffect(() => {
    fetchEventos(filtros)
  }, [])

  const handleDateClick = (info) => {
    // Abrir modal para novo evento com data selecionada
    setEventoEditando({ data_inicio: info.dateStr, data_fim: info.dateStr })
    setShowModalEvento(true)
  }

  const handleEventClick = (info) => {
    // Abrir modal para edição
    const evt = eventos.find((e) => e.id === info.event.id)
    setEventoEditando(evt)
    setShowModalEvento(true)
  }

  const handleEventoSalvo = () => {
    fetchEventos(filtros)
    setShowModalEvento(false)
    setEventoEditando(null)
  }

  const handleFiltrar = (novosFiltros) => {
    setFiltros(novosFiltros)
    fetchEventos(novosFiltros)
  }

  return (
    <CContainer className="py-4">
      <CCardHeader className="mb-4">
        <strong>Gestão de Calendário Acadêmico</strong>
      </CCardHeader>

      <ModalFiltrosCalendario onFiltrar={handleFiltrar} />

      <CRow className="my-3">
        <CCol xs={12} className="d-flex justify-content-end">
          <CButton color="success" onClick={() => setShowModalEvento(true)}>
            + Adicionar Evento
          </CButton>
        </CCol>
      </CRow>

      <CCard>
        <CCardBody>
          <FullCalendar
            plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
            initialView="dayGridMonth"
            headerToolbar={{
              left: 'prev,next today',
              center: 'title',
              right: 'dayGridMonth,timeGridWeek,timeGridDay',
            }}
            events={eventos}
            dateClick={handleDateClick}
            eventClick={handleEventClick}
            editable={true}
            selectable={true}
          />
        </CCardBody>
      </CCard>

      {showModalEvento && (
        <ModalEvento
          show={showModalEvento}
          onClose={() => setShowModalEvento(false)}
          evento={eventoEditando}
          onSalvo={handleEventoSalvo}
        />
      )}
    </CContainer>
  )
}

export default GestaoCalendarioPage
